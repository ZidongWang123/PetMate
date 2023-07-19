import React from 'react';
import Button from "@mui/material/Button";


export default function UniformButton({width,backgroundColor,fontColor,onClick,children}){

    return(
           <Button  
          variant="contained"
          onClick={onClick}
          sx={{
            height:"50px",
            width:{width},
            marginLeft: 2,
            marginBottom:"5px",
            fontFamily:'Gloria Hallelujah',
            borderRadius: "50px",
            color: fontColor,
            backgroundColor: backgroundColor,
    
            ":hover": {
              backgroundColor: backgroundColor,
              filter:"brightness(0.95)"
            },
          }} >{children}</Button>
    )
}