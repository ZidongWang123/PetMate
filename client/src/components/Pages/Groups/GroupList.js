/* import { ListItem, ListItemAvatar } from "@mui/material";
import ListItemText from "@mui/material/ListItemText"; */
import Avatar from "@mui/material/Avatar";
import "./Group.css";
import { Link } from "react-router-dom";
import { joinGroup } from "../../../actions/group";
import { useDispatch } from "react-redux";

const GroupList = ({ group }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const handleEdit = () => {
    console.log("edit");
  };

  const handleJoinGroup = () => {
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
  };
  /*   const isJoined = useSelector((state) => state.joined);
  console.log(isJoined); */

  return (
    <div className="group-preview" key={group._id}>
      <div className="group-avatar">
        <Avatar alt="Remy Sharp" src={group.selectedFile} />
      </div>
      <Link style={{ textDecoration: "none" }} to={`/groups/${group._id}`}>
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
        {user &&
          (user.result._id === group.creatorId ? (
            <button className="grouplist-button" onClick={handleEdit}>
              edit
            </button>
          ) : group.members && group.members.includes(user.result._id) ? (
            <Link to="/groups/:id/create-post">
              <button className="grouplist-button">Write a Post</button>
            </Link>
          ) : (
            <button className="grouplist-button" onClick={handleJoinGroup}>
              Join Now
            </button>
          ))}
        {/*  isJoined ? (
            <Link
              style={{ textDecoration: "none" }}
              className="grouplist-button"
              to={`/groups/${group._id}/create-post`}
            >
              Post now!
            </Link>
          ) : */}
      </div>
    </div>
  );
};

export default GroupList;
