import { sortMap, sortCollection } from "../lib/sort.js";

export function initSorting(columns) {
    let currentSort = null;

    return (data, state, action) => {
        if (action) {
            const isSortButton = columns.includes(action);

            if (isSortButton) {
                action.dataset.value = sortMap[action.dataset.value];

                columns.forEach(btn => {
                    if (btn !== action) {
                        btn.dataset.value = 'none';
                    }
                });

                const field = action.dataset.field;
                const order = action.dataset.value;

                currentSort = { field, order };

                columns.forEach(btn => {
                    btn.classList.remove('icon-asc', 'icon-desc');

                    const btnOrder = btn.dataset.value;

                    if (btnOrder === 'asc') {
                        btn.classList.add('icon-asc');
                    } else if (btnOrder === 'desc') {
                        btn.classList.add('icon-desc');
                    }
                });
            }
        }

        let field = null;
        let order = null;

        columns.forEach(column => {
            if (column.dataset.value !== 'none') {
                field = column.dataset.field;
                order = column.dataset.value;
            }
        });

        if (field && order) {
            currentSort = { field, order };
        }

        if (!field || !order) {
            return [...data];
        }

        return sortCollection(data, field, order); 
    };
} 