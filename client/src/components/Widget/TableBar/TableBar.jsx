/*
 * @Author: xiehuan 1208044257@qq.com
 * @Date: 2023-07-09 13:44:19
 * @LastEditors: xiehuan 1208044257@qq.com
 * @LastEditTime: 2023-07-09 20:39:00
 * @FilePath: \prototype\client\src\components\Widget\TableBar\TableBar.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';

import { Link } from "react-router-dom";

import { TableRow, TableHead, Paper, TableContainer, TableCell, TableBody, Table, styles } from "@mui/material";
import { makeStyles } from '@mui/material/styles';
// const useStyles = makeStyles({
//   table: {
//     width: '100%'
//   },
//   column: {
//     width: '20%' // 每列宽度为 20%
//   }
// });

const rows = []
export default function BasicTable({ data, columns }) {
  // const classes = useStyles();
  console.log(data);
  const TableContent = data.map((row) => {

    return <TableRow
      key={row.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
    {columns.map(column => {
        console.log(column);
       if(column=="Topics"){
        return <TableCell key={column}><Link to={`/groups/post/${row.id}`}>{row[column]}</Link></TableCell>
      }else if(column=="Groups"){
        return <TableCell key={column}><Link to={`/groups/${row.g_id}`}>{row[column]}</Link></TableCell>
      }else{
        return <TableCell key={column}>{row[column]}</TableCell>
      }
      })}
    </TableRow>

  })



  return (
    <TableContainer component={Paper}>
      <Table defaultColumnWidth={120} sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(item => {
              return <TableCell>{item}</TableCell>
            })}
            {/* Topics
            <TableCell align="left">Date</TableCell>
            <TableCell align="right">Author</TableCell> */}

          </TableRow>
        </TableHead>
        <TableBody>
          {TableContent}
          {/* {articles.map((row) => (

            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >

              row[column]==0? <TableCell key={column}><Link to={`/groups/post?id=${row.id}`}>{row[column]}</Link></TableCell>:
              <TableCell key={column}>{row[column]}</TableCell>

              {/* <TableCell align="left" >
              <Link to={`/groups/post?id=${row.id}`}>{row["Topics"]}</Link>
                
              </TableCell>
              <TableCell align="left">{row["Date"]}</TableCell>
              <TableCell align="right">{row["Author"]}</TableCell> 

            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  )
}