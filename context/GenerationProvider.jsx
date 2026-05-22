"use client";

import { createContext, useCallback, useContext, useReducer } from "react";
import { DEFAULT_MODEL } from "@/lib/constants/models";
import { DEFAULT_COUNT } from "@/lib/constants/styles";
import { DEFAULT_RATIO } from "@/lib/constants/ratios";
import { mockHistory } from "@/lib/mocks/history";
import { generateContent } from "@/lib/api/generateClient";
import { generateId } from "@/lib/utils/ids";

const GenerationStateContext = createContext(null);
const GenerationDispatchContext = createContext(null);

const initialState = {
  prompt: "",
  mediaType: "image",
  model: DEFAULT_MODEL,
  ratio: DEFAULT_RATIO,
  selectedStyles: [],
  count: DEFAULT_COUNT,
  results: null,
  status: "idle",
  error: null,
  history: mockHistory,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PROMPT":
      return { ...state, prompt: action.payload };
    case "SET_MEDIA_TYPE":
      return { ...state, mediaType: action.payload, results: null };
    case "SET_MODEL":
      return { ...state, model: action.payload };
    case "SET_RATIO":
      return { ...state, ratio: action.payload };
    case "TOGGLE_STYLE": {
      const has = state.selectedStyles.includes(action.payload);
      return {
        ...state,
        selectedStyles: has
          ? state.selectedStyles.filter((s) => s !== action.payload)
          : [...state.selectedStyles, action.payload],
      };
    }
    case "SET_COUNT":
      return { ...state, count: action.payload };
    case "GENERATE_START":
      return { ...state, status: "loading", error: null };
    case "GENERATE_SUCCESS": {
      const historyEntry = {
        id: generateId("hist"),
        prompt: state.prompt,
        type: state.mediaType,
        model: state.model,
        createdAt: new Date().toISOString(),
        thumbnail: action.payload.items[0]?.poster || action.payload.items[0]?.url,
        items: action.payload.items,
      };
      return {
        ...state,
        status: "idle",
        results: action.payload,
        history: [historyEntry, ...state.history].slice(0, 50),
      };
    }
    case "GENERATE_ERROR":
      return { ...state, status: "error", error: action.payload };
    case "LOAD_HISTORY":
      return { ...state, results: action.payload };
    default:
      return state;
  }
}

export function GenerationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const generate = useCallback(async () => {
    if (!state.prompt.trim()) return;
    dispatch({ type: "GENERATE_START" });
    try {
      const result = await generateContent({
        prompt: state.prompt,
        type: state.mediaType,
        model: state.model,
        count: state.count,
      });
      dispatch({ type: "GENERATE_SUCCESS", payload: result });
    } catch (err) {
      dispatch({ type: "GENERATE_ERROR", payload: err.message });
    }
  }, [state.prompt, state.mediaType, state.model, state.count]);

  const loadHistory = useCallback((entry) => {
    dispatch({ type: "LOAD_HISTORY", payload: entry });
  }, []);

  return (
    <GenerationStateContext.Provider value={state}>
      <GenerationDispatchContext.Provider value={{ dispatch, generate, loadHistory }}>
        {children}
      </GenerationDispatchContext.Provider>
    </GenerationStateContext.Provider>
  );
}

export function useGenerationState() {
  const ctx = useContext(GenerationStateContext);
  if (!ctx) throw new Error("useGenerationState must be inside GenerationProvider");
  return ctx;
}

export function useGenerationDispatch() {
  const ctx = useContext(GenerationDispatchContext);
  if (!ctx) throw new Error("useGenerationDispatch must be inside GenerationProvider");
  return ctx;
}
