import React from "react";

function Experience({ resumeInfo }) {
  const { experience = [], themeColor = "" } = resumeInfo || {};

  return (
    <>
      {experience && Array.isArray(experience) && experience?.length > 0 && (
        <div className="my-6">
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{
              color: themeColor,
            }}
          >
            Professional Experience
          </h2>
          <hr
            style={{
              borderColor: themeColor,
            }}
          />

          {experience &&
            experience?.length > 0 &&
            experience?.map((experience, index) => {
              const {
                city = "",
                state = "",
                title = "",
                endDate = "",
                startDate = "",
                workSummary = "",
                companyName = "",
                currentlyWorking = "",
              } = experience || {};
              return (
                <div key={index} className="my-5">
                  <h2
                    className="text-sm font-bold"
                    style={{
                      color: themeColor,
                    }}
                  >
                    {title}
                  </h2>
                  <h2 className="text-xs flex justify-between">
                    {companyName},{city},{state}
                    <span>
                      {startDate} To {currentlyWorking ? "Present" : endDate}{" "}
                    </span>
                  </h2>
                  <div
                    className="text-xs my-2"
                    dangerouslySetInnerHTML={{ __html: workSummary }}
                  />
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}

export default Experience;
