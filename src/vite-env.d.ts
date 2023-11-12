/// <reference types="svelte" />
/// <reference types="vite/client" />

type ColorScheme = "light" | "dark" | "pink";

type ToastType = "error" | "info";
type Toast = { message: string; duration: number; type: ToastType };
