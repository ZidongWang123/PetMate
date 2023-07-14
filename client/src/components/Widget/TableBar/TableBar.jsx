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
  const TableContent = data.map((row) => {

    return <TableRow
      key={row.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
    {columns.map(column => {
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