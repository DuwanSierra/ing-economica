import React from 'react'


const ImageComponent:React.FC = () => {
  return (
    <>
        <div className='basis-2/4'>
            <img 
                src="finance.svg"
                className='w-3/4 mx-auto animate-pulse animate-infinite animate-duration-[10000ms] animate-ease-in-out'
            />
        </div>
    </>
  )
}

export default ImageComponent