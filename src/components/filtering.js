import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

export function initFiltering(elements, indexes) {
    Object.keys(indexes).forEach((elementName) => {
        if (!elements[elementName]) {
            console.warn(`Элемент '${elementName}' не найден в шаблоне фильтра.`);
            return;
        }

        const values = indexes[elementName];

        if (!Array.isArray(values)) {
            console.error(`Ошибка данных: Для '${elementName}' ожидался массив, но получено:`, values);
            return;
        }

        const optionsNodes = values.map(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            return option;
        });

        elements[elementName].append(...optionsNodes);
    });

    const compare = createComparison(defaultRules);

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const parent = action.parentElement;
            const input = parent.querySelector('input');
            
            if (input) {
                input.value = '';
                const fieldName = action.dataset.field;
                
                if (fieldName) {
                    state[fieldName] = '';
                }
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state)); 
    };
}