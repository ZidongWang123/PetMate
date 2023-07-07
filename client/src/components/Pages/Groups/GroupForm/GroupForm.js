import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useRef } from "react";
import { useState } from "react";
import { Fragment } from "react";
/* import { useWorkoutsContext } from "../../../../hooks/useWorkoutsContext"; */
/* import PetsIcon from "@mui/icons-material/Pets"; */
import { useDispatch } from "react-redux";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

/* import { useHistory } from "react-router-dom/cjs/react-router-dom.min"; */

import {
  darkPurple,
  orange,
  brightOrange,
  darkGray,
} from "../../../../constant/actionTypes";
import InputBar from "../../../Widget/InputBar/InputBar";
import InputTextArea from "../../../Widget/InputBar/InputTextArea";
import InputTagBar from "../../../Widget/InputBar/InputTagBar";
import { createGroup } from "../../../../actions/group";

/* import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { Grid } from "@mui/material";
 */
const steps = [
  {
    label: "Groupname",
  },
  {
    label: "Tags",
  },
  {
    label: "Introduction",
  },
  {
    label: "Avatar",
  },
];

const GroupForm = () => {
  const [groupData, setGroupData] = useState({
    groupName: "",
    tags: [],
    intro: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();
  /*   const groups = useSelector((state) => state.groups); */
  const user = JSON.parse(localStorage.getItem("profile"));
  const token = user?.token;

  /*  useEffect(() => {
    if (groups) setGroupData(groups);
  }, [groups]);
 */
  /* const { dispatch } = useWorkoutsContext(); */

  /*   const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]); */

  //groupname

  const handleNameChange = (value) => {
    setGroupData({ ...groupData, groupName: value });
    console.log(groupData);
  };

  //tags

  const handleTagsChange = (tags) => {
    // 更新选中的标签状态

    setGroupData({ ...groupData, tags: tags });
    console.log(groupData);
    // 在标签数据变化时触发回调函数
    // 可以在这里进行其他处理
  };

  //groupintro

  const handleIntroChange = (value) => {
    setGroupData({ ...groupData, intro: value });

    console.log(groupData);
  };

  const handleEmojiClick = (emoji) => {
    setGroupData((prevData) => ({
      ...prevData,
      intro: prevData.intro + emoji,
    }));
    /* console.log(groupData.intro); */
    console.log(groupData);
  };

  //avatar

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileSelect = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*"; // 只接受图片类型的文件
    fileInput.addEventListener("change", handleFileChange);
    fileInput.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setGroupData({ ...groupData, selectedFile: file });

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
    console.log(file);
    // 处理选择的文件
  };
  const handleFileReset = () => {
    // 删除选中的文件和预览图像
    setSelectedFile(null);
  };

  //step related

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setGroupData({
      groupName: "",
      tags: [],
      intro: "",
      selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // normally for refreshing the page
    console.log("IM HERE", groupData);
    dispatch(createGroup({ ...groupData, creatorName: user?.result?.name }));
    handleReset();
  };
  /*  const response = await createGroup(groupData);
    const data = await response.json();
    if (response.ok) {
      console.log("new workout added", data);
    } */
  return (
    <div>
      <div
        className="title"
        style={{
          fontSize: "30px",

          textAlign: "center",
          margin: "20px 0",
          fontFamily: "Comic Sans MS",
          fontWeight: "bold",
          color: brightOrange,
        }}
      >
        Create your group here!
      </div>
      <div
        className="title"
        style={{
          fontSize: "15px",

          textAlign: "center",
          margin: "70px 0",
          fontFamily: "Comic Sans MS",
          /* fontWeight: "bold", */
          color: darkGray,
        }}
      >
        <p>Set up your groupname,</p>
        <p>related tags, </p>
        <p>some brief introduction,</p>
        <p> your cute avatar </p>
        to create your own community!!
      </div>

      <Box
        sx={{
          maxWidth: 1400,
          margin: "0 auto",
          minWidth: 1000,
          "@media (max-width: 600px)": {
            backgroundColor: "blue",
          },
        }}
      >
        <Stepper nonLinear activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} completed={completed[index]}>
              <StepButton sx={{ color: darkPurple }}>
                <Typography
                  /* variant="body1" */
                  sx={{
                    fontFamily: "Comic Sans MS",
                    fontWeight: "bold",
                    fontSize: "25px",
                    color: darkPurple,
                  }}
                  onClick={handleStep(index)}
                >
                  {step.label}
                </Typography>
              </StepButton>
              <form>
                <StepContent>
                  {activeStep === 0 && (
                    <InputBar
                      initialValue={groupData.groupName}
                      onInputChange={handleNameChange}
                      /*  value={stepInputs[1]} */
                      /*  value={name} */
                    />
                  )}
                  {activeStep === 1 && (
                    <InputTagBar
                      initialValue={groupData.tags}
                      onInputChange={handleTagsChange}
                    />
                  )}
                  {activeStep === 2 && (
                    <InputTextArea
                      initialValue={groupData.intro}
                      onInputChange={handleIntroChange}
                      onEmojiClick={handleEmojiClick}
                    />
                  )}
                  {activeStep === 3 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "0 20px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          /* margin: "40px 0", */
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={handleFileSelect}
                          endIcon={<AddPhotoAlternateIcon />}
                          sx={{
                            /*  marginTop: 5, */
                            marginLeft: 2,
                            marginRight: 5,
                            marginBottom: 2,
                            padding: 2,
                            paddingLeft: 2,
                            paddingRight: 2,
                            borderRadius: "200px",
                            color: darkPurple,
                            backgroundColor: "white",
                            border: orange,

                            ":hover": {
                              backgroundColor: orange,
                              color: "white",
                            },
                          }}
                        >
                          select pics
                        </Button>

                        <Button
                          variant="contained"
                          onClick={handleFileReset}
                          sx={{
                            /*  marginTop: 5, */
                            marginLeft: 2,
                            marginRight: 5,
                            padding: 2,
                            paddingLeft: 2,
                            paddingRight: 2,
                            borderRadius: "200px",
                            color: darkPurple,
                            backgroundColor: "white",
                            border: orange,
                            width: 150,

                            ":hover": {
                              backgroundColor: orange,
                              color: "white",
                            },
                          }}
                        >
                          reset
                        </Button>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      {selectedFile && (
                        <div>
                          <h2
                            style={{
                              color: darkPurple,
                              fontFamily: "Comic Sans MS",
                              fontSize: 15,
                            }}
                          >
                            preview image
                          </h2>
                          <img
                            src={previewImage}
                            alt="预览图像"
                            style={{ maxWidth: "150px", maxHeight: "150px" }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <Box sx={{ mb: 2, marginTop: 2 }}>
                    <div sx={{}}>
                      <Button
                        /* variant="contained" */
                        color="success"
                        onClick={
                          completedSteps() === totalSteps() - 1
                            ? handleSubmit
                            : handleComplete
                        }
                        sx={{
                          mt: 1,
                          mr: 1,
                          borderRadius: "100px",
                          fontWeight: "bold",
                        }}
                      >
                        {completedSteps() === totalSteps() - 1
                          ? "Finish"
                          : "Next"}
                      </Button>
                      <Button
                        /* variant="contained" */
                        /* color="secondary" */
                        onClick={handleBack}
                        sx={{
                          mt: 1,
                          mr: 1,
                          borderRadius: "100px",
                          /* backgroundColor: "#009999", */
                          fontWeight: "bold",
                          color: darkGray,
                        }}
                        disabled={index === 0}
                      >
                        {"Back"}
                      </Button>

                      <Button
                        /* disabled={index === 0} */
                        /* variant="contained" */
                        onClick={handleReset}
                        sx={{
                          mt: 1,
                          mr: 1,
                          borderRadius: "100px",
                          /* backgroundColor: "#67AB9F", */
                          fontWeight: "bold",
                          color: brightOrange,
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </form>
            </Step>
          ))}
        </Stepper>
        {allStepsCompleted() ? (
          <Fragment>
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          </Fragment>
        ) : null}
      </Box>
    </div>
  );
};

export default GroupForm;
