import React, { useEffect, useState } from "react";
import "./Single.css"; // 引入自定义的CSS样式文件
//import SearchBar from "../../../Widget/searchBar";
//import SearchBar from "../../Widget/searchBar/searchBar";
import SearchBar from "../../../Widget/SearchBar/SearchBar";
import SingleGroupDetail from "./SingleGroupDetail.jsx";

/* import Avatar from "@mui/material/Avatar";
import BasicTable from "../../../Widget/TableBar/TableBar"; */
//import { darkPurple, brightGreen, brightPurple, orange } from '../../../constant/actionTypes';
import { Link, useParams } from "react-router-dom";
import { getGroupsArticles, fetchArticlesBySearch } from "../../../../api/user";
import { FormData } from "../../../../util/index";
import TableFilter from "../../../Widget/TableFilter/TableFilter";

export const orange = "#F0A860";

const SingleGroup1 = () => {
  const [articles, setArticles] = useState([]);
  let params = useParams();
  console.log(params, "params");
  const groupId = params["id"];

  const columns = [
    {
      field: "Topics",
      headerName: "Topics",
      flex: 1,
      renderCell: (params) => (
        <Link
          to={`/groups/post/${params.row.id}`}
          style={{ textDecoration: "none" }}
        >
          {params.row.Topics}
        </Link>
      ),
    },
    {
      field: "Date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "Author",
      headerName: "Author",
      flex: 1,
      renderCell: (params) => (
        <Link
          to={`/myposts/${params.row.u_id}`}
          style={{ textDecoration: "none" }}
        >
          {params.row.Author}
        </Link>
      ),
    },
    {
      field: "Tags",
      headerName: "Tags",
      width: 300,
      renderCell: (params) => (
        <div>
          {params.row.Tags.map((item) => {
            return <span className="single-tag">#{item}</span>;
          })}
        </div>
      ),
    },
  ];
  //请求群组下面所有的文章
  const getGroupsArticlesRequest = async () => {
    const articlesResulet = await getGroupsArticles(groupId);
    /* console.log(articlesResulet, "articlesResulet"); */
    setArticles(
      articlesResulet &&
        articlesResulet.map((item) => {
          return {
            id: item._id,
            Topics: item.title,
            Date: FormData(item.date),
            Author: item.u_id.name,
            u_id: item.u_id._id,
            Tags: item.tags,
          };
        })
    );
  };
  const topicsArray = articles.map((article) => article.Topics);

  useEffect(() => {
    getGroupsArticlesRequest();
  }, []);

  const searchArticles = async (value) => {
    console.log("searchvalue", value);
    const articlesResulet = await fetchArticlesBySearch(groupId, value);
    console.log("articlesbysearch", articlesResulet);

    setArticles(
      articlesResulet &&
        articlesResulet.map((item) => {
          return {
            id: item._id,
            Topics: item.title,
            Date: FormData(item.date),
            Author: item.u_id.name,
            u_id: item.u_id._id,
            Tags: item.tags,
          };
        })
    );
  };
  const searchPost = async (value) => {
    console.log("from parent components", value);
    /*  await searchArticles(value); */
    if (value) {
      searchArticles(value);
    } else {
      getGroupsArticlesRequest();
    }
    /*  getArticlesBySearch(groupId,value); */
  };
  return (
    <div>
      <SearchBar results={topicsArray} searchPost={searchPost} />

      <SingleGroupDetail />

      <TableFilter columns={columns} data={articles}></TableFilter>
    </div>
  );
};

export default SingleGroup1;
