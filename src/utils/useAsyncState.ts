import { unstable_getCacheForType, useEffect } from 'react';

export function createState() {
	const createCache = () => new Map();

	return function useAsyncState(key: string) {
		const cache = unstable_getCacheForType(createCache);

		useEffect(() => {
			return () => {

			};
		}, []);

		return [];
	}
}
