import { writable } from "svelte/store";

export const toasts = writable<Toast[]>([]);

export function addToast(message: string, duration: number = 5000, type: ToastType = "error") {
  const toast: Toast = { message, duration, type };
  toasts.update((all) => [...all, toast]);
  setTimeout(() => {
    removeToast(toast);
  }, duration);
}

function removeToast(toast: Toast) {
  toasts.update((all) => all.filter((t) => t !== toast));
}
