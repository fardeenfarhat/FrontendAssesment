"use client";

import { useGenerationState, useGenerationDispatch } from "@/context/GenerationProvider";
import Dropdown from "@/components/ui/Dropdown";
import { MODELS } from "@/lib/constants/models";

export default function ModelSelector() {
  const { model } = useGenerationState();
  const { dispatch } = useGenerationDispatch();

  return (
    <Dropdown
      variant="pill"
      value={model}
      options={MODELS}
      onChange={(val) => dispatch({ type: "SET_MODEL", payload: val })}
    />
  );
}
