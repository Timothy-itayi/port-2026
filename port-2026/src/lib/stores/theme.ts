import { writable, derived } from 'svelte/store';

export const themeActive = writable(false);
export const styleActive = writable(false);

export type ThemeMode = 'default' | 'alt';
export type StyleMode = 'default' | 'alt';

export const themeMode = derived(themeActive, ($t): ThemeMode => ($t ? 'alt' : 'default'));
export const styleMode = derived(styleActive, ($s): StyleMode => ($s ? 'alt' : 'default'));

export function toggleTheme() {
	themeActive.update((v) => !v);
}

export function toggleStyle() {
	styleActive.update((v) => !v);
}
