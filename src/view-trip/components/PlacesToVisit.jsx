import React from 'react'
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
    const placestoVisit = trip?.tripData?.[0]?.travelPlan?.itinerary;
    return (
        <div>
            <div className=' mt-10 font-bold text-lg'>Places To Visit</div>
            {placestoVisit?.length > 0 ? (
                <div className='my-4'>
                    {placestoVisit.map((item, index) => (
                        <React.Fragment key={index}>
                            <h2 className='font-medium text-lg'> Day {item.day} Plan : </h2>
                            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4'>
                                {item.plan.map((place, index) => (
                                    <div className='my-3 mx-4' key={index}>
                                        <h2 className='font-medium text-orange-600'>{place.openingHours}</h2>
                                        <div>
                                            <PlaceCardItem place={place}/>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            ) : (
                <div>No places to visit</div>
            )}
        </div>
        
    )
}

export default PlacesToVisit