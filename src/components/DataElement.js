import React from "react";

const DataElement = () => {
  return (
    <>
      <div>
        {Object.keys(data).map((key) => (
          <div>
            <span>{key}</span>
            <span>:{value}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default DataElement;
{
  /* <LabelValueComponent key={key} label={key} value={data[key]} /> */
}
