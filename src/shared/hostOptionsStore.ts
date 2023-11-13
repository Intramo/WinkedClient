import { writable } from "svelte/store";

export const hostOptions = writable<HostOptions>({ showAnswersTextOnPlayerDevices: false });
