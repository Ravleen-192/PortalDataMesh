import React from "react";
import { Outlet  } from "react-router-dom";

const DPRequestAccessView = () => {
return (
	<div className="dptableview">
    <div className="dptablelist">
      <h1> request access view</h1>
    </div>
    <div className="dpcolumnlist">
    </div>
    <Outlet />
  </div>
);
};

export default DPRequestAccessView;
