import Workout from '../models/work.js';
import mongoose from 'mongoose';
// get all workouts
export const getWorkouts = async (req,res) => {
    const workouts = await Workout.find({reps:20 }).sort({createdAt:-1}) //find all workout with reps 20
    res.status(200).json(workouts) 
}  
 
// get a single workout
export const getWorkout = async (req,res) =>{
    const {id} = req.params
    //check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }
    const workout = await Workout.findById(id)

    if (!workout){
        return res.status(404).json({error:'No such workout'})
    }

    res.status(200).json(workout)
}

// create new workout
export const createWorkout = async (req, res) => {
    const {title, load,reps} = req.body;

    try {
        const workout = await Workout.create({title, load,reps})
        res.status(200).json(workout)
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
}

// delete a workout
export const deleteWorkout = async(req,res) => {
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id:id})

    if (!workout){
        return res.status(400).json({error:'No such workout'})
    }

    res.status(200).json(workout)
}

//update a workout
export const updateWorkout = async(req,res) => {
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate ({_id:id},{
        ...req.body 
    })
    if (!workout){
        return res.status(400).json({error:'No such workout'})
    }
    res.status(200).json(workout)
}