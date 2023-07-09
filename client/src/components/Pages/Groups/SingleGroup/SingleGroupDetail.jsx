import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
/* import { useWorkoutsContext } from "../../../../hooks/useWorkoutsContext"; */
/* import { useAuthContext } from "../../../../hooks/useAuthContext"; */
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getGroup, joinGroup } from "../../../../actions/group";

const SingleGroupDetail = () => {
  /* const { user } = useAuthContext(); */
  const { id } = useParams();
  const dispatch = useDispatch();
  /*   const { workouts: singleGroup, dispatch } = useWorkoutsContext(); */
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("profile"));

  const { groups: singleGroup } = useSelector((state) => state.groups);

  useEffect(() => {
    dispatch(getGroup(id));
    setLoading(false);
  }, [dispatch, id]);

  const handleEdit = () => {
    console.log("edit");
  };

  const handleJoinGroup = () => {
    console.log("join");
    const groupMemberData = {
      groupName: singleGroup.groupName,
      groupId: singleGroup._id,
      creatorName: singleGroup.creatorName,
      creatorId: singleGroup.creatorId,
      memberName: user.result.name,
      memberId: user.result._id,
    };
    dispatch(joinGroup(singleGroup._id, groupMemberData));
  };

  return (
    <div className="group-details">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="single-group-info" key={singleGroup._id}>
          <div className="firstrow">
            <div className="single-group-avatar">
              <Avatar alt="Remy Sharp" src={singleGroup.selectedFile} />
            </div>
            <div className="group-description">
              <div className="single-group-name-creater">
                <span className="single-group-name">
                  {singleGroup.groupName}
                </span>
                <span className="single-group-creater">
                  Created by: {singleGroup.creatorName}
                </span>

                <span className="single-group-amount">
                  Member: {singleGroup.groupcount}
                </span>
                <p className="single-group-intro">{singleGroup.intro}</p>
                <p>
                  {singleGroup.tags &&
                    singleGroup.tags.map((tagItem, index) => (
                      <span key={index} className="single-tag">
                        #{tagItem}
                      </span>
                    ))}
                </p>
                <p>
                  {singleGroup.createdAt &&
                    formatDistanceToNow(new Date(singleGroup.createdAt), {
                      addSuffix: true,
                    })}
                  {/*  {singleGroup.createdAt} */}
                </p>
              </div>
            </div>
          </div>

          <div className="single-group-button">
            {user.result._id === singleGroup.creatorId ? (
              <button className="joined-button" onClick={handleEdit}>
                Edit
              </button>
            ) : singleGroup.members &&
              singleGroup.members.includes(user.result._id) ? (
              <button className="joined-button" disabled>
                Joined
              </button>
            ) : (
              <button className="joined-button" onClick={handleJoinGroup}>
                Join Now
              </button>
            )}
            <Link to="/groups/:id/create-post">
              <button className="write-post-button">Write a Post</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleGroupDetail;
