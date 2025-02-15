import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Brain, LoaderCircle } from "lucide-react";
import GlobalApi from "@/service/globalApi";
import { aiChatSession } from "../../../../../../service/AIModal";
import { toast } from "sonner";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summary for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summary and experience_level Field in JSON Format";

function Summary({ enabledNext }) {
  const params = useParams();
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [aiGeneratedSummaryList, setAiGenerateSummeryList] = useState();

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    const result = await aiChatSession.sendMessage(PROMPT);
    setAiGenerateSummeryList(JSON.parse(result.response.text()));
    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      data: {
        summary: summary,
      },
    };
    GlobalApi.UpdateResume(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        toast("Details updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <form className="mt-7" onSubmit={onSave}>
        <div className="flex justify-between items-end">
          <label>Add Summary</label>
          <Button
            variant="outline"
            onClick={() => GenerateSummeryFromAI()}
            type="button"
            size="sm"
            className="border-primary text-primary flex gap-2"
          >
            <Brain className="h-4 w-4" /> Generate from AI
          </Button>
        </div>
        <Textarea
          className="mt-5"
          required
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          defaultValue={summary ? summary : resumeInfo?.summary}
        />
        <div className="mt-2 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>

      {aiGeneratedSummaryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList?.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummary(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
