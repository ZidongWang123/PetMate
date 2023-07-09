import React from "react";

import SearchBar from "../../Widget/SearchBar/SearchBar";

import GroupCreateButton from "./GroupCreateButton";

import "./Group.css";

import { useDispatch } from "react-redux";
import { getGroups } from "../../../actions/group";

import { useSelector } from "react-redux";
import GroupList from "./GroupList";
import { useNavigate } from "react-router-dom";
import Warning from "../../Widget/ConfirmDialog/Warning.jsx";
import signInPic from "../../../images/dabengou/SignInPic.jpg";
import bePrimePic from "../../../images/dabengou/BePrimePic.jpg";

const subscribeText = "Come subscribing first!";
const LoginText = "Please log in first!";

const Groups = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const navigate = useNavigate();
  const [text, setText] = React.useState("");
  const [pic, setPic] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const onClick = () => {
    console.log("Clicked");
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
      console.log("not logged in");
    }
  };

  const onConfirm = () => {
    setIsOpen(false);
    if (user) {
      navigate("/explore");
    } else {
      navigate("/auth");
    }
  };
  const onCancel = () => {
    setIsOpen(false);
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);
  const { groups } = useSelector((state) => state.groups);

  return (
    <div className="groups">
      <div style={{ display: "flex", alignItems: "center" }}>
        <SearchBar />
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
        {Array.isArray(groups) ? (
          groups.map((group) => <GroupList key={group._id} group={group} />)
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Groups;
