import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../../../../actions/group";
import GroupForm from "./GroupForm";
export const CreateGroup = () => {
  const [groupData, setGroupData] = useState({
    groupName: "",
    tags: [],
    intro: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();

  /*   const groups = useSelector((state) => state.groups); */
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleCreate = async () => {
    dispatch(createGroup({ ...groupData }));
  };
  return (
    <GroupForm
      groupData={groupData}
      setGroupData={setGroupData}
      handleSubmit={handleCreate}
    />
  );
};
