'use strict';

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

  let sotrBy = 'id';

  if (sort === SortType.age) {
    sotrBy = 'year';
  }
  if (sort === SortType.title) {
    sotrBy = 'name';
  }
  if (sort === SortType.price) {
    sotrBy = 'price';
  }

  let elementsOnPage;
  let selectedPage = Number(page);

  switch (perPage) {
  case '4' || '8' || '16':
    elementsOnPage = Number(perPage);
    break;

  case 'all':
    elementsOnPage = totalElementsInDb;
    break;

  default:
    elementsOnPage = DEFAULT_PER_PAGE;
  }

  const maxPages = Math.ceil(totalElementsInDb / elementsOnPage);

  if (page === undefined) {
    selectedPage = DEFAULT_PAGE;
  }

  return {
    sotrBy,
    maxPages,
    totalElementsInDb,
    elementsOnPage,
    selectedPage
  };
};
