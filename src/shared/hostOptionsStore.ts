import { writable } from "svelte/store";

export const hostOptions = writable<HostOptions>({ showAnswersTextOnPlayerDevices: false });
export const gameCode = writable<string>("000000");
