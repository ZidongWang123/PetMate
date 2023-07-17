import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { brightPurple, orange, darkGray } from "../../../constant/actionTypes";
import {
  fetchPersonalInfo,
  updateApplication,
} from "../../../actions/application.js";
import { PENDING, APPROVED, REJECT } from "../../../constant/actionTypes.js";
import FeedbackMsg from "../../Widget/FeedbackMsg/FeedbackMsg";
import {
  sendEmail,
  fetchService,
  fetchEvent,
  sendEmailEvent,
} from "../../../api/index";
import { incrementParticipants } from "../../../actions/event.js";

const Application = ({ application, isEvent }) => {
  const [applicant, setApplicant] = React.useState(null);
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetchPersonalInfo(application.applicantId)
      .then((item) => {
        if (applicant === null && item.data) {
          setApplicant(item.data.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    if(isEvent){
        fetchEventRequest();

    }else{
        fetchServiceRequest();

    }
  }, [application, applicant]);

  const [showFeedbackMsg, setShowFeedbackMsg] = React.useState(false);
  const fetchServiceRequest = async () => {
    const { data } = await fetchService(application.activityId);
    setData(data);
  };
  const fetchEventRequest = async () => {
    const { data } = await fetchEvent(application.activityId);
    setData(data);
  };
  const handelfeebackMsgClose = () => {
    setShowFeedbackMsg(false);
  };

  let item;
  const handleApprove = async () => {
    if (isEvent) {
      incrementParticipants(application.activityId);
      sendEmailEvent({
        email: applicant.email,
        title: `The Event "${data.title}" is Approved.`,
        content: `Dear ${applicant.name}， 
    you applied Event "${data.title}" is now approved. The Event is taking place on ${data.startDate}, in ${data.location} with the content ${data.content}. It will cost ${data.price} Euro.`,
      });
    }
    else {sendEmail({
      email: applicant.email,
      title: `The Service "${data.title}" is Approved.`,
      content: `Dear ${applicant.name}， 
    you applied service "${data.title}" is now approved. The Service is on ${data.startDate}, in ${data.location} with the content ${data.content}. It will cost ${data.price} Euro.`,
    });}

    application.status = APPROVED;
    if (application) {
      item = await updateApplication(application._id, application);
    }
    setShowFeedbackMsg(true);
  };

  const handleReject = async () => {
    application.status = REJECT;
    if (application) {
      item = await updateApplication(application._id, application);
      if (isEvent) {
        sendEmailEvent({
          email: applicant.email,
          title: `The Event "${data.title}" is Rejected.`,
          content: `Dear ${applicant.name}， 
        you applied Event "${data.title}" is rejected. The Event you applied is on ${data.startDate}, in ${data.location} with the content ${data.content}. We hope we could meet each other next time!`,
        });
      } else {
        sendEmail({
          email: applicant.email,
          title: ` The Service "${data.title}" is Rejected. `,
          content: ` Dear ${applicant.name}， 
        Sorry, you applied service "${data.title}" is rejected. The Service you applied is on ${data.startDate}, in ${data.location} with the content ${data.content}. We hope we could meet each other next time!`,
        });
      }
    }
    setShowFeedbackMsg(true);
  };

  if (applicant) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: "15px 30px 15px 30px",
          fontFamily: "Cosmic Sans MS",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "center",
            width: "15%",
          }}
        >
          {applicant.avatar ? (
            <Avatar
              src={applicant.avatar}
              sx={{
                border: "0.1px solid gray",
                width: "80px",
                height: "80px",

                "@media (max-width: 900px)": {
                  width: "60px",
                  height: "60px",
                },

                "@media (max-width: 600px)": {
                  width: "40px",
                  height: "40px",
                },
              }}
            />
          ) : (
            <Avatar
              sx={{
                border: "0.1px solid gray",
                width: "80px",
                height: "80px",

                "@media (max-width: 900px)": {
                  width: "60px",
                  height: "60px",
                },

                "@media (max-width: 600px)": {
                  width: "40px",
                  height: "40px",
                },
              }}
            >
              {applicant.name.charAt(0)}
            </Avatar>
          )}
          <Typography variant="h6">{applicant.name}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            margin: "5px 5px 5px 5px",
            width: "65%",
            border: "1px solid black",
            padding: "10px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              height: "10%",
              alignSelf: "center",
              color: darkGray,
              fontWeight: "800",
            }}
          >
            SelfInfo
          </Typography>
          <Typography
            variant="h6"
            sx={{
              wordWrap: "break-word",
              maxWidth: "100%",
              flexGrow: 1,
              color: "gray",
            }}
          >
            {application.introduction}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "0px 20px 0px 20px",
            justifyContent: "space-between",
            boxSizing: "border-box",
            width: "15%",
            height: "100%",
            alignItems: "center",
          }}
        >
          {application.status === PENDING ? (
            <>
              <Button
                sx={{
                  width: "100%",
                  backgroundColor: orange,
                  color: "white",
                  borderRadius: "20px",
                  margin: "10px 0px 10px 0px",
                }}
                onClick={handleApprove}
              >
                Approve
              </Button>
              <Button
                sx={{
                  width: "100%",
                  backgroundColor: brightPurple,
                  color: "white",
                  borderRadius: "20px",
                  margin: "10px 0px 10px 0px",
                }}
                onClick={handleReject}
              >
                Reject
              </Button>
            </>
          ) : (
            <Typography
              variant="h6"
              sx={{
                wordWrap: "break-word",
                maxWidth: "100%",
                flexGrow: 1,
                color: application.status === APPROVED ? "green" : "red",
              }}
            >
              {application.status.charAt(0).toUpperCase() +
                application.status.slice(1)}
              !
            </Typography>
          )}
        </Box>

        <FeedbackMsg
          status={showFeedbackMsg}
          message="Successfully updated"
          severity="success"
          onClose={handelfeebackMsgClose}
        />
      </Box>
    );
  }
};

export default Application;
