import { Button } from '@/components/ui/button';
import React from 'react'
import { FaLocationArrow } from "react-icons/fa";
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
    return (
        <Link to= {`https://www.google.com/maps/search/?api=1&query=${place.placeName}`} target="_blank" rel="noreferrer" >
            <div className='shadow-lg p-4 rounded-xl bg-white border border-gray-200 flex hover:shadow-md cursor-pointer gap-5 mt-2 hover:scale-105 transition-all'>
                <img className='rounded-xl w-48 h-38' src="/palm-tree.webp" alt="" />
                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-lg'>{place.placeName}</h2>
                    <p className='text-sm text-gray-900'>{place.description}</p>
                    <h2 className='text-green-400 text-xs'>🕒{place.travelTimeFromPreviousLocation?.replace(/^~/, '') ?? ''}</h2>
                    <Button size="sm"><FaLocationArrow /> View on Maps  </Button>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem