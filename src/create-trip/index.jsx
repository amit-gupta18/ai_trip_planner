import React, { useEffect, useSyncExternalStore } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { SelectBudgetOptions, SelectTravelList } from "@/constants/options"
import { toast } from 'sonner';
import { chatSession } from '@/service/AImodal';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from 'react-icons/fc'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/service/firebaseconfig';



function CreateTrip() {

  const [place, setPlace] = useState(' ');
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })

  }

  useEffect(() => {
    console.log("formData is : ", formData)
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeRes) => GetUserProfile(codeRes),
    onError: (error) => console.log(error),
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json'
        }
      }).then((res) => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res.data));
        setOpenDialog(false);
        onGenerateTrip();
      })
  }



  const onGenerateTrip = async () => {

    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      // toast("Please Login to Generate Trip")
      setOpenDialog(true);
    }



    if (formData.totalDays > 5) {
      toast("We recommend you to plan a trip for 5 days or less")
    }
    if (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.totalDays) {
      toast("Please fill all the Details")
    }
    localStorage.setItem('formData', JSON.stringify(formData))
    setLoading(true);
    const AI_PROMPT = `Generate a detailed ${formData?.totalDays || "X"}-day travel plan for ${formData?.traveler || "X"} people in ${formData?.location || "Unknown Location"} with a ${formData?.budget || "flexible"} budget. Provide:
      - **Hotel Options**: Name, Address, Price, Image URL, Geo-coordinates, Ratings, and Descriptions.  
      - **Itinerary**: A structured day-wise plan including:  
        - Place Name, Description, Image URL, Geo-coordinates.  
        - Ticket Pricing and Opening Hours.  
        - Best time to visit each location.  
        - Travel time between locations.  
      - **Output Format**: Return the response in structured **JSON format** for easy parsing.`;
    console.log("prompt is ", AI_PROMPT)
    const result = await chatSession.sendMessage(AI_PROMPT);
    console.log("--", result?.response?.text())
    setLoading(false);
    saveAiTrip(result?.response?.text())
  }
  const saveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString();

    await setDoc(doc(db, "AItrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`)
  }


  return (
    <div className="px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72">
      <div>
        <h2 className="font-bold text-3xl ">Tell us your travel preferences 🌍✈️🌴</h2>
        <p className="mt-3 text-gray-600 text-xl">Just provide some basic information,and our trip planner will generate a customized itinerary based on your preferences.</p>
      </div>

      <div className="mt-20 flex flex-col gap-10 ">
        <div className="mb-5">
          <label className="text-xl mb-3 font-medium">What is destination of choice?</label>
          {/* is google placesautocomplete ka kaam bas itna  hai ki jo bhi location ko type karte rahenge toh niche dropdowm me list aata rahega realted to it . */}
          <input type="text" placeholder="Type here..." value={place} onChange={(e) => { setPlace(e.target.value); handleInputChange("location", e.target.value); console.log("value is ", e.target.value) }} className="w-full p-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black" />
          {/* <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY} 
          /> */}
        </div>


        <div className="mb-5">
          <label className="text-xl  font-medium">How many days are you planning your trip?</label>
          <Input placeholder={'example . 2'} className="mt-3" type='number' min="1"
            onChange={(v) => handleInputChange('totalDays', v.target.value)} />
        </div>

        <div>
          <label className="text-xl my-3 font-medium">What is Your Budget?</label>
          <p>The budget is exclusively allocated for activities and dining purposes. </p>
          <div className="grid grid-cols-3 gap-5 mt-5 mb-5">
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg
                ${formData?.budget == item.title && 'shadow-lg border-cyan-500'} 
                `}>
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>

          {/*  */}
          <label className="text-xl font-medium my-3"> Who do you plan on traveling with on your next adventure?</label>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg
                 ${formData?.traveler == item.people && 'shadow-2xl border-cyan-500'}
                  `}>
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <Button onClick={onGenerateTrip} disabled={loading}>
          {loading ? <AiOutlineLoading3Quarters className=" h-10 w-10 animate-spin" /> : "Generate Trip"}</Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img className='w-12 h-12' src="/logo.jpg" alt="" />
              <h2 className='font-bold text-lg mt-8'>Sign In with Google</h2>
              <p>Sign in to the app with google authentication securely. </p>

              <Button className="w-full mt-5" onClick={login}>
                <FcGoogle />Sign in with google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip