import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addGroupPassword,
  createGroup,
  updateGroup,
} from "../../../../actions/group";
import GroupForm from "./GroupForm";
import FeedbackMsg from "../../../Widget/FeedbackMsg/FeedbackMsg";
import { useNavigate } from "react-router-dom";

import JoinGroup from "../../../../images/dabengou/JoinGroup.jpg";
import Warning from "../../../Widget/ConfirmDialog/Warning";
import * as api from "../../../../api";

export const CreateGroup = () => {
  const [groupData, setGroupData] = useState({
    groupName: "",
    tags: [],
    intro: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();

  /*   const groups = useSelector((state) => state.groups); */
  /*   const user = JSON.parse(localStorage.getItem("profile")); */
  const [text, setText] = useState("");
  const [pic, setPic] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("your password");
  const [showFeedbackMsg, setShowFeedbackMsg] = useState(false);
  const [message, setMessage] = useState("Update successfully");
  const [severity, setSeverity] = useState("success");
  const [groupId, setGroupId] = useState("");

  const navigate = useNavigate();
  const handelfeebackMsgClose = () => {
    setShowFeedbackMsg(false);
  };

  /*  const { groups } = useSelector((state) => state.groups); */
  const handleCreate = async () => {
    try {
      const createdGroupId = await dispatch(createGroup({ ...groupData }));
      console.log("createdGroupId", createdGroupId);
      setGroupId(createdGroupId);
      setPic(JoinGroup);
      setIsOpen(true);
    } catch (error) {
      /*  console.log("error:", error); */
      console.log(error);
      setMessage(error.response.data.error);
      setSeverity("error");
      setShowFeedbackMsg(true);
    }
  };
  const onConfirm = async () => {
    try {
      console.log("newgroupId", groupId);
      dispatch(addGroupPassword(groupId, { password: inputText }));

      setShowFeedbackMsg(true);
      navigate(`/groups/${groupId}`);
    } catch (error) {
      /*  setMessage("groupName is already used");
      setSeverity("error");
      setShowFeedbackMsg(true); */
      console.log(error);
      /*   window.location.href = "/groups/create-group"; */
    }
  };
  const onCancel = async () => {
    try {
      setShowFeedbackMsg(true);
      navigate(`/groups/${groupId}`);
    } catch (error) {
      console.log("onCancel", error);

      /*  window.location.href = "/groups/create-group"; */
    }
  };

  return (
    <>
      <GroupForm
        groupData={groupData}
        setGroupData={setGroupData}
        handleSubmit={handleCreate}
      />
      <FeedbackMsg
        status={showFeedbackMsg}
        message={message}
        severity={severity}
        onClose={handelfeebackMsgClose}
      />
      <Warning
        isOpen={isOpen}
        onConfirm={onConfirm}
        onCancel={onCancel}
        pic={pic}
        text="Create successfully! Do you want to make a private group? Add your pass word here:"
        initialText={inputText}
      />
    </>
  );
};
