import { getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { doc} from 'firebase/firestore';
import { db } from '@/service/firebaseconfig';
import InfoSection from '../components/InfoSection';
import { useState } from 'react';
import { Info } from 'lucide-react';
import Hotel from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
function Viewtrip() {
    const {tripId} = useParams();
    const[trip , setTrip] = useState([]);

    // console.log("tripId is : ", tripId);
    useEffect(() => {
        console.log("tripId is : ", tripId);
        tripId && GetTripData();
    }, [tripId]) 
    const GetTripData = async() => {
        const docRef = doc(db,'AItrips',tripId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists())
        {
            console.log("Document data : ", docSnap.data());
            setTrip(docSnap.data());
        }
        else
        {
            console.log("No such document exists");
            toast('No such trip found');
        }
    }
  return (
    <div className='p-10  md:px-20 lg:px-44 xl:px-56'>

        {/*information about the trip */}
            <InfoSection trip={trip}/>

        {/* Recommended hotels */}
            <Hotel trip={trip}/> 

        {/*Daily plan */}
            <PlacesToVisit trip = {trip} />
        {/* Footer */}
            <Footer trip={trip}/>


    </div>
  )
}

export default Viewtrip