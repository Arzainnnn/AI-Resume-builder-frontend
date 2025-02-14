import React from "react";

function Education({ resumeInfo }) {
  const { themeColor = "", education = [] } = resumeInfo || {};
  return (
    <>
      {education && Array.isArray(education) && education?.length > 0 && (
        <div className="my-6">
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{
              color: themeColor,
            }}
          >
            Education
          </h2>
          <hr
            style={{
              borderColor: themeColor,
            }}
          />

          {education &&
            education?.length > 0 &&
            education?.map((education, index) => {
              const {
                major = "",
                degree = "",
                endDate = "",
                startDate = "",
                description = "",
                universityName = "",
              } = education || {};
              return (
                <div key={index} className="my-5">
                  <h2
                    className="text-sm font-bold"
                    style={{
                      color: themeColor,
                    }}
                  >
                    {universityName}
                  </h2>
                  <h2 className="text-xs flex justify-between">
                    {degree} in {major}
                    <span>
                      {startDate} To {endDate}
                    </span>
                  </h2>
                  <p className="text-xs my-2">{description}</p>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}

export default Education;
