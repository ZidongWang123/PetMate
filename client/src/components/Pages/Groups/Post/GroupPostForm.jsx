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
import {  useNavigate, useSearchParams,useParams } from "react-router-dom";
import { poArticlesInfo } from "../../../../api"
import PetsIcon from "@mui/icons-material/Pets";
import "./GroupPostForm.css"

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

/* import { useHistory } from "react-router-dom/cjs/react-router-dom.min"; */

import { darkPurple, orange } from "../../../../constant/actionTypes";
import InputBar from "../../../Widget/InputBar/InputBar";
import InputTextArea from "../../../Widget/InputBar/InputTextArea";
import InputTagBar from "../../../Widget/InputBar/InputTagBar";

/* import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { Grid } from "@mui/material";
 */
const steps = [
  {
    label: "Title",
  },
  {
    label: "Tags",
  },
  {
    label: "Article",
  },
  {
    label: "Pic",
  },
];

const GroupPostForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
 
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
  };

  //groupintro
  const [intro, setIntro] = React.useState("");

  const handleIntroChange = (value) => {
    setIntro(value);
  };

  const handleEmojiClick = (emoji) => {
    setIntro((prevValue) => `${prevValue}${emoji}`);
  };

  //avatar

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  let params = useParams()
  const groupId = params['id'];
  const navigate= useNavigate()
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
  const poArticlesInfoRequest= async(article)=>{
    try {
      await poArticlesInfo(article)
    } catch (error) {
      
    }
  }
  const handleComplete = async () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    
    setCompleted(newCompleted);
    handleNext();
    if(allStepsCompleted()===true){
     
      const article={
        "title":name,
        "content":intro,
        "tags":tag,
        "imageURL":previewImage,
        "creater":"Sarah",
        "g_id":groupId
      }
      poArticlesInfoRequest(article)
      setTimeout(()=>{
        navigate(`/groups/${groupId}`)
      },1000)
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const onBack=()=>{
    navigate(`/groups/${groupId}`)
  }
  return (
    <div style={{position:"relative"}}>
       <div className="button-wrapper-group" >
            <button
              className="Back-button"
              onClick={() => onBack()}
            >
              Back
            </button>
          </div>
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
        Create your post here!
      </div>
      <div
        className="title"
        style={{
          fontSize: "15px",

          textAlign: "center",
          margin: "70px 0",
          fontFamily: "Comic Sans MS",
          /* fontWeight: "bold", */
          color: "#666666",
        }}
      >
        <p>Raising experience? </p>
        <p>Stories with your pet?</p>
        <p>you can post</p>
        <p style={{ fontWeight: "bold" }}> EVERYTHING </p>
        you would like to share..
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

                    fontSize: "25px",
                    color: darkPurple,
                  }}
                  onClick={handleStep(index)}
                >
                  <PetsIcon sx={{ color: darkPurple, marginRight: 1 }} />
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
                    onTagsChange={handleTagsChange}
                    where="articles"

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
                          alt="Preview"
                          style={{ maxWidth: "150px", maxHeight: "150px" }}
                        />
                      </div>
                    )}
                  </div>
                )}

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
                      /* color="secondary" */
                      onClick={handleBack}
                      sx={{
                        mt: 1,
                        mr: 1,
                        borderRadius: "100px",
                        backgroundColor: "#009999",

                        color: "white",
                      }}
                      disabled={index === 0}
                    >
                      {"Back"}
                    </Button>

                    <Button
                      /* disabled={index === 0} */
                      variant="contained"
                      onClick={handleReset}
                      sx={{
                        mt: 1,
                        mr: 1,
                        borderRadius: "100px",
                        backgroundColor: "#67AB9F",
                        color: "white",
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

export default GroupPostForm;
