import React from "react";
import { Container } from "@mui/material";
import "./Activity.css";
import PrimePrivileges from "./PrimePrivileges/PrimePrivileges";
import CommonSteps from "./CommonSteps/CommonSteps";
import PageHeader from "./PageHeader/PageHeader";
import CreationSteps from "./CommonSteps/CreationSteps";
import ActivityOverview from "./ActivityOverview/ActivityOverview";
import PublishActivity from "./PublishActivity/PublishActivity";
import FeedbackMsg from "../../Widget/FeedbackMsg/FeedbackMsg";
import { useDispatch } from "react-redux";
import { createService } from "../../../actions/service";
import { useLocation } from "react-router-dom";
import Pagination from "../../Widget/Pagination/Pagination";
import { useSelector } from "react-redux";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Activity = ({ activity, commonSteps, creationSteps }) => {
  const query = useQuery();
  const page = query.get("page") || 1;

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

  const { services } = useSelector((state) => state.service);
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

  const selectActivity = () => {
    setShowPrimePrivileges(false);

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
    console.log(allInputs);
  };

  const onFinishCreationStep = (creationInputs) => {
    setShowCreationStepper(false);
    setAllInputs((prevInputs) => [...prevInputs, ...creationInputs]);

    setShowPublishActivity(true);

    console.log(allInputs);
  };

  const publishAndGoBack = (value) => {
    if (activity === "service") {
      dispatch(createService(value));
    }

    if (activity === "event") {
      //dispatch(createEvent(value));
    }

    setShowFeedbackMsg(true);
    //todo: async func to publish activity or not
    setShowPublishActivity(false);
    setShowActivityOverview(true);
    setShowSearchBar(true);
    setShowPagination(true);
  };
  const handleSortingChange = (sortingValue) => {
    // 处理传递过来的 sortingValue
    console.log("Sorting value:", sortingValue);
    setSorting(sortingValue);
  };
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
      />
      <CreationSteps
        steps={creationSteps}
        showStepper={showCreationStepper && finishCommonStep}
        onFinishCreationStep={onFinishCreationStep}
      />

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
            <ActivityOverview key={service._id} activityData={service} />
          ))}
        </div>
      ) : null}

      {showPagination ? (
        <Pagination page={page} path={"service"} sorting={sorting} />
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
