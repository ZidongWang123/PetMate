import React from "react";

import SearchBar from "../../Widget/SearchBar/SearchBar";

import GroupCreateButton from "./GroupCreateButton";
import { Link } from "react-router-dom";
import "./Group.css";
import { useDispatch } from "react-redux";
import { getGroups } from "../../../actions/group";

import { useSelector } from "react-redux";
import GroupList from "./GroupList";

const Groups = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);
  const { groups, joined } = useSelector((state) => state.groups);

  return (
    <div className="groups">
      <div style={{ display: "flex", alignItems: "center" }}>
        <SearchBar />
        <Link to={user ? "/groups/create-group" : "/warning"}>
          <GroupCreateButton />
        </Link>
      </div>
      <div className="group-list">
        {Array.isArray(groups) ? (
          groups.map((group) => (
            <GroupList key={group._id} group={group} isjoined={joined} />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Groups;
