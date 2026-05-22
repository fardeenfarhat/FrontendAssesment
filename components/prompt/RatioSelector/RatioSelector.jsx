"use client";

import { useGenerationState, useGenerationDispatch } from "@/context/GenerationProvider";
import Dropdown from "@/components/ui/Dropdown";
import { ASPECT_RATIOS } from "@/lib/constants/ratios";

export default function RatioSelector() {
  const { ratio } = useGenerationState();
  const { dispatch } = useGenerationDispatch();

  return (
    <Dropdown
      variant="pill"
      value={ratio}
      options={ASPECT_RATIOS}
      onChange={(val) => dispatch({ type: "SET_RATIO", payload: val })}
    />
  );
}
