import mongoose from 'mongoose';


const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true //必须需要
    
    },
    reps: {
        type: Number,
        required: true

    },
    load: {
        type: Number,
        required: true
    }
},{ timestamps:true })

//module.exports = mongoose.model('Workout',workoutSchema)

//Workout.find()

//export default mongoose.model('Workout', workoutSchema);