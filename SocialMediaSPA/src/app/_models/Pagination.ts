export interface Pagination {
  currentPage:number;
  itemsPerPage:number;
  totalItems:number;
  totalPages:number;

}
export class PaginatedResult<T>{
  //used to store result of any type
result:T;
pagination: Pagination;
}
