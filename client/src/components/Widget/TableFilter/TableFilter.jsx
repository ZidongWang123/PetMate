import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import "./TableFilter.css"
export function CustomNoRowsOverlay(){

  return (
    <Box style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>No Post</Box>
  );
}


export default function TableFilter({columns,data}) {
  return (
    <Box sx={{ height: 400, width: '100%',paddingTop:2,fontFamily:"Comic Sans MS" }}>
      <DataGrid
      style={{fontFamily:"Comic Sans MS"}}
        rows={data}
        columns={columns}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}

        disableRowSelectionOnClick
      />
    </Box>
  );
}