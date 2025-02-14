import React, { useState } from "react";
import {
  Skills,
  Summary,
  Education,
  Experience,
  PersonalDetails,
} from "./forms";
import { Home } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ThemeColor from "@/core/components/themeColor";

const renderFromOnIndex = (activeFormIndex, setEnabledNext) => {
  const { resumeId = "" } = useParams();
  switch (activeFormIndex) {
    case 1:
      return {
        title: "Personal Detail",
        description: "Get Started with the basic information",
        children: <PersonalDetails enabledNext={(v) => setEnabledNext(v)} />,
      };
    case 2:
      return {
        title: "Summary",
        description: "Add Summary for your job title",
        children: <Summary enabledNext={(v) => setEnabledNext(v)} />,
      };
    case 3:
      return {
        title: "Professional Experience",
        description: "Add Your previous Job experience",
        children: <Experience enabledNext={(v) => setEnabledNext(v)} />,
      };
    case 4:
      return {
        title: "Education",
        description: "Add Your educational details",
        children: <Education enabledNext={(v) => setEnabledNext(v)} />,
      };
    case 5:
      return {
        title: "Skills",
        description: "Add Your top professional key skills",
        children: <Skills enabledNext={(v) => setEnabledNext(v)} />,
      };
    case 6:
      return {
        children: <Navigate to={`/my-resume/${resumeId}/view`} />,
      };

    default:
      break;
  }
};

const FormSelection = () => {
  const [enabledNext, setEnabledNext] = useState(true);
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const { title, description, children } = renderFromOnIndex(
    activeFormIndex,
    setEnabledNext
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to="/dashboard">
            <Button className="flex gap-2" size="sm">
              <Home />
              Home
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              className="flex gap-2"
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              Previous <ArrowLeft />
            </Button>
          )}
          {/* {activeFormIndex < 5 && ( */}
          <Button
            size="sm"
            className="flex gap-2"
            disabled={!enabledNext}
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
          {/* )} */}
        </div>
      </div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">{title}</h2>
        <p>{description}</p>
        {children}
      </div>
    </div>
  );
};

export default FormSelection;
