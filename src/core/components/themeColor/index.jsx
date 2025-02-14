import React, { useContext, useState } from "react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LayoutGrid } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlobalApi from "../../../service/GlobalApi";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const colors = [
  "#1A1A1D",
  "#2C3E50",
  "#34495E",
  "#1A5276",
  "#283747",
  "#154360",
  "#4A235A",
  "#512E5F",
  "#6C3483",
  "#B03A2E",
  "#943126",
  "#78281F",
  "#117864",
  "#196F3D",
  "#145A32",
  "#D35400",
  "#CA6F1E",
  "#873600",
  "#5D6D7E",
  "#2E4053",
];

function ThemeColor() {
  const { resumeId } = useParams();
  const [selectedColor, setSelectedColor] = useState();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const onColorSelect = (color) => {
    setSelectedColor(color);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });
    const data = {
      data: {
        themeColor: color,
      },
    };
    GlobalApi.UpdateResume(resumeId, data).then((resp) => {
      toast("Theme Color Updated");
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((item, index) => (
            <div
              onClick={() => onColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer
             hover:border-black border
             ${selectedColor == item && "border border-black"}
             `}
              style={{
                background: item,
              }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
