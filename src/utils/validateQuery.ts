import { SortType } from '../emuns';
import { QueryParamsProcess } from '../types';

export const validateQuery = ({
  sort,
  page,
  perPage,
  totalElementsInDb,
  DEFAULT_PER_PAGE,
  DEFAULT_PAGE,
}: QueryParamsProcess) => {
  let shouldRedirect = false;

  let validatedPage = page ? parseInt(page, 10) : DEFAULT_PAGE;
  let validatedPerPage = perPage ? parseInt(perPage, 10) : DEFAULT_PER_PAGE;

  let maxPages = Math.ceil(totalElementsInDb / validatedPerPage);

  if (validatedPage > maxPages || validatedPerPage > totalElementsInDb) {
    shouldRedirect = true;
  }

  let sortBy = 'year';
  let order = 'DESC';

  if (sort === SortType.age) {
    sortBy = 'year';
    order = 'DESC';
  }
  if (sort === SortType.title) {
    sortBy = 'name';
    order = 'ASC';
  }
  if (sort === SortType.price) {
    sortBy = 'price';
    order = 'ASC';
  }

  if(perPage === 'all') {
    validatedPage = 1;
    maxPages = 1;
    validatedPerPage = totalElementsInDb;
    shouldRedirect = false;
  }

  return {
    orderBy: order,
    shouldRedirect,
    sortBy,
    maxPages,
    totalElementsInDb,
    elementsOnPage: validatedPerPage,
    selectedPage: validatedPage,
  };
};
