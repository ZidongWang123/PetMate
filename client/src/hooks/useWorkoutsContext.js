import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

//hook function: return the value of WorkoutsContext which is state and dispatch function -> the value we pass into the provider component
export const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext);

  //check whether we are within the scope of the context we gonna use, if outside then the context will be null

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside an WorkoutsContextProvider"
    );
  }

  return context;
};
