import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import { Fragment } from "react";

import {
  darkPurple,
  brightOrange,
  darkGray,
} from "../../../../constant/actionTypes";
import InputBar from "../../../Widget/InputBar/InputBar";
import InputTextArea from "../../../Widget/InputBar/InputTextArea";
import InputTagBar from "../../../Widget/InputBar/InputTagBar";

import InputAvatar from "../../../Widget/InputBar/InputAvatar";

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

const GroupForm = ({ groupData, setGroupData, handleSubmit }) => {
  //groupname

  const handleNameChange = (value) => {
    setGroupData({ ...groupData, groupName: value });
  };

  //tags

  const handleTagsChange = (tags) => {
    setGroupData({ ...groupData, tags: tags });
  };

  //groupintro

  const handleIntroChange = (value) => {
    setGroupData({ ...groupData, intro: value });
  };

  const handleEmojiClick = (emoji) => {
    setGroupData((prevData) => ({
      ...prevData,
      intro: prevData.intro + emoji,
    }));
  };

  //avatar

  const onImageUpdate = (value) => {
    setGroupData({ ...groupData, selectedFile: value });
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

  const handleCreate = async (e) => {
    e.preventDefault(); // normally for refreshing the page
    handleSubmit();
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
                      tags={groupData.tags}
                      onTagsChange={handleTagsChange}
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
                    <div>
                      <InputAvatar
                        attribute={groupData.selectedFile}
                        onConfirmChange={onImageUpdate}
                      />
                    </div>
                  )}

                  <Box sx={{ mb: 2, marginTop: 2 }}>
                    <div sx={{}}>
                      <Button
                        color="success"
                        onClick={
                          completedSteps() === totalSteps() - 1
                            ? handleCreate
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
                        onClick={handleBack}
                        sx={{
                          mt: 1,
                          mr: 1,
                          borderRadius: "100px",

                          fontWeight: "bold",
                          color: darkGray,
                        }}
                        disabled={index === 0}
                      >
                        {"Back"}
                      </Button>

                      <Button
                        onClick={handleReset}
                        sx={{
                          mt: 1,
                          mr: 1,
                          borderRadius: "100px",

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
