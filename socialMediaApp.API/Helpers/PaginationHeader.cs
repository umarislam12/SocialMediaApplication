using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socialMedia.API.Helpers
{
    public class PaginationHeader
    {
       //We send back this info inside our header
        public int CurrentPage { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public PaginationHeader(int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            this.CurrentPage = currentPage;
            this.ItemsPerPage = itemsPerPage;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;
        }
    }
}
