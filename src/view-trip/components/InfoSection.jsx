import { Button } from '@/components/ui/button';
import { IoIosSend } from 'react-icons/io';
import React from 'react'


function InfoSection({ trip }) {
  console.log('trip', trip)
  

  return (
    <div>
      <img src="/road-trip-vacation.jpg"  className='h-[330px] w-full object-cover rounded-xl'/>

       <div className='flex justify-between items-center'>

            <div className='my-6 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
                <div className='flex gap-6 mt-4'>
                    <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>🗓️ {trip?.userSelection?.totalDays} Day</h2>
                    <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>👩‍👧‍👦 Number of Traveller : {trip?.userSelection?.traveler} People</h2>
                    <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>💵 {trip?.userSelection?.budget} Budget </h2>
                </div>
            </div>  

          <Button>
             <IoIosSend/> Edit Trip
          </Button>

       </div>

    </div>
  );
} 

export default InfoSection