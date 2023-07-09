/*
 * @Author: xiehuan 1208044257@qq.com
 * @Date: 2023-07-09 13:44:19
 * @LastEditors: xiehuan 1208044257@qq.com
 * @LastEditTime: 2023-07-09 15:03:18
 * @FilePath: \prototype\client\src\components\Pages\Groups\Groups.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";

import SearchBar from "../../Widget/SearchBar/SearchBar";

import GroupCreateButton from "./GroupCreateButton";

import { Link } from "react-router-dom";
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




