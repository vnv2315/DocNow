import { createContext, useEffect, useState } from "react";
import { doctors } from '../assets/assets';
import axios from 'axios';
import {toast} from 'react-toastify';
export const AppContext = createContext();

const AppContextProvider = (props) =>{
    const currencySymbol = '$'
    const backendUrl= import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const [userData, setUserData] = useState(false)


     // Function to clear token and log out the user
     const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(false);
        setUserData(false);
        toast.error('Session expired. Please log in again.');
        // Optionally redirect to login page
        // window.location.href = '/login';
    };


    const getDoctorData = async () => {
        try{
            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
            }
          else{
            toast.error(data.message)
          }
        }

        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }


    const loadUserProfileData = async()=>{
        try{
            const {data} =await axios.get(backendUrl + '/api/user/getProfile',{headers:{token}})
            if(data.success){
                setUserData(data.userData)
            }
            else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            if (error.response && error.response.status === 401) {
                handleLogout(); // Token expired or unauthorized
            } else {
                toast.error(error.message);
            }
        }
    }
    const value={

        doctors,
        getDoctorData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfileData,
        handleLogout,
    }
    
    useEffect(()=>{
    getDoctorData()
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }else{
            setUserData(false)
        }
    },[token])
    return(
        <AppContext.Provider value={value}>
                {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider