import React from "react";
import { Container, Typography } from "@mui/material";
import "./Activity.css";
import PrimePrivileges from "./PrimePrivileges/PrimePrivileges";
import CommonSteps from "./CommonSteps/CommonSteps";
import PageHeader from "./PageHeader/PageHeader";
import CreationSteps from "./CommonSteps/CreationSteps";
import ActivityOverview from "./ActivityOverview/ActivityOverview";
import PublishActivity from "./PublishActivity/PublishActivity";
import FeedbackMsg from "../../Widget/FeedbackMsg/FeedbackMsg";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Pagination from "../../Widget/Pagination/Pagination";
import { useSelector } from "react-redux";

import { createService, getServicesBySearch } from "../../../actions/service";
import { createEvent, getEventsBySearch } from "../../../actions/event"

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Activity = ({ activity, commonSteps, creationSteps }) => {
  const query = useQuery();

  const servicePage = query.get("servicePage") || 1;
  const eventPage = query.get("eventPage") || 1;

  const user = JSON.parse(localStorage.getItem("profile"));
  const [showSearchBar, setShowSearchBar] = React.useState(true);

  const [showCommonStepper, setShowCommonStepper] = React.useState(false);
  const [finishCommonStep, setFinishCommonStep] = React.useState(false);
  const [showCreationStepper, setShowCreationStepper] = React.useState(false);
  const [showPrimePrivileges, setShowPrimePrivileges] = React.useState(false);

  const [showActivityOverview, setShowActivityOverview] = React.useState(true);

  const [showPublishActivity, setShowPublishActivity] = React.useState(false);

  const [finishAfterCommonStep, setFinishAfterCommonStep] =
    React.useState(false);

  const [allInputs, setAllInputs] = React.useState([]);
  const [sorting, setSorting] = React.useState("");

  const [showFeedbackMsg, setShowFeedbackMsg] = React.useState(false);

  const [showPagination, setShowPagination] = React.useState(true);

  const dispatch = useDispatch();

  /* 
  React.useEffect(() => {
    console.log(allInputs);
  }, [allInputs]); */
  /*   React.useEffect(() => {
    dispatch(getServices());
  }, [dispatch]); */

  const handelfeebackMsgClose = () => {
    setShowFeedbackMsg(false);
  };

  const [isSelect, setIsSelect] = React.useState(false);
  const selectActivity = () => {
    setShowPrimePrivileges(false);

    setIsSelect(true);
    setShowCommonStepper(true);
    setShowCreationStepper(false);

    setFinishAfterCommonStep(true);
  };

  const createActivity = () => {
    setShowPrimePrivileges(false);

    setShowCommonStepper(true);
    setShowCreationStepper(true);

    setFinishAfterCommonStep(false);
  };

  const showMore = () => {
    setShowSearchBar(false);
    if (user && user.result.isPrime) {
      setShowPrimePrivileges(true);
    } else {
      setShowCommonStepper(true);
    }

    setShowActivityOverview(false);
    setShowPagination(false);
  };

  const onFinishCommonStep = (stepInputs) => {
    setAllInputs([]);
    setShowCommonStepper(false);
    if (user?.result.isPrime && !finishAfterCommonStep) {
      setFinishCommonStep(true);
    } else {
      setShowActivityOverview(true);
      setShowSearchBar(true);
    }

    setAllInputs(stepInputs);
  };

  React.useEffect(() => {
    if (isSelect) {
      setShowPagination(false)
    } else {
      setShowPagination(true)
    }

    if (isSelect && allInputs.length > 0) {
      if (activity === "service") {
        dispatch(getServicesBySearch(allInputs));
      }

      if (activity === "event") {
        dispatch(getEventsBySearch(allInputs));
      }
    }
  }, [dispatch, allInputs, isSelect, activity]);

  const onFinishCreationStep = (creationInputs) => {
    setShowCreationStepper(false);
    setAllInputs((prevInputs) => [...prevInputs, ...creationInputs]);

    setShowPublishActivity(true);
  };

  const publishAndGoBack = (value) => {
    if (activity === "service") {
      dispatch(createService(value));
    }

    if (activity === "event") {
      dispatch(createEvent(value));
    }

    setShowFeedbackMsg(true);
    //todo: async func to publish activity or not
    setShowPublishActivity(false);
    setShowActivityOverview(true);
    setShowSearchBar(true);
    setShowPagination(true);
  };

  const handleSortingChange = (sortingValue) => {
    setSorting(sortingValue);
  };

  const { services } = useSelector((state) => state.service);
  const { events } = useSelector((state) => state.event);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PageHeader
        showSearchBar={showSearchBar}
        onContinue={showMore}
        activity={activity}
        onSortingChange={handleSortingChange}
      />

      {/* if user is prime, show prime privileges, else show common steps */}
      {showPrimePrivileges ? (
        <PrimePrivileges
          showPrimePrivileges={showPrimePrivileges}
          activity={activity}
          select={selectActivity}
          create={createActivity}
        />
      ) : null}

      {/* if user want to select an activity, show common steps otherwise show creation steps after common steps */}
      <CommonSteps
        steps={commonSteps}
        showStepper={showCommonStepper}
        onFinishCommonStep={onFinishCommonStep}
        isSelect={isSelect}
      />
      <CreationSteps
        steps={creationSteps}
        showStepper={showCreationStepper && finishCommonStep}
        onFinishCreationStep={onFinishCreationStep}
      />
      {!user && (<Typography variant="h6">Please login first to find more {activity}</Typography>)}

      {showPublishActivity ? (
        <PublishActivity
          activity={activity}
          allInputs={allInputs}
          publishAndGoBack={publishAndGoBack}
          isEdit={false}
        />
      ) : null}
      {activity === "service" && showActivityOverview && services ? (
        <div className="activities-grid">
          {services.map((service) => (
            <ActivityOverview key={service._id} activityData={service} activityType={activity} />
          ))}
        </div>
      ) : null}

      {activity === "service" && showActivityOverview && isSelect && services.length === 0 ? (
        <Typography variant="h6"> NO searched {activity} found</Typography>
      ) : null}

      {activity === "event" && showActivityOverview && events ? (
        <div className="activities-grid">
          {events.map((event) => (
            <ActivityOverview key={event._id} activityData={event} activityType={activity} />
          ))}
        </div>
      ) : null}

      {activity === "event" && showActivityOverview && isSelect && events.length === 0 ? (
        <Typography variant="h6"> NO searched {activity} found</Typography>
      ) : null}

      {user && showPagination && activity === 'service' ? (
        <Pagination page={servicePage} path={"service"} sorting={sorting} />
      ) : null}

      {user && showPagination && activity === 'event' ? (
        <Pagination page={eventPage} path={"event"} sorting={sorting} />
      ) : null}

      <FeedbackMsg
        status={showFeedbackMsg}
        message="Sucessful published"
        severity="success"
        onClose={handelfeebackMsgClose}
      />
    </Container>
  );
};

export default Activity;
