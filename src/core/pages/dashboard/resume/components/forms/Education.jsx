import React, { useContext, useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../../../../service/GlobalAPI";

const defaultEducation = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

const Education = ({ enabledNext }) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [educationList, setEducationList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo?.education?.length > 0 &&
      setEducationList(resumeInfo?.education);
  }, [resumeInfo?.education]);

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, education: educationList });
  }, [educationList]);

  const AddNewEducation = () => {
    setEducationList([...educationList, defaultEducation]);
  };

  const RemoveEducation = () => {
    setEducationList((eduList) => eduList.slice(0, -1));
  };

  const handleChange = (event, index) => {
    const newEntries = educationList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationList.map(({ id, ...rest }) => rest),
      },
    };
    GlobalApi.UpdateResume(params?.resumeId, data).then(
      (resp) => {
        enabledNext(true);
        setLoading(false);
        toast.success("Details updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      {educationList?.map((item, index) => (
        <div>
          <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
            <div className="col-span-2">
              <label>University Name</label>
              <Input
                name="universityName"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.universityName}
              />
            </div>
            <div>
              <label>Degree</label>
              <Input
                name="degree"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.degree}
              />
            </div>
            <div>
              <label>Major</label>
              <Input
                name="major"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.major}
              />
            </div>
            <div>
              <label>Start Date</label>
              <Input
                type="date"
                name="startDate"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.startDate}
              />
            </div>
            <div>
              <label>End Date</label>
              <Input
                type="date"
                name="endDate"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.endDate}
              />
            </div>
            <div className="col-span-2">
              <label>Description</label>
              <Textarea
                name="description"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item?.description}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="text-primary"
          >
            + Add More Education
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
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
};

export default Education;
