'use client';

import { useDebouncedCallback } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

/**
 * Search Component
 *
 * This component provides a search input field that tracks user input and updates
 * the URL query parameter for "query". It utilizes Next.js navigation hooks to
 * dynamically update the path and reflect the search term in the URL.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.placeholder - The placeholder text for the search input.
 *
 * @component
 *
 * @example
 * return (
 *   <Search placeholder="Search invoices..." />
 * )
 */
export default function Search({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	/**
	 * Handle Search
	 *
	 * This function updates the URL's query parameter based on the search term input.
	 *
	 * @param {string} term - The search term entered by the user.
	 */
	const handleSearch = useDebouncedCallback((term) => {
		console.log(`Searching... ${term}`);
		const params = new URLSearchParams(searchParams);
		params.set('page', '1');
		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}
		replace(`${pathname}?${params.toString()}`);
		console.log(term);
	}, 300);
	return (
		<div className="relative flex flex-1 flex-shrink-0">
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<input
				onChange={(e) => {
					handleSearch(e.target.value);
				}}
				defaultValue={searchParams.get('query')?.toString()}
				className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
				placeholder={placeholder}
			/>
			<MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
		</div>
	);
}
