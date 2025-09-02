export type Pagination = {
  limit: number;
  page: number;
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
};
