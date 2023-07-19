import Avatar from "@mui/material/Avatar";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroup,
  joinGroup,
  getGroupsBySearch,
} from "../../../../actions/group";
import Warning from "../../../Widget/ConfirmDialog/Warning.jsx";
import signInPic from "../../../../images/dabengou/SignInPic.jpg";
import JoinGroup from "../../../../images/dabengou/JoinGroup.jpg";
import FeedbackMsg from "../../../Widget/FeedbackMsg/FeedbackMsg";

const LoginText = "Go to log in and explore more!";
const severityOptions = { success: "success", failure: "error" };

const SingleGroupDetail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const { groups: singleGroup } = useSelector((state) => state.groups);

  const fetchGroup = useCallback(async () => {
    await dispatch(getGroup(id));
  }, [dispatch, id]);

  useEffect(() => {
    fetchGroup();
    setLoading(false);
  }, [fetchGroup]);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("profile"));
  const [text, setText] = useState("");
  const [pic, setPic] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [isFeedbackMsg, setIsFeedbackMsg] = useState(false);
  const [Msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");
  const handelfeebackMsgClose = () => {
    setIsFeedbackMsg(false);
  };

  const onClick = () => {
    if (user) {
      setText(`DO you want to join Group ${singleGroup.groupName}?`);
      setPic(JoinGroup);
      setIsOpen(true);
    } else {
      setText(LoginText);
      setPic(signInPic);
      setIsOpen(true);
    }
  };

  const onConfirm = () => {
    setIsOpen(false);
    if (!user) {
      navigate("/auth");
    } else {
      handleJoinGroup();
      setSeverity(severityOptions.success);
      setMsg("Join Successfully");


      setIsFeedbackMsg(true);
    }
  };
  const onCancel = () => {
    setIsOpen(false);
  };

  const handleJoinGroup = async () => {
    const groupMemberData = {
      groupId: singleGroup._id,

      creatorId: singleGroup.creatorId,

      memberId: user.result._id,
    };
    await dispatch(joinGroup(singleGroup._id, groupMemberData));
    fetchGroup();
  };
  const searchTag = async (value) => {

    const queryParams = new URLSearchParams();
    queryParams.append("keyword", value);
    await dispatch(getGroupsBySearch(value));
    const path = "/groups";
    const url = `${path}?${queryParams.toString()}`;
    navigate(url);
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
                  Member: {singleGroup.groupCount}
                </span>
                <p className="single-group-intro">{singleGroup.intro}</p>
                <p>
                  {singleGroup.tags &&
                    singleGroup.tags.map((tagItem, index) => (
                      <span
                        key={index}
                        className="single-tag"
                        onClick={() => searchTag(tagItem)}
                        style={{ cursor: "pointer" }}
                        onMouseEnter={(e) =>
                          (e.target.style.fontWeight = "bold")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.fontWeight = "normal")
                        }
                      >
                        #{tagItem}
                      </span>
                    ))}
                </p>

                <p>
                  {singleGroup.createdAt &&
                    singleGroup.createdAt === singleGroup.updatedAt &&
                    `Created at: ${formatDistanceToNow(
                      new Date(singleGroup.createdAt),
                      {
                        addSuffix: true,
                      }
                    )}`}
                </p>
                <p>
                  {singleGroup.createdAt &&
                    singleGroup.createdAt !== singleGroup.updatedAt &&
                    `Updated at: ${formatDistanceToNow(
                      new Date(singleGroup.updatedAt),
                      {
                        addSuffix: true,
                      }
                    )}`}
                </p>
              </div>
            </div>
          </div>
          <Warning
            isOpen={isOpen}
            onConfirm={onConfirm}
            onCancel={onCancel}
            pic={pic}
            text={text}
          ></Warning>
          <FeedbackMsg
            status={isFeedbackMsg}
            severity={severity}
            message={Msg}
            onClose={handelfeebackMsgClose}
          ></FeedbackMsg>
          <div className="single-group-button">
            {user.result._id === singleGroup.creatorRefId ? (
              <button className="joined-button">
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/groups/${singleGroup._id}/edit-group`}
                >
                  Edit
                </Link>
              </button>
            ) : singleGroup.members &&
              singleGroup.members.includes(user.result._id) ? (
              <button className="joined-button" disabled>
                Joined
              </button>
            ) : (
              <button className="joined-button" onClick={onClick}>
                Join Now
              </button>
            )}

            <button
              className="write-post-button"
              disabled={
                singleGroup.members &&
                !singleGroup.members.includes(user.result._id)
              }
            >
              <Link
                to={`/groups/${singleGroup._id}/create-post`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Write a Post
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleGroupDetail;
