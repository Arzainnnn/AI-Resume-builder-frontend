import React from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";
import {
  Skills,
  Summary,
  Education,
  Experience,
  PersonalDetails,
} from "./preview";

const ResumePreview = ({ triggeredDownload }) => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  return (
    <div
      className={
        triggeredDownload ? "" : "shadow-lg h-full p-14 border-t-[20px]"
      }
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal details */}
      <PersonalDetails resumeInfo={resumeInfo} />
      {/* Summary */}
      <Summary resumeInfo={resumeInfo} />
      {/* Professional Experience */}
      <Experience resumeInfo={resumeInfo} />
      {/* Education */}
      <Education resumeInfo={resumeInfo} />
      {/* Skills */}
      <Skills resumeInfo={resumeInfo} />
    </div>
  );
};

export default ResumePreview;
