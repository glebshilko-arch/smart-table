import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
    const searchRules = {
        search: rules.searchMultipleFields('search', ['date', 'customer', 'seller'], false)
    };

    const compare = createComparison(searchRules);

    return (data, state, action) => {
        if (!state.search || state.search.trim() === '') {
            return [...data];
        }

        return data.filter(row => compare(row, state));
    };
} 