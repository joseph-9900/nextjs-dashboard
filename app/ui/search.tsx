'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

// Search Implementation Steps.

// 1. Capture the user's input.
// 2. Update the URL with the search params.
// 3. Keep the URL in sync with the input field.
// 4. Update the table to reflect the search query.

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);
        // console.log(searchParams);

        // 2. Update the URL with the search params.
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        // console.log(params);
        // console.log(params.toString());

        replace(`${pathname}?${params.toString()}`);

        // console.log(`${pathname}?${params.toString()}`);
    }, 300);
    
    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                // 1. Capture the user's input.
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                // 3. Keeping the URL and input in sync
                defaultValue={searchParams.get('query')?.toString()}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    );
}
