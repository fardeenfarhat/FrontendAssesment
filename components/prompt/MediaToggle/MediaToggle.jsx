"use client";

import { useGenerationState, useGenerationDispatch } from "@/context/GenerationProvider";
import SegmentedControl from "@/components/ui/SegmentedControl";
import Icon from "@/components/ui/Icon";

const OPTIONS = [
  {
    value: "image",
    label: "Image",
    icon: <Icon name="image" size={14} />,
  },
  {
    value: "video",
    label: "Video",
    icon: <Icon name="video" size={14} />,
  },
];

export default function MediaToggle() {
  const { mediaType } = useGenerationState();
  const { dispatch } = useGenerationDispatch();

  return (
    <SegmentedControl
      options={OPTIONS}
      value={mediaType}
      onChange={(val) => dispatch({ type: "SET_MEDIA_TYPE", payload: val })}
    />
  );
}
