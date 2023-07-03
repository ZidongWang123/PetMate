import Avatar from "@mui/material/Avatar";
import "./MyGroup.css";
import ClearIcon from "@mui/icons-material/Clear";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const MyGroupUnit = ({ group }) => {
  const handleExit = () => {
    console.log("exit the group");
  };
  return (
    <div className="myGroupUnit">
      <div className="mygroup-avatar">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </div>
      <div className="mygroup-title">{group.title}</div>
      <div className="delete-mygroup" onClick={handleExit}>
        <ClearIcon />
      </div>
      <div className="owner-comment">You are owner.</div>
      <div className="mygroup-time">
        {formatDistanceToNow(new Date(group.createdAt), {
          addSuffix: true,
        })}
      </div>
    </div>
  );
};

export default MyGroupUnit;
