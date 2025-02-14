import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import {
  Editor,
  BtnBold,
  BtnLink,
  Toolbar,
  BtnItalic,
  Separator,
  BtnUnderline,
  BtnBulletList,
  EditorProvider,
  BtnNumberedList,
  BtnStrikeThrough,
} from "react-simple-wysiwyg";
import { toast } from "sonner";
import { aiChatSession } from "../../../service/AIModal";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const PROMPT =
  "position title: {positionTitle} , Depending on position title give me my experience in resume in array of string no keys added to it";

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo } = useContext(ResumeInfoContext);

  const GenerateSummaryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      toast("Please Add Position Title");
      return;
    }
    setLoading(true);
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );

    const result = await aiChatSession.sendMessage(prompt);
    console.log(result.response.text());
    const resp = await result.response.text();
    const updatedValue = resp.replace("[", "").replace("]", "");
    setValue(updatedValue);
    onRichTextEditorChange({ target: { value: updatedValue } });
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          disabled={loading}
          onClick={GenerateSummaryFromAI}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <Separator />
            <BtnUnderline />
            <BtnStrikeThrough />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
