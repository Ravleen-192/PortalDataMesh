import React from "react";

function TemplateItem({ image, name}) {
  return (
    <div className="templateItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <p> {name} </p>
      
    </div>
  );
}

export default TemplateItem;
