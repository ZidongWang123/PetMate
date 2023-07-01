/* import { ListItem, ListItemAvatar } from "@mui/material";
import ListItemText from "@mui/material/ListItemText"; */
import Avatar from "@mui/material/Avatar";
import "./Group.css";
import { Link } from "react-router-dom";

const GroupList = ({ group }) => {
  return (
    <div className="group-preview">
      <div className="group-avatar">
        <Link style={{ textDecoration: "none" }} to={`/groups/${group._id}`}>
          <Avatar alt="Remy Sharp" src={group.imageURL} />
        </Link>
      </div>
      <div className="group-text-review">
        <div className="group-first-row">
          <div className="group-name">
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/groups/${group._id}`}
            >
              {group.title}
            </Link>
          </div>
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

      <button className="grouplist-button">Join Now</button>
    </div>
  );
};

export default GroupList;
