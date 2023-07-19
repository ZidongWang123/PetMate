import React from "react";

import Avatar from "@mui/material/Avatar";
import "./MyGroup.css";
import ClearIcon from "@mui/icons-material/Clear";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Warning from "../../Widget/ConfirmDialog/Warning";
import { Link } from "react-router-dom";
import DelGroup from "../../../images/dabengou/DelGroup.jpg";
import ExitGroupPic from "../../../images/dabengou/ExitGroupPic.jpg";
import { useDispatch } from "react-redux";
import { deleteGroup } from "../../../actions/group";
import LockIcon from "@mui/icons-material/Lock";

const MyGroupUnit = ({ group }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const ExitText = `You want to exit group ${group.groupName} ?`;
  const DeleteText = `Are you sure you want to delete group ${group.groupName}? All posts will be deleted!`;

  const [text, setText] = React.useState("");
  const [pic, setPic] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const onClick = () => {
    if (user.result._id === group.creatorId) {
      setText(DeleteText);
      setPic(DelGroup);
      setIsOpen(true);
    } else {
      setText(ExitText);
      setPic(ExitGroupPic);
      setIsOpen(true);
    }
  };

  const onConfirm = () => {
    setIsOpen(false);

    dispatch(deleteGroup(group.groupId));
  };
  const onCancel = () => {
    setIsOpen(false);
  };

  return (
    <div className="myGroupUnit" key={group.groupId}>
      <div className="delete-mygroup">
        <Warning
          isOpen={isOpen}
          onConfirm={onConfirm}
          onCancel={onCancel}
          pic={pic}
          text={text}
        ></Warning>
        <ClearIcon onClick={onClick} />
      </div>
      <Link style={{ textDecoration: "none" }} to={`/groups/${group.groupId}`}>
        <div className="mygroup-avatar">
          <Avatar src={group.selectedFile} />
        </div>
        <div className="mygroup-title">
          {group.groupName}
          {group.password && (
            <LockIcon sx={{ color: "#30263b", marginLeft: "5px" }} />
          )}
        </div>

        <div>
          {group.creatorId === user.result._id ? (
            <div className="owner-comment"> Created at</div>
          ) : (
            <div className="join-comment">Join at</div>
          )}
        </div>
        <div className="mygroup-time">
         
          {group.createdAt &&
            formatDistanceToNow(new Date(group.createdAt), {
              addSuffix: true,
            })}
        </div>
      </Link>
    </div>
  );
};

export default MyGroupUnit;
