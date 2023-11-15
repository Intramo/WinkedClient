/// <reference types="svelte" />
/// <reference types="vite/client" />

type ColorScheme = "light" | "dark" | "pink";

// TOASTS
type ToastType = "error" | "info";
type Toast = { message: string; duration: number; type: ToastType };

// QUESTIONS
type Question = QuestionTypeNormal | QuestionTypeMultiple | QuestionTypeTrueFalse | QuestionTypeText;
type QuestionType = "normal" | "multiple" | "truefalse" | "text";
type QuestionTypeNormal = { type: "normal"; question: string; a: string | null; b: string | null; c: string | null; d: string | null; e: string | null; f: string | null };
type QuestionTypeMultiple = { type: "multiple"; question: string; a: string | null; b: string | null; c: string | null; d: string | null; e: string | null; f: string | null };
type QuestionTypeTrueFalse = { type: "truefalse"; question: string };
type QuestionTypeText = { type: "text"; question: string };

// JSON
type JSONValue = string | number | boolean | JSONObject | JSONArray;
interface JSONObject {
  [x: string]: JSONValue;
}
interface JSONArray extends Array<JSONValue> {}

// OPTIONS
type HostOptions = {
  showAnswersTextOnPlayerDevices: boolean;
  randomizedPlayerNames: boolean;
  sessionLocked: boolean;
};

type apiRouteValidateResponse = {
  success: boolean;
  error: string;
  token: string | null;
};
