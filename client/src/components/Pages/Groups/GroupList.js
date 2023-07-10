/* import { ListItem, ListItemAvatar } from "@mui/material";
import ListItemText from "@mui/material/ListItemText"; */
import Avatar from "@mui/material/Avatar";
import "./Group.css";
import { Link, useNavigate } from "react-router-dom";
import { joinGroup } from "../../../actions/group";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Warning from "../../Widget/ConfirmDialog/Warning.jsx";
import signInPic from "../../../images/dabengou/SignInPic.jpg";
import JoinGroup from "../../../images/dabengou/JoinGroup.jpg";
import FeedbackMsg from "../../Widget/FeedbackMsg/FeedbackMsg";
const LoginText = "Go to log in and explore more!";

const severityOptions = { success: "success", failure: "error" };

const GroupList = ({ group }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [pic, setPic] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [isFeedbackMsg, setIsFeedbackMsg] = useState(false);
  const [Msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");
  const handelfeebackMsgClose = () => {
    setIsFeedbackMsg(false);
  };

  const onClick = () => {
    console.log("Clicked");
    if (user) {
      setText(`DO you want to join Group ${group.groupName}?`);
      setPic(JoinGroup);
      setIsOpen(true);
    } else {
      setText(LoginText);
      setPic(signInPic);
      setIsOpen(true);
      /* console.log("not logged in"); */
    }
  };
  const des = user ? `/groups/${group._id}` : "#";
  const onConfirm = () => {
    setIsOpen(false);
    if (!user) {
      navigate("/auth");
    } else {
      handleJoinGroup();
      setSeverity(severityOptions.success);
      setMsg("Join Successfully");

      setTimeout(() => {
        navigate(`/groups/${group._id}`);
      }, 800);
      setIsFeedbackMsg(true);
    }
  };
  const onCancel = () => {
    setIsOpen(false);
  };

  const handleJoinGroup = async () => {
    console.log("join");
    const groupMemberData = {
      groupName: group.groupName,
      groupId: group._id,
      creatorName: group.creatorName,
      creatorId: group.creatorId,
      memberName: user.result.name,
      memberId: user.result._id,
    };
    dispatch(joinGroup(group._id, groupMemberData));
    // 获取最新的group信息
  };

  const isMember = group.members && group.members.includes(user.result._id);
  const containerStyle = {
    backgroundColor: isMember ? "#ffd396c8" : "#ebebeb",
    // 其他样式属性
  };

  return (
    <div className="group-preview" key={group._id} style={containerStyle}>
      <Warning
        isOpen={isOpen}
        onConfirm={onConfirm}
        onCancel={onCancel}
        pic={pic}
        text={text}
      ></Warning>
      <div className="group-avatar">
        <Avatar alt="Remy Sharp" src={group.selectedFile} />
      </div>
      <Link style={{ textDecoration: "none" }} onClick={onClick} to={des}>
        <div className="group-name">{group.groupName}</div>
        <div className="group-text-review">
          <div className="group-first-row">
            <p className="group-creater">Created by:{group.creatorName}</p>
            <p className="group-amount">member:{group.groupcount}</p>
          </div>
          <p className="group-intro-text">{group.intro}</p>
          <p>
            {group.tags &&
              group.tags.map((tagItem, index) => (
                <span key={index} className="tag">
                  #{tagItem}
                </span>
              ))}
          </p>
        </div>
      </Link>

      <div>
        <Warning
          isOpen={isOpen}
          onConfirm={onConfirm}
          onCancel={onCancel}
          pic={pic}
          text={text}
        ></Warning>
        {user &&
          (user.result._id === group.creatorId ? (
            <Link to={`/groups/${group._id}/edit-group`}>
              <button className="grouplist-button">edit</button>
            </Link>
          ) : group.members && group.members.includes(user.result._id) ? (
            <Link to={`/groups/${group._id}/create-post`}>
              <button className="grouplist-button">Write a Post</button>
            </Link>
          ) : (
            <button className="grouplist-button" onClick={onClick}>
              Join Now
            </button>
          ))}
        <FeedbackMsg
          status={isFeedbackMsg}
          severity={severity}
          message={Msg}
          onClose={handelfeebackMsgClose}
        ></FeedbackMsg>
      </div>
    </div>
  );
};

export default GroupList;
