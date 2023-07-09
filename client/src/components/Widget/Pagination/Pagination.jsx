import React from "react";
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getServices } from "../../../actions/service";

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.service);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (page) dispatch(getServices(page));
    }, [dispatch, page]);


    return (
        <Pagination 
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/service?page=${item.page}`}/>
            )}
                
        />
    );
};

export default Paginate;