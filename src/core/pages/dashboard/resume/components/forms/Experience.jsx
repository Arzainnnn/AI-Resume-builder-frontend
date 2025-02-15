import React, { useContext, useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/core/components";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../../service/globalApi";

const defaultExperience = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

function Experience({ enabledNext }) {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [experienceList, setExperienceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo?.experience.length > 0 &&
      setExperienceList(resumeInfo?.experience);
  }, [resumeInfo?.experience]);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };
    GlobalApi.UpdateResume(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        toast.success("Details updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const AddNewExperience = () => {
    setExperienceList([...experienceList, defaultExperience]);
  };

  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  return (
    <div>
      {experienceList?.map((item, index) => {
        return (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div>
                <label className="text-xs">Position Title</label>
                <Input
                  name="title"
                  defaultValue={item?.title}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs">Company Name</label>
                <Input
                  name="companyName"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.companyName}
                />
              </div>
              <div>
                <label className="text-xs">City</label>
                <Input
                  name="city"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.city}
                />
              </div>
              <div>
                <label className="text-xs">State</label>
                <Input
                  name="state"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.state}
                />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.startDate}
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  defaultValue={item?.endDate}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div className="col-span-2">
                <RichTextEditor
                  index={index}
                  defaultValue={item?.workSummary}
                  onRichTextEditorChange={(e) => {
                    handleRichTextEditor(e, "workSummary", index);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewExperience}
            className="text-primary"
          >
            + Add More Experience
          </Button>
          <Button
            variant="outline"
            onClick={RemoveExperience}
            className="text-primary"
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Experience;
