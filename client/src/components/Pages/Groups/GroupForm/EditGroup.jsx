import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroup, updateGroup } from "../../../../actions/group";
import { useEffect } from "react";
import GroupForm from "./GroupForm";
import { useNavigate, useParams } from "react-router-dom";
import FeedbackMsg from "../../../Widget/FeedbackMsg/FeedbackMsg";

export const EditGroup = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFeedbackMsg, setShowFeedbackMsg] = useState(false);
  const navigate = useNavigate();
  const handelfeebackMsgClose = () => {
    setShowFeedbackMsg(false);
  };

  useEffect(() => {
    dispatch(getGroup(id)).then(() => {
      setLoading(false);
    });
  }, [dispatch, id]);
  const { groups: singleGroup } = useSelector((state) => state.groups);
  useEffect(() => {
    if (!loading && singleGroup) {
      setGroupData({
        groupName: singleGroup.groupName,
        tags: singleGroup.tags,
        intro: singleGroup.intro,
        selectedFile: singleGroup.selectedFile,
      });
      setLoading(false);
    }
  }, [singleGroup]);

  const handleEdit = async () => {
    dispatch(updateGroup(id, groupData));
    setTimeout(() => {
      navigate(`/groups/${id}`);
    }, 600);
    setShowFeedbackMsg(true);
  };
  return (
    <>
      {!loading && groupData ? (
        <GroupForm
          groupData={groupData}
          setGroupData={setGroupData}
          handleSubmit={handleEdit}
        />
      ) : (
        <div>Loading...</div>
      )}
      <FeedbackMsg
        status={showFeedbackMsg}
        message="Update successfully"
        severity="success"
        onClose={handelfeebackMsgClose}
      />
    </>
  );
};
