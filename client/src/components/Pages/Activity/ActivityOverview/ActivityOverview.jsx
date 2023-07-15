import { Box, Avatar, Typography, Button } from "@mui/material";
import React from "react";
import { brightPurple } from "../../../../constant/actionTypes";
import { useDispatch } from "react-redux";
import { fetchPersonalInfo } from "../../../../actions/service";
import { useNavigate } from "react-router-dom";
import { getApplicationsByActivityId } from "../../../../actions/application";

const ActivityOverview = ({ activityData, activityType }) => {
  const formattedStartDate = new Date(
    activityData.startDate
  ).toLocaleDateString();
  const formattedEndDate = new Date(activityData.endDate).toLocaleDateString();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [personalInfo, setPersonalInfo] = React.useState(null);

  React.useEffect(() => {
    //if (activityType === 'service') {
      if (activityData) {
        dispatch(fetchPersonalInfo(activityData.creator)).then((data) => {
          setPersonalInfo(data.data);
        });
      }
    //}
  }, [dispatch, activityData]);

  //const [matchCount, setMatchCount] = React.useState(0);
  React.useEffect(() => {
    if (activityData) {
      getApplicationsByActivityId(activityData._id).then((item) => {
        //在event的时候可以筛选出status为approved
        activityData.applicant = item.data.length;
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [activityData]);

  const handleChoose = (id) => {
    console.log(activityType)
    navigator(`/${activityType}/${id}`);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.1)",
          margin: "15px 30px 15px 30px",
          fontFamily: "Cosmic Sans MS",
          width: "280px",
          backgroundColor: "white",
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
            (personalInfo.result.avatar ? (
              <Avatar
                src={personalInfo.result.avatar}
                sx={{ border: "0.1px solid gray" }}
              />
            ) : (
              <Avatar sx={{ border: "0.1px solid gray" }}>
                {personalInfo.result.name.charAt(0)}
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
          </>): null}

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
          </>): null}

        </Box>
        <Button
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
        </Button>
      </Box>
    </>
  );
};

export default ActivityOverview;
