

import React from 'react';
import useFetch from "../../Widget/DataFetch/useFetch";
import Avatar from "@mui/material/Avatar";
import "./MyGroup.css";
import MyGroupUnit from './MyGroupUnit';

const MyGroups = () => {
  const {
    data: groups,
    isPending,
    error,
  } = useFetch("http://localhost:8080/groups");

  return (
    <div className="my-groups">
      <h1 className="group-title">Welcome back to your Groups you joined</h1> {/* 添加标题，并设置 className */}
      <div className="fetchGroupList">
        {error && <div>{error}</div>}
        {isPending && <div>loading...</div>}
        {groups && <MyGroupUnit groups={groups} title="groups" />}
      </div>
      
    </div>
    
  );
};

export default MyGroups;
