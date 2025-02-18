import React from 'react'
import { Link } from 'react-router-dom';
function UserTripCardItem({ trip }) {
    return (
        <Link to={`/view-trip/${trip?.id}`} >
            <div className='mt-10 hover:shadow-lg hover:scale-105 transition-all p-5 bg-white rounded-xl'> 

                <img src="mountains.webp" className='object-cover rounded-xl' alt="" />
                <div>
                    <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
                    <h2 className='text-sm text-gray-800' >{trip?.userSelection?.totalDays} Days trip with {trip?.userSelection?.budget} Budget .</h2>
                </div>

            </div>
        </Link>
    )
}

export default UserTripCardItem