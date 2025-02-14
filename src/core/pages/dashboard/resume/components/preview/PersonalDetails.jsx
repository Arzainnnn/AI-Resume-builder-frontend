import React from "react";

const PersonalDetails = ({ resumeInfo }) => {
  const {
    phone = "",
    email = "",
    address = "",
    jobTitle = "",
    lastName = "",
    firstName = "",
    themeColor = "",
  } = resumeInfo || {};
  return (
    <div>
      <h2
        className="font-bold text-xl text-center"
        style={{
          color: themeColor,
        }}
      >
        {firstName} {lastName}
      </h2>
      <h2 className="text-center text-sm font-medium">{jobTitle}</h2>
      <h2
        className="text-center font-normal text-xs"
        style={{
          color: themeColor,
        }}
      >
        {address}
      </h2>
      <div className="flex justify-between">
        <h2
          className="font-normal text-xs"
          style={{
            color: themeColor,
          }}
        >
          {phone}
        </h2>
        <h2
          className="font-normal text-xs"
          style={{
            color: themeColor,
          }}
        >
          {email}
        </h2>
      </div>
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: themeColor,
        }}
      />
    </div>
  );
};

export default PersonalDetails;
