import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const AddDoctor = () => {


  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')  
  const [address1, setAddress1] = useState('')  
  const [address2, setAddress2] = useState('')  

  const {backendUrl , aToken} = useContext(AdminContext)

  const onSubmitHandler = async (event) =>{
        event.preventDefault()

        try{

            if(!docImg){
                return toast.error('Image Not Selected')
            }

            const formData = new FormData()

            formData.append('image' , docImg)
            formData.append('name' , name)
            formData.append('email' , email)
            formData.append('password' , password)
            formData.append('experience' , experience)
            formData.append('fees' , Number(fees))
            formData.append('about' , about)
            formData.append('speciality' , speciality)
            formData.append('degree' , degree)
            formData.append('address' , JSON.stringify({line1:address1, line2:address2}))

            //console log formData
            formData.forEach((value, key)=>{
                console.log(`${key} : ${value}`);
            })

            const {data} = await axios.post(backendUrl + '/api-admin/add-doctor',formData, {headers:{aToken}})

            if(data.success){
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')

            }
            else{
                toast.error(data.message)
            }
        }catch(error){
                toast.error(data.message)
                console.log(error)
        }
  }
  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
        <p className='mb-5 text-xl font-semibold text-gray-800'>Add Doctor</p>
        <div className='bg-white px-8 py-8 border border-gray-200 rounded-lg shadow-sm w-full max-w-4xl max-h-4xl max-h-[80vh] overflow-y-auto'>
            <div className='flex items-center gap-6 mb-8 text-gray-500'>
                <label htmlFor='doc-img'>
                    <img className='w-20 h-20 object-cover bg-gray-100 rounded-full cursor-pointer hover:opacity-80 transition-opacity duration-300 border-2 border-black' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt=""/>
                </label>
                <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden/>
                <p className='text-gray-600 font-medium'>Upload doctor <br/> picture</p>
            </div>
            <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                <div className='w-full lg:flex-1 flex flex-col gap-5'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <p className='font-medium'>Doctor name</p>
                        <input onChange={(e)=> setName(e.target.value)} value={name} className='border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300' type="text" placeholder='Name' required/>
                    </div>

                    <div className='flex-1 flex flex-col gap-2'>
                        <p className='font-medium'>Doctor Email</p>
                        <input onChange={(e)=> setEmail(e.target.value)} value={email} className='border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300' type="email" placeholder='Email' required/>
                    </div>

                    <div className='flex-1 flex flex-col gap-2'>
                        <p className='font-medium'>Doctor Password</p>
                        <input onChange={(e)=> setPassword(e.target.value)} value={password} className='border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300' type="password" placeholder='Password' required/>
                    </div>

                    <div className='flex-1 flex flex-col gap-2'>
                        <p className='font-medium'>Experience</p>
                        <select onChange={(e)=> setExperience(e.target.value)} value={experience} className='border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 bg-white cursor-pointer' name="" id="">
                            <option value="1 Year">1 Year</option>
                            <option value="2 Year">2 Year</option>
                            <option value="3 Year">3 Year</option>
                            <option value="4 Year">4 Year</option>
                            <option value="5 Year">5 Year</option>
                            <option value="6 Year">6 Year</option>
                            <option value="7 Year">7 Year</option>
                            <option value="8 Year">8 Year</option>
                            <option value="9 Year">9 Year</option>
                            <option value="10 Year">10 Year</option>
                        </select>
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <p className='font-medium'>Fees</p>
                        <input onChange={(e)=> setFees(e.target.value)} value={fees} className='border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300' type="number" placeholder='fees' required/>
                    </div>
                </div>

                <div className='w-full lg:flex-1 flex flex-col gap-5'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <p className='font-medium'>Speciality</p>
                        <select onChange={(e)=> setSpeciality(e.target.value)} value={speciality} className='border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 bg-white cursor-pointer' name="" id="">
                         <option value="General physician">General physician</option>
                         <option value="Gynecologist">Gynecologist</option>
                         <option value="Dermatologist">Dermatologist</option>
                         <option value="Pediatricians">Pediatricians</option>
                         <option value="Neurologist">Neurologist</option>
                         <option value="Gastroenterologist">Gastroenterologist</option>   
                        </select>
                    </div>

                    <div className='flex-1 flex flex-col gap-2'>
                        <p className='font-medium'>Education</p>
                        <input onChange={(e)=> setDegree(e.target.value)} value={degree} className='border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300' type="text" placeholder='Education' required/>
                    </div>

                    <div className='flex-1 flex flex-col gap-2'>
                        <p className='font-medium'>Address</p>
                        <input onChange={(e)=> setAddress1(e.target.value)} value={address1} className='border border-gray-300 rounded-md px-4 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300' type="text" placeholder='address 1' required/>
                        <input onChange={(e)=> setAddress2(e.target.value)} value={address2} className='border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300' type="text" placeholder='address 2' required/>
                    </div>
                </div>

                <div className='w-full'>
                        <p className='flex   mt-4 mb-2 font-medium'>About Doctor</p>
                        <textarea onChange={(e)=> setAbout(e.target.value)} value={about} className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300' placeholder='Write about doctor' rows={5} required/>
                    </div>
                <button type="submit" className='bg-primary px-10 py-3 mt-6 text-white rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg font-medium'>Add doctor</button>
                
            </div>
        </div>
    </form>
  )
}

export default AddDoctor