import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroup } from "../../../../actions/group";
import GroupForm from "./GroupForm";
import FeedbackMsg from "../../../Widget/FeedbackMsg/FeedbackMsg";
import { useNavigate } from "react-router-dom";
import JoinGroup from "../../../../images/dabengou/JoinGroup.jpg";
import InputDialog from "../../../Widget/ConfirmDialog/InputDialog";

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

  const navigate = useNavigate();
  const handelfeebackMsgClose = () => {
    setShowFeedbackMsg(false);
  };

  const onConfirm = async () => {
    try {
      await dispatch(createGroup({ ...groupData, password: inputText }));

      setShowFeedbackMsg(true);
      navigate(`/groups`);
    } catch (error) {
      console.log(error);
    }
  };
  const onCancel = async () => {
    try {
      await dispatch(createGroup({ ...groupData }));

      setShowFeedbackMsg(true);
      navigate(`/groups`);
    } catch (error) {
      console.log(error);
    }
  };
  /*  const { groups } = useSelector((state) => state.groups); */
  const handleCreate = async () => {
    setPic(JoinGroup);
    setIsOpen(true);
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
        message="Update successfully"
        severity="success"
        onClose={handelfeebackMsgClose}
      />
      <InputDialog
        isOpen={isOpen}
        onConfirm={onConfirm}
        onCancel={onCancel}
        pic={pic}
        text="Do you want to make a private group? Add your pass word here:"
        initialText={inputText}
      />
    </>
  );
};
