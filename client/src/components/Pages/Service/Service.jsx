import { Container } from "@mui/material";
import React from "react";
import SelectLabels from "../../Widget/SelectBar/SelectBar";
import InputBar from "../../Widget/InputBar/InputBar";

const city = ['Munich', 'Berlin', 'Frankfurt']
const Service = () => {
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <SelectLabels selectItems={city} />
            <InputBar />
        </Container>
    );
};

export default Service;