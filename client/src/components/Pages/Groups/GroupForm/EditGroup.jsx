import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroup, updateGroup } from "../../../../actions/group";
import { useEffect } from "react";
import GroupForm from "./GroupForm";
import { useParams } from "react-router-dom";
export const EditGroup = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(getGroup(id));
  }, [dispatch, id]);
  const { groups: singleGroup } = useSelector((state) => state.groups);
  useEffect(() => {
    if (singleGroup) {
      setGroupData({
        groupName: singleGroup.groupName,
        tags: singleGroup.tags,
        intro: singleGroup.intro,
        selectedFile: singleGroup.selectedFile,
      });
      setIsLoading(false);
    }
  }, [singleGroup]);

  /*   const groups = useSelector((state) => state.groups); */
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleEdit = async () => {
    dispatch(updateGroup({ ...groupData, creatorName: user?.result?.name }));
  };
  return (
    <>
      {!isLoading && groupData ? (
        <GroupForm
          groupData={groupData}
          setGroupData={setGroupData}
          handleSubmit={handleEdit}
        />
      ) : null}
    </>
  );
};
