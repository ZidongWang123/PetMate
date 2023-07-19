import React from "react";
import "./MyGroup.css";
import MyGroupUnit from "./MyGroupUnit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyGroups } from "../../../actions/group";

const MyGroups = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyGroups());
  }, [dispatch]);
  const { groups: mygroups } = useSelector((state) => state.groups);
  return (
    <div className="myGroupList">
      {Array.isArray(mygroups) ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* 渲染 creatorId 在 memberId 中的部分 */}
          <div className="my-group-subtitle">Group you created:</div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {mygroups
              .filter((group) => group.creatorId === user.result._id)
              .map((group) => (
                <MyGroupUnit key={group.groupId} group={group} />
              ))}
          </div>
          <div className="my-group-subtitle">Group you joined:</div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {/* 渲染 creatorId 不在 memberId 中的部分 */}
            {mygroups
              .filter((group) => group.creatorId !== user.result._id)
              .map((group) => (
                <MyGroupUnit key={group.groupId} group={group} />
              ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MyGroups;
