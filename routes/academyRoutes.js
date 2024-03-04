import express from 'express';
import {
    getAcademyActivities,
    getAcademyActivity,
    createAcademyActivity,
    updateAcademyActivity,
    deleteAcademyActivity
} from '../controllers/academyController.js';


const router = express.Router();

router.route('/academy').get(getAcademyActivities).post(createAcademyActivity);
router.route('/academy/:id').get(getAcademyActivity).put(updateAcademyActivity).delete(deleteAcademyActivity);


export default router;