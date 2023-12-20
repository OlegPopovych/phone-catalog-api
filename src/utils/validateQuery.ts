import { SortType } from '../emuns';
import { QueryParamsProcess } from '../types';

export const processQuery = ({
  sort,
  page,
  perPage,
  totalElementsInDb,
  DEFAULT_PER_PAGE,
  DEFAULT_PAGE,
}: QueryParamsProcess) => {
  let shouldRedirect = false;

  const validatedPage = page ? parseInt(page, 10) : DEFAULT_PAGE;
  const validatedPerPage = perPage ? parseInt(perPage, 10) : DEFAULT_PER_PAGE;

  const maxPages = Math.ceil(totalElementsInDb / validatedPerPage);

  if (validatedPage > maxPages || validatedPerPage > totalElementsInDb) {
    shouldRedirect = true;
  }

  let sortBy = 'year';

  if (sort === SortType.age) {
    sortBy = 'year';
  }
  if (sort === SortType.title) {
    sortBy = 'name';
  }
  if (sort === SortType.price) {
    sortBy = 'price';
  }

  return {
    shouldRedirect,
    sortBy,
    maxPages,
    totalElementsInDb,
    elementsOnPage: validatedPerPage,
    selectedPage: validatedPage,
  };
};
