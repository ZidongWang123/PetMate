import React from 'react';
import './Ads.css';
import { Link } from '@mui/material';
import zooplusAd from "../../../images/zooplus.png"
import zooplusAd_ from "../../../images/zooplus.webp"

const Ads = ({className}) => {
    return (
        <div className={className}>
            <Link href="https://www.zooplus.de">
                <img className="adsPicture" src={zooplusAd}></img>
            </Link>
           
        </div>
    );
}

export default Ads;