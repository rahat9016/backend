import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

type IPaginationDetails = {
  current_page: number;
  limit: number;
  total?: number;
};

type IPaginationDetailsResult = {
  total_page: number | null;
  previous_page: number | null;
  next_page: number | null;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const calculatePaginationOptions = (
  details: IPaginationDetails
): IPaginationDetailsResult => {
  const { current_page, limit, total } = details;
  const total_page = total ? Math.ceil(total / limit) : 0;
  const has_prev = current_page > 1;
  const has_next = current_page < total_page;
  const previous_page = has_prev ? current_page - 1 : null;
  const next_page = has_next ? current_page + 1 : null;
  return {
    total_page,
    previous_page,
    next_page,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
