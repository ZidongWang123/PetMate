import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWorkoutsContext } from "../../../../hooks/useWorkoutsContext";
/* import { useAuthContext } from "../../../../hooks/useAuthContext"; */
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const SingleGroupDetail = () => {
  /* const { user } = useAuthContext(); */
  const { id } = useParams();
  const { workouts: singleGroup, dispatch } = useWorkoutsContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSingleGroup = async () => {
      const response = await fetch(
        "http://localhost:100/api/groups/" + id
        /* {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      } */
      );
      const json = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
        console.log(singleGroup);
        setLoading(false);
      }
    };
    fetchSingleGroup();
    /*    if (user) {
      fetchSingleGroup();
    } */
  }, [dispatch]);
  useEffect(() => {
    console.log(singleGroup);
  }, [singleGroup]);
  return (
    <div className="group-details">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="single-group-info" key={singleGroup._id}>
          <div className="firstrow">
            <div className="single-group-avatar">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </div>
            <div className="group-description">
              <div className="single-group-name-creater">
                <span className="single-group-name">{singleGroup.title}</span>
                <span className="single-group-creater">
                  Created by: {singleGroup.creator}
                </span>

                <span className="single-group-amount">
                  Member: {singleGroup.numbers}
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
                  {formatDistanceToNow(new Date(singleGroup.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="single-group-button">
            <button className="joined-button">Join now</button>
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
