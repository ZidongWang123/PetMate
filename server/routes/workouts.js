import express from 'express';
import Workout from '../models/work.js';
import {createWorkout,getWorkouts,getWorkout,deleteWorkout,updateWorkout} from '../controllers/workoutController.js'

const router = express.Router()

// GET all workouts
router.get('/',getWorkouts)

//GET a single workout
router.get('/:id',getWorkout)

//POST a new workout
router.post('/',createWorkout)
    


//DELTE a new workout
router.delete('/:id',deleteWorkout)

//UPDATE a new workout
router.patch ('/:id',updateWorkout)

//module.exports = router
export default router;