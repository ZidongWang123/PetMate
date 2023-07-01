import React, { useEffect, useState } from "react";
import GroupList from "./GroupList";
import SearchBar from "../../Widget/SearchBar/SearchBar";
import { useWorkoutsContext } from "../../../hooks/useWorkoutsContext";

import GroupCreateButton from "./GroupCreateButton";
import { Link } from "react-router-dom";
import "./Group.css";

const Groups = () => {
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
    <div className="groups">
      <div style={{ display: "flex", alignItems: "center" }}>
        <SearchBar />
        <Link to="/groups/create-group">
          <GroupCreateButton />
        </Link>
      </div>
      <div className="group-list">
        {!isLoading &&
          groups.map((group) => <GroupList key={group._id} group={group} />)}
      </div>
    </div>
  );
};

export default Groups;
