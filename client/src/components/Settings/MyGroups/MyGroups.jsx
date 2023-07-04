import React from "react";
//import useFetch from "../../Widget/DataFetch/useFetch";
import "./MyGroup.css";
import MyGroupUnit from "./MyGroupUnit";
import { useState, useEffect } from "react";
import { useWorkoutsContext } from "../../../hooks/useWorkoutsContext";

const MyGroups = () => {
  const { workouts: groups, dispatch } = useWorkoutsContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch("http://localhost:100/api/groups");
      const json = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
        setIsLoading(false);
      }
    };
    fetchGroups();
  }, [dispatch]);
  useEffect(() => {
    console.log(groups);
  }, [groups]);
  return (
    <div className="myGroupList">
      {!isLoading &&
        groups.map((group) => <MyGroupUnit key={group._id} group={group} />)}
    </div>
  );
};

export default MyGroups;
