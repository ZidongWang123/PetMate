/* import { ListItem, ListItemAvatar } from "@mui/material";
import ListItemText from "@mui/material/ListItemText"; */
import Avatar from "@mui/material/Avatar";
import "./Group.css";
import { Link } from "react-router-dom";

const GroupList = ({ group }) => {
  return (
    <div className="group-preview">
      <Link style={{ textDecoration: "none" }} to={`/groups/${group._id}`}>
        <div className="group-avatar">
          <Avatar alt="Remy Sharp" src={group.imageURL} />
        </div>
        <div className="group-text-review">
          <div className="group-first-row">
            <div className="group-name">{group.title}</div>
            <p className="group-creater">Created by:{group.creator}</p>
            <p className="group-amount">member:{group.numbers}</p>
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
      <button className="grouplist-button">Join Now</button>
    </div>
  );
};

export default GroupList;
