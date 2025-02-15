import { getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { doc} from 'firebase/firestore';
import { db } from '@/service/firebaseconfig';
import InfoSection from '../components/InfoSection';
import { useState } from 'react';
import { Info } from 'lucide-react';
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
    <div>

        {/*information about the trip */}
            <InfoSection trip={trip}/>

        {/* Recommended hotels */}


        {/*Daily plan */}

        {/* Footer */}


    </div>
  )
}

export default Viewtrip