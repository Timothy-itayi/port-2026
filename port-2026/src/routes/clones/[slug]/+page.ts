import { error } from '@sveltejs/kit';
import { clones } from '$lib/data/clones.js';
import type { PageLoad } from './$types.js';

export const load: PageLoad = ({ params }) => {
	const clone = clones.find((c) => c.slug === params.slug);

	if (!clone) {
		throw error(404, 'Clone not found');
	}

	return {
		clone
	};
};
