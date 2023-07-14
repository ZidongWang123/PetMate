import React from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getServices, getServicesBySorting } from "../../../actions/service";

const Paginate = ({ page, userId = null, path, sorting }) => {
  const { numberOfPagesCreatedServices } = useSelector(
    (state) => state.createdService
  );
  const { numberOfPages } = useSelector((state) => state.service);

  const count = userId ? numberOfPagesCreatedServices : numberOfPages;

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (page && userId === null && sorting) {
      console.log("from Pagination", sorting);

      dispatch(getServicesBySorting(page, sorting));
      console.log("dispatch successfully", sorting);
    } else if ((page && userId === null) || sorting === null) {
      dispatch(getServices(page)); //get all services
    } else if (page && userId) {
      dispatch(getServices(page, userId)); //get created services by user
    }
  }, [dispatch, page, userId, sorting]);

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
          to={`/${path}?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
