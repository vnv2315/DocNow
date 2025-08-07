import express from 'express'
import { appointmentsDoctor, doctorList , loginDoctor, appointmentCancel, appointmentComplete, DoctorDashboard, doctorProfile, updateDoctorProfile} from '../controllers/doctorController.js'
import authDoctor from '../middleware/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor, appointmentCancel)
doctorRouter.get('/dashboard', authDoctor, DoctorDashboard)
doctorRouter.get('/profile', authDoctor, doctorProfile)
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile)

export default doctorRouter

