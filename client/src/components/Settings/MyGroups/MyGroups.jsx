import React from "react";
//import useFetch from "../../Widget/DataFetch/useFetch";
import "./MyGroup.css";
import MyGroupUnit from "./MyGroupUnit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyGroups } from "../../../actions/group";
/* import { useWorkoutsContext } from "../../../hooks/useWorkoutsContext"; */

const MyGroups = () => {
  /*  const { workouts: groups, dispatch } = useWorkoutsContext(); */

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyGroups());
  }, [dispatch]);
  const { groups: mygroups } = useSelector((state) => state.groups);
  console.log(mygroups);
  return (
    <div className="myGroupList">
      {Array.isArray(mygroups) ? (
        mygroups.map((group) => (
          <MyGroupUnit key={group.groupId} group={group} />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MyGroups;
