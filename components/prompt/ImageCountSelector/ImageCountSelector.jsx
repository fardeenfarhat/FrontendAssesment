"use client";

import { useGenerationState, useGenerationDispatch } from "@/context/GenerationProvider";
import Dropdown from "@/components/ui/Dropdown";
import { IMAGE_COUNTS } from "@/lib/constants/styles";

const COUNT_OPTIONS = IMAGE_COUNTS.map((n) => ({
  id: n,
  label: `${n} ${n === 1 ? "Image" : "Images"}`,
}));

export default function ImageCountSelector() {
  const { count } = useGenerationState();
  const { dispatch } = useGenerationDispatch();

  return (
    <Dropdown
      variant="pill"
      value={count}
      options={COUNT_OPTIONS}
      onChange={(val) => dispatch({ type: "SET_COUNT", payload: val })}
    />
  );
}
