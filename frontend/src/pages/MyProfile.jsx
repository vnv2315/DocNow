import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify';

const MyProfile = () => {

  // const [userData, setUserData] = useState({
  //   name:"Edward Vincent",
  //   image: assets.profile_pic,
  //   email:'richard@gmail.com',
  //   phone: '+1  123 456 7890',
  //   address:{
  //     line1:"57th Cross, Richmond",
  //     line2:"Circle, Church Road, London"
  //   },
  //   gender:"Male",
  //   dob:"2002-08-12"
  // })

  const {userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext)
  const [isEdit,setIsEdit] = useState(false)
  const [image, setImage] =useState(false)
  // const [image, setImage] = useState(null);

  const updateUserProfileData = async() =>{
    try{
      const formData = new FormData()

      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)
      
      image && formData.append('image',image)
      // if (image) {
      //   formData.append('image', image);
      // }
     // Log FormData entries for debugging
console.log('FormData being sent:');
for (let [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}

      const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData, {headers:{token}})
      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }else{
        toast.error(data.message)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }
 
  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-wm'>
    {
      isEdit? 
      <label htmlFor="image">
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt=""/>
            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt=""/>
          </div>
          {/* <input onChange={(e)=>setImage(e.target.files[0])}  type="file" id="image" hidden/> */}
          <input 
    onChange={(e) => {
        const selectedImage = e.target.files[0];
        console.log('Selected image:', selectedImage); // Log selected image
        setImage(selectedImage);
    }} 
    type="file" 
    id="image" 
    hidden
/>

      </label>:
       <img className='w-36 rounded' src={userData.image} alt=""/>
    }
      
      {
        isEdit ? <input className="bg-gray-50 text-3xl font-medium max-w-60 mt-4" value={userData.name} onChange={e=> setUserData(prev => ({...prev, name:e.target.value}))} type="text"/>
        :<p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1px] border-none'/>

      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 '>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
        isEdit ? <input className='bg-grap-100 max-w-52' value={userData.phone} onChange={e=> setUserData(prev => ({...prev, phone:e.target.value}))} type="text"/>
        :<p className='text-blue-400'>{userData.phone}</p>
      }

      <p className='font-medium'>Address:</p>
      {
        isEdit?
        <p><input className='bg-gray-50' onChange={(e)=>setUserData(prev =>({...prev, address : { ...prev.address, line1: e.target.value}}))} value={userData.address.line1} type="text"/>
        <br/>
        <input  className='bg-gray-50' onChange={(e)=>setUserData(prev =>({...prev, address : { ...prev.address, line2: e.target.value}}))} value={userData.address.line2} type="text"/>
        </p>
      :
      <p className='text-gray-500'>
        {userData.address.line1}
        <br/>
        {userData.address.line2}
      </p>
      }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
        isEdit ? <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev =>({...prev, gender: e.target.value}))} value={userData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
        </select>:
        <p className='text-gray-400'>{userData.gender}</p>
      }
        <p className='font-medium'>Birthday:</p>
        {
          isEdit ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e) => setUserData(prev =>({...prev, dob: e.target.value}))}  value={userData.dob ? userData.dob : ''}/>:
          <p className='text-gray-400'>{userData.dob}</p>
        }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit ? <button className='border border-black px-8 py-2 rounded-full hover:bg-black hover:text-white transition-all' onClick={updateUserProfileData}>Save Information</button>:
          <button className='border border-black px-8 py-2 rounded-full hover:bg-black hover:text-white transition-all' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile