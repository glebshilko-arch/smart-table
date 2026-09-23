import { getPages } from "../lib/utils.js";

export const initPagination = ({ pages, fromRow, toRow, totalRows }, createPage) => {
    const pageTemplate = pages.firstElementChild.cloneNode(true);
    
    if (pages.firstElementChild) {
        pages.firstElementChild.remove();
    }

    return (data, state, action) => {
        const rowsPerPage = state.rowsPerPage;
        const pageCount = Math.ceil(data.length / rowsPerPage);
        let page = state.page;

        //@todo: #2.6 — Обработка действий 
        if (action) {
            switch (action.name) {
                case 'prev': 
                    page = Math.max(1, page - 1); 
                    break;
                case 'next': 
                    page = Math.min(pageCount, page + 1); 
                    break;
                case 'first': 
                    page = 1; 
                    break;
                case 'last': 
                    page = pageCount; 
                    break;
                case 'page': 
                    page = Number(action.value); 
                    break;
                default:
                    break;
            }
        }

        const skip = (page - 1) * rowsPerPage;

        // @todo: #2.5 — Вывод статуса пагинации
        if (fromRow) {
            fromRow.textContent = data.length > 0 ? skip + 1 : 0;
        }
        
        if (toRow) {
            toRow.textContent = Math.min(page * rowsPerPage, data.length);
        }
        
        if (totalRows) {
            totalRows.textContent = data.length;
        }
        const visiblePages = getPages(page, pageCount, 5);

        pages.replaceChildren(...visiblePages.map(pageNumber => {
            const el = pageTemplate.cloneNode(true);
            return createPage(el, pageNumber, pageNumber === page);
        }));

        return data.slice(skip, skip + rowsPerPage);
    };
}; 