import React from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getServices, getServicesBySorting } from "../../../actions/service";
import { getEvents, getEventsBySorting } from "../../../actions/event";

const Paginate = ({ page, path, sorting }) => {

  const { numberOfPages } = useSelector((state) => state.service);

  const { numberOfPagesEvent } = useSelector((state) => state.event);

  const count = path === "service" ? numberOfPages : numberOfPagesEvent;

  const dispatch = useDispatch();

  React.useEffect(() => {
    if(path === "service"){
      if (page && sorting) {
        dispatch(getServicesBySorting(page, sorting));
      } else if (page || sorting === null) {
        dispatch(getServices(page)); //get all services
      } 
    }else if (path === "event"){
      if (page && sorting) {
        dispatch(getEventsBySorting(page, sorting));
      } else if (page || sorting === null) {
        dispatch(getEvents(page)); //get all services
      } 
    }
  }, [dispatch, page, sorting, path]);

  return (
    <Pagination
      count={count}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/${path}?${path}Page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
