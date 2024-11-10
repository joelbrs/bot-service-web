export class RequestPagination {
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;

  constructor(data?: Partial<RequestPagination>) {
    Object.assign(this, data);
  }
}

export interface ResponsePagination<T> {
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  size: number;
  content: T[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: Sort;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}
