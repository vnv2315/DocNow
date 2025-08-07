// routes/adminRoute.js
import express from 'express';
import { addDoctor, allDoctors, loginAdmin , appointmentsAdmin, appointmentCancel, adminDashboard} from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js';
const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor); // The key 'image' must match the key used in FormData
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctor',authAdmin, allDoctors)
adminRouter.post('/change-availability', authAdmin, changeAvailability)
adminRouter.get('/appointments',authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)


export default adminRouter;
