import React, { useState, useEffect, useRef } from "react";
import { Avatar, Button, Box, Slider } from "@mui/material";
import AvatarEditor from "react-avatar-editor";
import { Modal } from "@mui/material";
import {
  orange,
  darkPurple,
  brightOrange,
  darkGray,
} from "../../../constant/actionTypes";
import UniformButton from "../../Pages/Explore/widget/UniformButton";

import { modifyPersonalInfo } from "../../../api";

export default function InputAvatar({
  attribute,
  onConfirmChange /* ,
  userId,
  title,
  , */,
}) {
  const [openModal, setOpenModal] = useState(false);

  const [zoom, setZoom] = useState(1);
  const [preview, setPreview] = useState(null);
  var avatarEditorRef = useRef(null);

  const handleSlider = (event, value) => {
    setZoom(value);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const setEditorRef = (ed) => {
    avatarEditorRef = ed;
  };

  const handleSave = async (e) => {
    if (avatarEditorRef) {
      const canvasScaled = avatarEditorRef.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();

      try {
        onConfirmChange(croppedImg);
        setPreview(null);
        setZoom(1);
        setOpenModal(false);
      } catch (error) {
        console.log("not work");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      e.target.value = "";
      setOpenModal(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Avatar src={attribute} style={{ width: "75px", height: "75px" }} />
        <Modal
          slotProps={{
            backdrop: {
              sx: {
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                // display:"flex"
              },
            },
            root: {
              sx: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            },
          }}
          open={openModal}
        >
          <Box style={{ outline: "none" }}>
            <AvatarEditor
              borderRadius={150}
              ref={setEditorRef}
              image={preview}
              width={180}
              height={180}
              border={50}
              color={[0, 0, 0, 0.7]} // RGBA
              rotate={0}
              scale={zoom}
            />
            <Slider
              sx={{
                display: "block",
                margin: "0 auto",
                width: "80%",
                color: darkPurple,
              }}
              aria-label="raceSlider"
              value={zoom}
              min={1}
              max={10}
              step={0.1}
              size="medium"
              onChange={handleSlider}
            ></Slider>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <UniformButton
                width="100px"
                backgroundColor="gray"
                fontColor="white"
                onClick={handleCancel}
              >
                Cancel
              </UniformButton>
              <UniformButton
                width="100px"
                backgroundColor="orange"
                fontColor="white"
                onClick={handleSave}
              >
                save
              </UniformButton>
            </Box>
          </Box>
        </Modal>
        <input
          id="groupInfo-avatarItem-editImg"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            display: "none",
            marginLeft: "auto",
            color: { orange },
            fontFamily: "ubuntun",
          }}
        ></input>
        <label
          htmlFor="groupInfo-avatarItem-editImg"
          style={{
            marginLeft: "40px",
            fontFamily: "Gloria Hallelujah",
            backgroundColor: "lightgrey",
            padding: "3px 20px",
            borderRadius: "150px",
            boxShadow: "1px 3px 5px rgba(0, 0, 0, 0.1)",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            ":hover": {
              backgroundColor: "lightgrey",
              filter: "brightness(0.95)",
            },
          }}
        >
          Change
        </label>
      </div>
    </div>
  );
}
