import * as React from "react";
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
/* import PetsIcon from "@mui/icons-material/Pets"; */

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
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  //groupname

  const [name, setName] = React.useState("");
  const handleNameChange = (value) => {
    setName(value);
  };

  //tags

  const [tag, setTag] = useState([]);
  const handleTagsChange = (tags) => {
    // 更新选中的标签状态

    setTag(tags);
    console.log(tags);
    // 在标签数据变化时触发回调函数
    // 可以在这里进行其他处理
  };

  //groupintro
  const [intro, setIntro] = React.useState("");

  const handleIntroChange = (value) => {
    setIntro(value);
    console.log(intro);
  };

  const handleEmojiClick = (emoji) => {
    setIntro((prevValue) => `${prevValue}${emoji}`);
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

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
    // 处理选择的文件
  };
  const handleFileReset = () => {
    // 删除选中的文件和预览图像
    setSelectedFile(null);
  };

  //step related
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // normally for refreshing the page

    //create some dummy workout object => gonna send as a body of the request
    const group = { name, tag, intro, previewImage };

    const response = await fetch("http://localhost:4000/api/groups", {
      method: "POST",
      body: JSON.stringify(group), //changes that dummy workout object into a json string and sends that as a body
      headers: {
        "Content-Type": "application/json",
      }, //to say content type should be json
    }); //fetch request to post new data
    const json = await response.json();
    //when we send a post request, we handle that in backend file -> workoutController -> fire createWorkout function -> if successful, return json(workout)
    if (!response.ok) {
      setError(json.error); //参考workoutController:json有error property
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      //refresh the form, if wanting to add new one no need to delete previous one
      setName("");
      setTag([]);
      setIntro("");
      setSelectedFile(null);
      setPreviewImage(null);
      setError(null);
      console.log("new group added", json);
      /*  dispatch({ type: "CREATE_WORKOUT", payload: json }); */
      setEmptyFields([]);
    }
  };

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

              <StepContent>
                {activeStep === 0 && (
                  <InputBar
                    initialValue={name}
                    onInputChange={handleNameChange}
                    /*  value={stepInputs[1]} */
                    /*  value={name} */
                  />
                )}
                {activeStep === 1 && (
                  <InputTagBar
                    initialValue={tag}
                    onInputChange={handleTagsChange}
                  />
                )}
                {activeStep === 2 && (
                  <InputTextArea
                    initialValue={intro}
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
                        : "Complete Step"}
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
              {/* </form> */}
            </Step>
          ))}
        </Stepper>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          </React.Fragment>
        ) : (
          <React.Fragment> </React.Fragment>
        )}
      </Box>
    </div>
  );
};

export default GroupForm;
