import { writable } from "svelte/store";

export const userName = writable<string>("Null");
export const userPoints = writable<number>(0);
