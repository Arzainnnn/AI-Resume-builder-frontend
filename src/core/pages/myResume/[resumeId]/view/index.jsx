import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { Copy } from "lucide-react";
import { Download } from "lucide-react";
import { Header } from "@/core/components";
import { Share2Icon } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import GlobalAPI from "../../../../../service/GlobalAPI";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { ResumePreview } from "@/core/pages/dashboard/resume/components";

const ViewResume = () => {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState([]);
  const [triggeredDownload, setTriggeredDownload] = useState(false);

  useEffect(() => {
    getResumeDetails();
  }, []);

  const HandleDownload = () => {
    setTriggeredDownload(true);
    setTimeout(() => {
      window.print();
      toast.success("Resume downloaded successfully!");
    }, 1000);
  };

  const handleCopy = () => {
    toast.success("Copied to clipboard!");
  };
  const handleShare = () => {
    toast.success(
      "Copied! Now you can share your profile to your friends and family."
    );
  };

  const getResumeDetails = () => {
    GlobalAPI.GetResumeById(resumeId)
      .then((resp) => setResumeInfo(resp?.data?.data))
      .catch((err) => console.log(err));
  };

  const shareMessage = `Hey! Check out my resume here: ${
    import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view"
  } 🚀 Let me know what you think!`;

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print-area">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! 🥳🥳 Your Ultimate AI generated Resume is ready !{" "}
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and you can share unique
            resume url with your friends and family{" "}
          </p>
          <div className="flex justify-between my-10">
            <Button onClick={HandleDownload}>
              Download <Download />
            </Button>
            <div className="flex gap-2">
              <CopyToClipboard onCopy={handleShare} text={shareMessage}>
                <Button>
                  Share <Share2Icon />
                </Button>
              </CopyToClipboard>
              <CopyToClipboard
                onCopy={handleCopy}
                text={
                  import.meta.env.VITE_BASE_URL +
                  "/my-resume/" +
                  resumeId +
                  "/view"
                }
              >
                <Button>
                  Copy <Copy />
                </Button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <ResumePreview triggeredDownload={triggeredDownload} />
        </div>
      </div>
      <Toaster richColors position="top-center" />
    </ResumeInfoContext.Provider>
  );
};

export default ViewResume;
