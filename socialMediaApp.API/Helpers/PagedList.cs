using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socialMedia.API.Helpers
{
    //paging info can be of multiple types so we are using T to replace later

    public class PagedList<T> : List<T>
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public PagedList(List<T> items, int count, int pageNumber, int pageSize )
        {
             TotalCount = count;
               PageSize = pageSize;
           
            CurrentPage = pageNumber;
          
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            this.AddRange(items);
        }
        //we need to find out how many items there are??
        //Creating static method 
        //Iqueryabele defers the execution of queries
        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var count = await source.CountAsync();
            //skip number of items and select next items to display
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, count, pageNumber, pageSize);

        }

    }






}
