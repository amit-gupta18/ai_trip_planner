import React from 'react'
import { Link } from 'react-router-dom'

function Hotels({ trip }) {
    // console.log(' final check for all the hotel options here   : ', trip?.tripData[0]?.travelPlan?.hotelOptions);

    return (
        <div>
            <h2 className='font-bold text-xl my-7'>Hotel Recommendation</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                {trip?.tripData?.[0]?.travelPlan?.hotelOptions?.length > 0 ? (
                    trip?.tripData?.[0]?.travelPlan?.hotelOptions.map((item, index) => (
                        <Link to= {`https://www.google.com/maps/search/?api=1&query=${item.address}`} target="_blank" rel="noreferrer" >
                            <div className='hover:scale-110 transition-all cursor-pointer' key={index}>
                                <img className='rounded-lg' src="/footer_image.jpg" alt="image" />
                                <h2 className='font-medium'>{item.name}</h2>
                                <h2 className='text-sm text-gray-500'>📍{item.address}</h2>
                                <h2 className='text-sm text-gray-900'>💵{item.price}</h2>
                                <h2 className='text-sm text-yellow-300'>⭐{item.ratings}</h2>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No hotel options available</p>
                )}
            </div>
        </div>
    )
}

export default Hotels
