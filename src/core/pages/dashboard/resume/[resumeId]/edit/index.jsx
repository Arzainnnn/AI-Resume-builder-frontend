import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "@/service/globalApi";
import { FormSelection, ResumePreview } from "../../components";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const EditResume = () => {
  const { resumeId = "" } = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    getResumeDetails();
  }, []);

  const getResumeDetails = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) =>
      setResumeInfo(resp?.data?.data)
    );
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Selection */}
        <FormSelection />
        {/* Preview Selection */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
