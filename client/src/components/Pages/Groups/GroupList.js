/* import { ListItem, ListItemAvatar } from "@mui/material";
import ListItemText from "@mui/material/ListItemText"; */
import Avatar from "@mui/material/Avatar";
import "./Group.css";
const GroupList = ({ groups, groupJoin }) => {
  return (
    <div className="group-list">
      {groups.map((group) => (
        <div className="group-preview" key={group.id}>
          <div className="group-avatar">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </div>
          <div className="group-text-review">
            <div className="group-first-row">
              <p className="group-name">{group.name}</p>
              <p className="group-creater">Created by:{group.creater}</p>
              <p className="group-amount">member:{group.amount}</p>
            </div>
            <p className="group-intro-text">{group.intro}</p>
            <p>
              {group.tag.map((tagItem, index) => (
                <span key={index} className="tag">
                  #{tagItem}
                </span>
              ))}
            </p>
          </div>
          <button className="group-button" onClick={() => groupJoin(group.id)}>
            Join Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
