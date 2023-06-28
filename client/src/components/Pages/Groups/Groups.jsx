import React, { useEffect, useState } from "react";
import GroupList from "./GroupList";

import SearchBar from "../../Widget/SearchBar/SearchBar";

import GroupCreateButton from "./GroupCreateButton";
import { Link } from "react-router-dom";
import "./Group.css";
//import DateSelecter from "../../Widget/DateSelecter/DateSelecter";

const Groups = () => {
  const [groups, setGroups] = useState(null);
  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch("http://localhost:100/api/groups");
      const json = await response.json();

      if (response.ok) {
        setGroups(json);
      }
    };
    fetchGroups();
  }, []);
  useEffect(() => {
    console.log(groups);
  }, [groups]);

  return (
    <div className="groups">
      <div style={{ display: "flex", alignItems: "center" }}>
        <SearchBar label="Search everything!" />
        <Link to="/groups/create-group">
          <GroupCreateButton />
        </Link>
      </div>
      <div className="group-list">
        {groups &&
          groups.map((group) => <GroupList key={group._id} group={group} />)}
      </div>
    </div>
  );
};

export default Groups;
