import React from 'react'
import {InfinitySpin} from 'react-loader-spinner'

const Loader = () => {
     return (
          <div className='flex w-full items-center justify-center'>
               <InfinitySpin 
                    width='200'
                    color="#4fa94d"
               />
          </div>
     )
}

export default Loader