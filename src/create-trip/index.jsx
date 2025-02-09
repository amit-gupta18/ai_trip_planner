import React, { useEffect, useSyncExternalStore } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { SelectBudgetOptions, SelectTravelList } from "@/constants/options"
import { toast } from 'sonner';
import { chatSession } from '@/service/AImodal';


function CreateTrip() {

  const [place, setPlace] = useState(' ');
  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })

  }

  useEffect(() => {
    console.log("formData is : ", formData)
  }, [formData])

  const onGenerateTrip =  async() => {
    if (formData.totalDays > 5) {
      toast("We recommend you to plan a trip for 5 days or less")
    }
    if (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.totalDays) {
      toast("Please fill all the Details")
    }
    localStorage.setItem('formData', JSON.stringify(formData))
    // const FINAL_PROMPT = AI_PROMPT
    // .replace("{formData?.days || 'X'}", formData?.totalDays)
    // .replace("{formData?.people || 'X'}", formData?.traveler)
    // .replace("{formData?.destination || 'Unknown Location'}", formData?.location)
    // .replace("{formData?.budget || 'flexible'}", formData?.budget);
    // console.log("FINAL_PROMPT is : ", FINAL_PROMPT)
    const AI_PROMPT = `Generate a detailed ${formData?.totalDays || "X"}-day travel plan for ${formData?.traveler || "X"} people in ${formData?.location || "Unknown Location"} with a ${formData?.budget || "flexible"} budget. Provide:
      - **Hotel Options**: Name, Address, Price, Image URL, Geo-coordinates, Ratings, and Descriptions.  
      - **Itinerary**: A structured day-wise plan including:  
        - Place Name, Description, Image URL, Geo-coordinates.  
        - Ticket Pricing and Opening Hours.  
        - Best time to visit each location.  
        - Travel time between locations.  
      - **Output Format**: Return the response in structured **JSON format** for easy parsing.`;

    // console.log(AI_PROMPT);
    console.log("prompt is ", AI_PROMPT)

    const result = await chatSession.sendMessage(AI_PROMPT);
    console.log(result?.response?.text())

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
        <Button onClick={onGenerateTrip} >Generate Trip</Button>
      </div>
    </div>
  )
}

export default CreateTrip