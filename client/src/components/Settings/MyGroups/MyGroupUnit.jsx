import Avatar from "@mui/material/Avatar";
import "./MyGroup.css";
import ClearIcon from "@mui/icons-material/Clear";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const MyGroupUnit = ({ group }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleExit = () => {
    console.log("exit the group");
  };
  return (
    <div className="myGroupUnit" key={group.groupId}>
      <div className="mygroup-avatar">
        <Avatar alt="Remy Sharp" src={group.selectedFile} />
      </div>
      <div className="mygroup-title">{group.groupName}</div>
      <div className="delete-mygroup" onClick={handleExit}>
        <ClearIcon />
      </div>

      <div>
        {group.creatorId === user.result._id ? (
          <div className="owner-comment"> Created at</div>
        ) : (
          <div className="join-comment">Join at</div>
        )}
      </div>
      <div className="mygroup-time">
        {/*  {group.creatorId === user.result._id ?(""):()} */}
        {group.createdAt &&
          formatDistanceToNow(new Date(group.createdAt), {
            addSuffix: true,
          })}
      </div>
    </div>
  );
};

export default MyGroupUnit;
