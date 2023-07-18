import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./mypostpage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { getPersonalInfo } from "../../../api";
import { getUserArticles } from "../../../api";
import { FormData } from "../../../util/index";
import TableFilter from "../../Widget/TableFilter/TableFilter";

export default function MyPost() {
  const params = useParams();
  const userId =
    params.userId ||
    JSON.parse(window.localStorage.getItem("profile")).result._id;
  const [articleList, setArticleList] = useState([]);

  // to get user info
  const [userInfo, setUserInfo] = useState({});

  const columns = [
    {
      field: "Topics",
      headerName: "Topics",
      width: 400,
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
      field: "Groups",
      headerName: "Groups",
      width: 200,
      renderCell: (params) => (
        <Link to={`/groups/${params.row.g_id}`}>{params.row.Groups}</Link>
      ),
    },
    {
      field: "Date",
      headerName: "Date",
      width: 150,
    },
    {
      field: "Author",
      headerName: "Author",
      width: 200,
    },
    {
      field: "Tags",
      headerName: "Tags",
      width: 150,
      renderCell: (params) => (
        <div>
          {params.row.Tags.map((item) => {
            return <span className="single-tag">#{item}</span>;
          })}
        </div>
      ),
    },
  ];
  const getUserInfo = async (userId) => {
    try {
      const res = await getPersonalInfo(userId);
      if (res.status === 200) {
        setUserInfo(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUserArticlesRequest = async (userId) => {
    try {
      const { data: articleListResulet } = await getUserArticles(userId);

      const articles = articleListResulet.map((item) => {
        return {
          id: item._id,
          g_id: item.g_id._id,
          Topics: item.title,
          Groups: item.g_id.groupName,
          Date: FormData(item.date),
          Author: item.u_id.name,
          Tags: item.tags,
        };
      });
      setArticleList(articles);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // request profil data here and set the variable profil
    getUserInfo(userId);
    getUserArticlesRequest(userId);
  }, []);

  return (
    <div className="myPosts">
      <div className="userPageProfil">
        <Avatar
          src={userInfo.avatar}
          style={{
            width: "140px",
            height: "140px",
            marginBottom: "10px",
            marginTop: "10px",
            marginRight: "10px",
          }}
        ></Avatar>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h3 style={{ marginTop: "5px", marginBottom: "5px" }}>
            {userInfo.name}
          </h3>
          <div style={{ color: "gray", fontSize: "12px" }}>
            location: {userInfo.address}
          </div>
          <div>Introduction:{userInfo.intro}</div>
          <div>Number of Post:{articleList.length}</div>
          <div style={{ marginTop: "5px", marginBottom: "5px" }}>
            {(userInfo.sex === "female" || userInfo.sex === "male") && (
              <FontAwesomeIcon
                icon={
                  userInfo.sex === "male"
                    ? faMars
                    : userInfo.gender === "female"
                    ? faVenus
                    : null
                }
                color={
                  userInfo.sex == "male"
                    ? "blue"
                    : userInfo.gender === "female"
                    ? "pink"
                    : ""
                }
              />
            )}
          </div>
          <div>{}</div>
        </div>
      </div>
      <div>
        <TableFilter data={articleList} columns={columns}></TableFilter>
      </div>
    </div>
  );
}
