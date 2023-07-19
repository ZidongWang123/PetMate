import React from "react";

import GroupCreateButton from "./GroupCreateButton";

import "./Group.css";

import { useDispatch } from "react-redux";
import { getGroupsBySearch, getGroups } from "../../../actions/group";

import { useSelector } from "react-redux";
import GroupList from "./GroupList";
import { useNavigate, useLocation } from "react-router-dom";

import Warning from "../../Widget/ConfirmDialog/Warning.jsx";
import signInPic from "../../../images/dabengou/SignInPic.jpg";
import bePrimePic from "../../../images/dabengou/BePrimePic.jpg";

import SearchBar from "../../Widget/SearchBar/SearchBar";

const subscribeText = "Come subscribing first!";
const LoginText = "Please log in first!";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Groups = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const query = useQuery();
  const searchQuery = query.get("keyword");
  const navigate = useNavigate();
  const [text, setText] = React.useState("");
  const [pic, setPic] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const onClick = () => {
    if (user && user.result.isPrime) {
      navigate("/groups/create-group");
    } else if (user) {
      setText(subscribeText);
      setPic(bePrimePic);
      setIsOpen(true);
    } else {
      setText(LoginText);
      setPic(signInPic);
      setIsOpen(true);
    }
  };

  const onConfirm = () => {
    setIsOpen(false);
    if (!user) {
      navigate("/auth");
    } else if (user && !user.result.isPrime) {
      navigate("/subscription");
    }
  };
  const onCancel = () => {
    setIsOpen(false);
  };

  const dispatch = useDispatch();
  const { groups, isLoading } = useSelector((state) => state.groups);
  React.useEffect(() => {
    if (!searchQuery) {
      dispatch(getGroups());
    } else {
      searchGroups(searchQuery);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // 显示加载中的提示
  }
  const groupResults =
    Array.isArray(groups) &&
    groups.map(({ _id, groupName }) => ({
      _id,
      recommended: groupName,
    }));
  const groupNames =
    Array.isArray(groupResults) &&
    groupResults.map(({ recommended }) => recommended);

  const searchGroups = async (value) => {
    if (value) {
      const queryParams = new URLSearchParams();
      queryParams.append("keyword", value);
      await dispatch(getGroupsBySearch(value));
      const path = "/groups";
      const url = `${path}?${queryParams.toString()}`;
      navigate(url);
    } else {
      dispatch(getGroups());
    }
  };
  return (
    <div className="groups">
      <div style={{ display: "flex", alignItems: "center" }}>
        <SearchBar results={groupNames} searchPost={searchGroups} />
        <Warning
          isOpen={isOpen}
          onConfirm={onConfirm}
          onCancel={onCancel}
          pic={pic}
          text={text}
        ></Warning>
        <GroupCreateButton onClick={onClick}></GroupCreateButton>
      </div>
      <div className="group-list">
        {groups && !isLoading && Array.isArray(groups) ? (
          groups.map((group) => <GroupList key={group._id} group={group} />)
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Groups;
