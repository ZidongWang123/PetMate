import { useEffect,useState } from "react";

//import WorkoutDetails from '../../../../components/WorkoutDetails'

/* const Home = () => {
//test for frontend
    useEffect(()=> {
        const fetchWorkouts = async()=> {
        const response = await fetch ('/workouts')
        const json = await response.json()

        if (response.ok){
            setWorkouts(json)
        }
        }
        fetchWorkouts()
    },[]
    )
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
        </div>
    )
}
export default Home;
 */
const Home = () => {
    const [workouts,setWorkouts] = useState(null)
    useEffect(()=> {
        const fetchWorkouts = async()=> {
        const response = await fetch('/workouts')
        const json = await response.json()

        if (response.ok){
            setWorkouts(json)
        }
        }
        fetchWorkouts()
    },[])
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                    <p key={workout._id}>{workout.title}</p>
                ))}
            </div>
        </div>
    );
};

export default Home;