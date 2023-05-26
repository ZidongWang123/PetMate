import React from "react";
import GroupList from "./GroupList";
import useFetch from "../../Widget/DataFetch/useFetch";
import SearchBar from "../../Widget/searchBar/searchBar";
import GroupCreateButton from "./GroupCreateButton";
import { Link } from "react-router-dom";

//import DateSelecter from "../../Widget/DateSelecter/DateSelecter";

const Groups = () => {
  const {
    data: groups,
    isPending,
    error,
  } = useFetch("http://localhost:8080/groups");

  const groupJoin = (id) => {
    console.log(id);
  };

  return (
    <div className="groups">
      <div style={{ display: "flex", alignItems: "center" }}>
        <SearchBar />
        <Link to="/groups/create-group">
          <GroupCreateButton />
        </Link>
      </div>
      <div className="fetchGroupList">
        {error && <div>{error}</div>}
        {isPending && <div>loading...</div>}
        {groups && (
          <GroupList groups={groups} title="groups" groupJoin={groupJoin} />
        )}
      </div>
    </div>
  );
};

export default Groups;
