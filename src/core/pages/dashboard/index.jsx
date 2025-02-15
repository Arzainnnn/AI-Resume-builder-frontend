import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { AddResume, ResumeCard } from "./components";
import GlobalAPI from "../../../service/globalApi";

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const GetResumeList = () => {
    GlobalAPI.GetResumes(userEmail).then((resp) => {
      setResumeList(resp?.data?.data);
    });
  };

  useEffect(() => {
    user && GetResumeList();
  }, [user]);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI resume to your next job role.</p>
      <div className="grid grid-cols-2 md: grid-cols-3 lg: grid-cols-5 gap-5 mt-10">
        <AddResume refreshData={GetResumeList} />
        {resumeList && Array.isArray(resumeList) && resumeList?.length > 0
          ? resumeList?.map((resume, idx) => (
              <ResumeCard
                resume={resume}
                key={idx}
                refreshData={GetResumeList}
              />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div className="h-[280px] rounded-lg bg-slate-200 animate-pulse"></div>
            ))}
      </div>
    </div>
  );
};

export default Dashboard;
