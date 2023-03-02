import React from "react";
import Typography from '@mui/material/Typography';
import PIIImg from "../resources/datapii.svg"
import QualityImg from "../resources/dataquality.svg"
import SourceImg from "../resources/datasource.svg"

export const ChurnAnalysisPopOver = () => {
    
    return(
      <div className="popover">
        <div className="item">
          <img className="icon" src={PIIImg}/> 
          <p className="text">Contains PII</p>
        </div>
        <div className="item">
          <img className="icon" src={QualityImg}/>
          <p className="text">87%</p>
        </div>
        <div className="item">
          <img className="icon" src={SourceImg}/>
          <p className="text">S3: csv file</p>
        </div>
      </div>
    )
};

export const PreSalesPopOver = () => {
  return(
    <>
      <Typography sx={{ p: 1 }}>I use Popover2.</Typography>
    </>
  )
};

