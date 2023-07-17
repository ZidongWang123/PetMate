import { Box, Avatar, Typography, Button } from "@mui/material";
import React from "react";
import { brightPurple, paleYellow, bGreen } from "../../../../constant/actionTypes";
import { useDispatch } from "react-redux";
import { fetchPersonalInfo } from "../../../../actions/service";
import { fetchPersonalInfoEvent } from "../../../../actions/event";
import { useNavigate } from "react-router-dom";
import { getApplicationsByActivityId, getApplicationsByApplicantId } from "../../../../actions/application";

const ActivityOverview = ({ activityData, activityType }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const formattedStartDate = new Date(activityData.startDate).toLocaleDateString();
  const formattedEndDate = new Date(activityData.endDate).toLocaleDateString();
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [personalInfo, setPersonalInfo] = React.useState(null);
  const [application, setApplication] = React.useState(null);

  React.useEffect(() => {
    getApplicationsByApplicantId(user.result._id).then((item) => {
      setApplication(item.data.data);
    }).catch((err) => {
      console.log(err)
    });

    if (activityType === 'service' && activityData) {
      if (activityData) {
        dispatch(fetchPersonalInfo(activityData.creator)).then((data) => {
          setPersonalInfo(data.data);
        }).catch((error) => {
          console.error("Error fetching personal info:", error);
        });
      }
    }

    if (activityType === 'event' && activityData) {
      if (activityData) {
        dispatch(fetchPersonalInfoEvent(activityData.creator)).then((data) => {
          setPersonalInfo(data.data);
        }).catch((error) => {
          console.error("Error fetching personal info:", error);
        });
      }
    }
  }, [dispatch, activityData, activityType, user.result._id]);

  const [isApplied, setIsApplied] = React.useState(false);
  React.useEffect(() => {
    if (activityData) {
      getApplicationsByActivityId(activityData._id).then((item) => {
        activityData.applicant = item.data.length;
      }).catch((err) => {
        console.log(err)
      })
    }
    if (application && application.length > 0) {
      application.forEach((element) => {
        if (element.activityId === activityData._id) {
          setIsApplied(true)
        }
      });
    }
  }, [activityData, application]);

  const handleChoose = (id) => {
    navigator(`/${activityType}/${id}`);
  };

  return (
    <>
      {user && user.result && personalInfo && personalInfo.result && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.1)",
            margin: "15px 30px 15px 30px",
            fontFamily: "Cosmic Sans MS",
            width: "280px",
            backgroundColor: isApplied ? bGreen : (personalInfo.result._id === user.result._id ? paleYellow : "white"),
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginTop: "15px",
            }}
          >
            {personalInfo &&
              (personalInfo?.result.avatar ? (
                <Avatar
                  src={personalInfo?.result.avatar}
                  sx={{ border: "0.1px solid gray" }}
                />
              ) : (
                <Avatar sx={{ border: "0.1px solid gray" }}>
                  {personalInfo?.result.name.charAt(0)}
                </Avatar>
              ))}
            <Typography
              variant="h6"
              sx={{
                marginLeft: "10px",
              }}
            >
              {personalInfo?.result.name}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              margin: "5px 0px 5px 0px",
              width: "90%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginRight: "1em", fontWeight: 800 }}
              >
                Title:
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {activityData.title}
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginRight: "1em", fontWeight: 800 }}
              >
                City:
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {activityData.city}
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginRight: "1em", fontWeight: 800 }}
              >
                PetSpecies:
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {activityData.petSpecies}
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginRight: "1em", fontWeight: 800 }}
              >
                Type:
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {activityData.type}
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginRight: "1em", fontWeight: 800 }}
              >
                StartDate:
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {formattedStartDate}
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginRight: "1em", fontWeight: 800 }}
              >
                EndDate:
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {formattedEndDate}
              </Typography>
            </div>
            {activityType === 'service' ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ marginRight: "1em", fontWeight: 800 }}
                  >
                    Price(euro/day):
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {activityData.price}
                  </Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ marginRight: "1em", fontWeight: 800 }}
                  >
                    No. of applicants:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {activityData.applicant}
                  </Typography>
                </div>
              </>) : null}

            {activityType === 'event' ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ marginRight: "1em", fontWeight: 800 }}
                  >
                    Current:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {activityData.currentParticipants}
                  </Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ marginRight: "1em", fontWeight: 800 }}
                  >
                    Expected:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {activityData.expectedParticipants}
                  </Typography>
                </div>
              </>) : null}

          </Box>
          {personalInfo.result._id === user.result._id && !isApplied ? (
            <Typography
              variant="h6"
              sx={{
                marginBottom: "15px",
                color: brightPurple,
              }}
            >
              It's your {activityType}!
            </Typography>
          ) : null}

          {personalInfo.result._id !== user.result._id && !isApplied ? (<Button
            sx={{
              width: "70%",
              backgroundColor: brightPurple,
              color: "white",
              borderRadius: "20px",
              marginBottom: "15px",
            }}
            onClick={() => handleChoose(activityData._id)}
          >
            Choose
          </Button>) : null}

          {isApplied && personalInfo.result._id !== user.result._id ? (<Typography
            variant="h6"
            sx={{
              marginBottom: "15px",
              color: brightPurple,
            }}
          >
            You have applied this {activityType}!
          </Typography>) : null}
        </Box>
      )}
    </>
  );
};

export default ActivityOverview;
