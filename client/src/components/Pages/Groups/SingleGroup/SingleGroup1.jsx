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
import { getGroupsArticles, getGroupInfo } from "../../../../api/user";
import { FormData } from "../../../../util/index";
import TableFilter from "../../../Widget/TableFilter/TableFilter";

export const orange = "#F0A860";

// TODO
/* const GroupDetails = ({ group, id }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  if (!user) {
    return <SignInWarning />;
  }

  return <SingleGroupDetail />;
}; */
const SingleGroup1 = () => {
  const [articles, setArticles] = useState([]);
  const [group, setGroup] = useState([]);
  let params = useParams();
  console.log(params, "params");
  const groupId = params["id"];

  const columns = [
    {
      field: "Topics",
      headerName: "Topics",
      width: 400,
      renderCell: (params) => (
        <Link to={`/groups/post/${params.row.id}`}>{params.row.Topics}</Link>
      ),
    },
    {
      field: "Date",
      headerName: "Date",
      width: 400,
    },
    {
      field: "Author",
      headerName: "Author",
      width: 400,
    },
  ];
  //请求群组下面所有的文章
  const getGroupsArticlesRequest = async () => {
    const articlesResulet = await getGroupsArticles(groupId);
    console.log(articlesResulet, "articlesResulet");
    const articles = articlesResulet.length
      ? articlesResulet.map((item) => {
          return {
            id: item._id,
            Topics: item.title,
            Date: FormData(item.date),
            Author: item.u_id.name,
          };
        })
      : [];
    setArticles(articles);
  };
  //请求群组信息
  const getGroupInfoRequest = async () => {
    const groupResulet = await getGroupInfo(groupId);
    console.log(groupResulet, "groupResulet");
    setGroup(groupResulet);
  };
  useEffect(() => {
    getGroupsArticlesRequest();
    getGroupInfoRequest();
  }, []);

  return (
    <div>
      <SearchBar />
      <SingleGroupDetail />
      {/* {articles.length!=0&&<Forum articles={articles}/>} */}
      {/* {articles.length!=0&&<BasicTable data={articles} columns={columns}></BasicTable>} */}
      {articles.length != 0 && (
        <TableFilter columns={columns} data={articles}></TableFilter>
      )}
    </div>
  );
};

export default SingleGroup1;
