import React, { useEffect, useState } from "react";
import "./Single.css";
import SearchBar from "../../../Widget/SearchBar/SearchBar";
import SingleGroupDetail from "./SingleGroupDetail.jsx";
import { Link, useParams } from "react-router-dom";
import { getGroupsArticles, fetchArticlesBySearch } from "../../../../api";
import { FormData } from "../../../../util/index";
import TableFilter from "../../../Widget/TableFilter/TableFilter";
import { useNavigate, useLocation } from "react-router-dom";

export const orange = "#F0A860";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const SingleGroup1 = () => {
  const query = useQuery();
  const searchQuery = query.get("keyword");
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  let params = useParams();
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
          to={`/myarticles/${params.row.u_id}`}
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
            return (
              <span
                className="single-tag"
                onClick={() => searchPost(item)}
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => (e.target.style.fontWeight = "bold")}
                onMouseLeave={(e) => (e.target.style.fontWeight = "normal")}
              >
                #{item}
              </span>
            );
          })}
        </div>
      ),
    },
  ];
  //请求群组下面所有的文章
  const getGroupsArticlesRequest = async () => {
    const { data: articlesResulet } = await getGroupsArticles(groupId);
    const articles = articlesResulet.length
      ? articlesResulet.map((item) => {
          return {
            id: item._id,
            Topics: item.title,
            Date: FormData(item.date),
            Author: item.u_id.name,
            u_id: item.u_id._id,
            Tags: item.tags,
          };
        })
      : [];
    setArticles(articles);
  };

  const topicsArray = articles && articles.map((article) => article.Topics);

  useEffect(() => {
    if (searchQuery) {
      searchPost(searchQuery);
    } else {
      getGroupsArticlesRequest();
    }
  }, []);
  const searchArticles = async (value) => {
    const queryParams = new URLSearchParams();
    queryParams.append("keyword", value);
    const { data: articlesResults } = await fetchArticlesBySearch(
      groupId,
      value
    );
    const searchArticles = articlesResults.length
      ? articlesResults.map((item) => {
          return {
            id: item._id,
            Topics: item.title,
            Date: FormData(item.date),
            Author: item.u_id.name,
            u_id: item.u_id._id,
            Tags: item.tags,
          };
        })
      : [];
    setArticles(searchArticles);
    const path = `/groups/${groupId} `;
    const url = `${path}?${queryParams.toString()}`;
    navigate(url);
  };
  const searchPost = (value) => {
    if (value) {
      searchArticles(value);
    } else {
      getGroupsArticlesRequest();

      navigate(`/groups/${groupId} `);
    }
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
