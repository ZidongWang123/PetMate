/* import { ListItem, ListItemAvatar } from "@mui/material";
import ListItemText from "@mui/material/ListItemText"; */
import Avatar from "@mui/material/Avatar";
import "./Group.css";
import * as api from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import { joinGroup } from "../../../actions/group";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Warning from "../../Widget/ConfirmDialog/Warning.jsx";
import signInPic from "../../../images/dabengou/SignInPic.jpg";
import JoinGroup from "../../../images/dabengou/JoinGroup.jpg";
import FeedbackMsg from "../../Widget/FeedbackMsg/FeedbackMsg";
import LockIcon from "@mui/icons-material/Lock";
const LoginText = "Go to log in and explore more!";

const severityOptions = { success: "success", failure: "error" };

const GroupList = ({ group }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [pic, setPic] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isFeedbackMsg, setIsFeedbackMsg] = useState(false);
  const [Msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");
  const handelfeebackMsgClose = () => {
    setIsFeedbackMsg(false);
  };
  const handleTextChange = (value) => {
    setInputText(value);
  };
  /* const Gpassword = group.password; */

  const onClick = () => {
    if (user && group.members && group.members.includes(user.result._id)) {
      navigate(`/groups/${group._id}`);
      setInputText("");
    } else if (user && group.password) {
      setInputText("your password");
      setText("please input the password:");
      setPic(JoinGroup);
      setIsOpen(true);
    } else if (user) {
      navigate(`/groups/${group._id}`);
      setInputText("");
    } else {
      setText(LoginText);
      setPic(signInPic);
      setIsOpen(true);
      setInputText("");
    }
  };

  const handleJoin = () => {
    if (user && group.password) {
      setInputText("your password");
      setText("please input the password:");
      setPic(JoinGroup);
      setIsOpen(true);
    } else {
      setText(`DO you want to join Group ${group.groupName}?`);
      setPic(JoinGroup);
      setIsOpen(true);
    }
  };

  const onConfirm = async () => {
    setIsOpen(false);
    if (!user) {
      navigate("/auth");
    } else if (!group.password) {
      handleJoinGroup();
      setSeverity(severityOptions.success);
      setMsg("Join Successfully");

      setTimeout(() => {
        navigate(`/groups/${group._id}`);
      }, 800);
      setIsFeedbackMsg(true);
    } else if (group.password) {
      try {
        const response = await api.verifyGroup(group._id, {
          password: inputText,
        });

        // 根据后端的响应进行处理
        if (response.status === 200) {
          // 密码验证成功，执行相应操作
          handleJoinGroup();
          setSeverity(severityOptions.success);
          setMsg("Join Successfully");

          setTimeout(() => {
            navigate(`/groups/${group._id}`);
          }, 800);
          setIsFeedbackMsg(true);
          // 其他操作...
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // 密码验证失败，执行相应操作
          setSeverity(severityOptions.failure);
          setMsg(error.response.data.message);
          setIsFeedbackMsg(true);
          // 其他操作...
        } else {
          // 其他错误处理
          setSeverity(severityOptions.failure);
          setMsg("Something went wrong");
          setIsFeedbackMsg(true);
        }
      }
    }
  };
  const onCancel = () => {
    setIsOpen(false);
  };

  const handleJoinGroup = async () => {
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

  const isMember =
    user && group.members && group.members.includes(user.result._id);
  const isCreator = user && group.creatorRefId === user.result._id;
  const containerStyle = {
    backgroundColor: isCreator ? "#fef3e8" : isMember ? "#f6e8fe" : "#ebebeb",
    // 其他样式属性
  };
  const createdAt = new Date(group.createdAt);
  const currentTime = new Date();
  const timeDifference = currentTime - createdAt;

  return (
    <div className="group-preview" key={group._id} style={containerStyle}>
      <Warning
        isOpen={isOpen}
        onConfirm={onConfirm}
        onCancel={onCancel}
        pic={pic}
        text={text}
        initialText={inputText}
        handleInputChange={handleTextChange}
      ></Warning>
      <div className="group-avatar">
        <Avatar alt="Remy Sharp" src={group.selectedFile} />
      </div>
      <div style={{ textDecoration: "none" }} onClick={onClick}>
        <div className="group-name-container">
          <div className="group-name">{group.groupName}</div>
          {user && isCreator && timeDifference <= 3600000 && (
            <div className="new-group-note">YOUR NEW GROUP!</div>
          )}
          {user && !isCreator && timeDifference <= 3600000 && (
            <div className="new-group-note">NEW GROUP!</div>
          )}
          {group.password && (
            <LockIcon sx={{ color: "#30263b", marginLeft: "5px" }} />
          )}
        </div>
        <div className="group-text-review">
          <div className="group-first-row">
            <div>
              {user
                ? group.creatorName === user.result.name && (
                    <p className="group-creater">Created by: You</p>
                  )
                : null}
              {user && group.creatorName !== user.result.name && (
                <p className="group-creater">Created by: {group.creatorName}</p>
              )}
              {!user && group.creatorName && (
                <p className="group-creater">Created by: {group.creatorName}</p>
              )}
            </div>
            <p className="group-amount">member:{group.groupCount}</p>
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
      </div>

      <div>
        {user &&
          (user.result._id === group.creatorRefId ? (
            <Link to={`/groups/${group._id}/edit-group`}>
              <button className="grouplist-button">edit</button>
            </Link>
          ) : group.members && group.members.includes(user.result._id) ? (
            <Link to={`/groups/${group._id}/create-post`}>
              <button className="grouplist-button">Write a Post</button>
            </Link>
          ) : (
            <button className="grouplist-button" onClick={handleJoin}>
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
