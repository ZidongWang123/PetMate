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

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

/* import { useHistory } from "react-router-dom/cjs/react-router-dom.min"; */

import {
  darkPurple,
  orange,
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

  const [name, setName] = React.useState("my groupname");

  const [intro, setIntro] = React.useState("my group intro");

  const handleNameChange = (value) => {
    setName(value);
  };

  /* 
  const handleAvatarChange = (value) => {
    setAvatar(value);
  }; */

  const handleIntroChange = (value) => {
    setIntro(value);
  };

  //tag state
  /*   const handleTagsChange = (tags) => {
    // 更新选中的标签状态
    selectedTagsRef.current = tags;
    // 在标签数据变化时触发回调函数
    // 可以在这里进行其他处理
  }; 

  const selectedTags = selectedTagsRef.current;*/

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

  const handleTagsChange = (tags) => {
    // 更新选中的标签状态
   console.log(tags);
    // 在标签数据变化时触发回调函数
    // 可以在这里进行其他处理
  };

  return (
    /*  <div className="HorizontalStepper"> */
    <div>
      <div
        className="title"
        style={{
          fontSize: "30px",
          color: "darkpurple",
          textAlign: "center",
          margin: "20px 0",
          fontFamily: "Comic Sans MS",
          fontWeight: "bold",
          color: darkPurple,
        }}
      >
        Create your group here!
      </div>
      {/*       <Box sx={{ width: "100%", marginTop: 10, marginBottom: 10 }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step key={step.label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {step.label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box> */}

      <Box sx={{ maxWidth: 1400, margin: "0 auto", minWidth: 1000 }}>
        <Stepper nonLinear activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} completed={completed[index]}>
              <StepButton onClick={handleStep(index)}>
                <Typography
                  /* variant="body1" */
                  sx={{
                    fontFamily: "Comic Sans MS",
                    fontWeight: "bold",
                    fontSize: "25px",
                    color: orange,
                  }}
                >
                  {step.label}
                </Typography>
              </StepButton>

              {/* <StepLabel

                optional={
                  index === steps.length - 1 ? (
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: "Comic Sans MS",
                        fontWeight: "bold",
                        color: darkPurple,
                      }}
                    >
                      Last step
                    </Typography>
                  ) : null
                } 
              ></StepLabel> */}
              {/*     <form onSubmit={handleSubmit}> */}
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
                                      
                  onInputChange={handleTagsChange}
                  />
                )}
                {activeStep === 2 && (
                  <InputTextArea
                    initialValue={intro}
                    onInputChange={handleIntroChange}
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

                {/*  {activeStep === 2 && (
                    /*                     <InputBar
                      type="text"
                      required
                      value={intro}
                      onChange={(e) => setIntro(e.target.intro)}
                    /> */
                /*                     <input
                      type="text"
                      required
                      value={intro}
                      onChange={(e) => setIntro(e.target.intro)}
                    /> 
                  )} */}
                {/*                 {step.input && (
                  <input
                    type="text"
                    value={stepInputs[index]}
                    onChange={(e) => handleStepInput(index, e.target.value)}
                  />
                )} */}
                {/*    <Typography> {step.description} </Typography> */}

                <Box sx={{ mb: 2, marginTop: 2 }}>
                  <div sx={{}}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleComplete}
                      sx={{ mt: 1, mr: 1, borderRadius: "100px" }}
                    >
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1, borderRadius: "100px" }}
                      disabled={index === 3}
                    >
                      {"Continue"}
                    </Button>

                    <Button
                      disabled={index === 0}
                      variant="contained"
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1, borderRadius: "100px" }}
                    >
                      Back
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
