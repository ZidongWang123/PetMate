import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
/* import { useWorkoutsContext } from "../../../../hooks/useWorkoutsContext"; */
/* import { useAuthContext } from "../../../../hooks/useAuthContext"; */
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getGroup } from "../../../../actions/group";
const SingleGroupDetail = () => {
  /* const { user } = useAuthContext(); */
  const { id } = useParams();
  const dispatch = useDispatch();
  /*   const { workouts: singleGroup, dispatch } = useWorkoutsContext(); */
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("profile"));
  const token = user?.token;
  const { groups: singleGroup } = useSelector((state) => state.groups);
  useEffect(() => {
    dispatch(getGroup(id));
    setLoading(false);
  }, [dispatch, id]);

  /* useEffect(() => {
    const fetchSingleGroup = async () => {
      const response = await fetch("http://localhost:100/api/groups/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

    if (user) {
      fetchSingleGroup();
    }
  }, [dispatch, user._id]); */
  /*   useEffect(() => {
    console.log(singleGroup);
  }, [singleGroup]); */
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
