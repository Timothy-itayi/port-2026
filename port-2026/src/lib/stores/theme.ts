import { writable, derived } from 'svelte/store';

export const themeActive = writable(false);

export type ThemeMode = 'default' | 'alt';

export const themeMode = derived(themeActive, ($t): ThemeMode => ($t ? 'alt' : 'default'));

export function toggleTheme() {
	themeActive.update((v) => !v);
}
