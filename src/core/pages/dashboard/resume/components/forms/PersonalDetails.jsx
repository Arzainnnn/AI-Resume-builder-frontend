import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../service/globalApi";
import { toast } from "sonner";

function PersonalDetails({ enabledNext }) {
  const params = useParams();
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: formData,
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

  return (
    <div>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              required
              name="firstName"
              onChange={handleInputChange}
              defaultValue={resumeInfo?.firstName}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              required
              name="lastName"
              onChange={handleInputChange}
              defaultValue={resumeInfo?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              required
              name="jobTitle"
              onChange={handleInputChange}
              defaultValue={resumeInfo?.jobTitle}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              required
              name="address"
              onChange={handleInputChange}
              defaultValue={resumeInfo?.address}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.phone}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              required
              name="email"
              onChange={handleInputChange}
              defaultValue={resumeInfo?.email}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
