import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "@smastrom/react-rating/style.css";
import { useParams } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../../service/globalApi";
import { LoaderCircle } from "lucide-react";

const defaultSkills = {
  rating: 0,
  name: "",
};
const Skills = ({ enabledNext }) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [skillsList, setSkillsList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo?.skills?.length > 0 && setSkillsList(resumeInfo?.skills);
  }, [resumeInfo?.skills]);

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const AddNewSkills = () => {
    setSkillsList([...skillsList, defaultSkills]);
  };
  const RemoveSkills = () => {
    setSkillsList((skillList) => skillList.slice(0, -1));
  };
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
      },
    };
    GlobalApi.UpdateResume(params?.resumeId, data).then(
      (resp) => {
        setLoading(false);
        enabledNext(true);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      {skillsList?.map((item, index) => (
        <div className="flex justify-between mb-2 border rounded-lg p-3 ">
          <div>
            <label className="text-xs">Name</label>
            <Input
              className="w-full"
              defaultValue={item.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </div>
          <Rating
            value={item.rating}
            style={{ maxWidth: 120 }}
            onChange={(v) => handleChange(index, "rating", v)}
          />
        </div>
      ))}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewSkills}
            className="text-primary"
          >
            + Add More Skill
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
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

export default Skills;
