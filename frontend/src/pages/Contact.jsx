import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>DOCNOW</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image}/>

        <div className='flex flex-col justify-center items-start gap-6'>

          <p className='font-semibold text-lg text-gray-600'>Our OFFICE</p>
          <p className='text-gray-500'>123 Health Street<br/> Your City, Country</p>
          <p className='text-gray-500'>Tel: (555) 123-4567 <br/>Email: contact@docnow.com</p>
          <p className='font-semibold text-lg text-gray-600'>Careers at DocNow</p>
          <p className='text-gray-500'>Join our team and help shape the future of healthcare.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500' >Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact