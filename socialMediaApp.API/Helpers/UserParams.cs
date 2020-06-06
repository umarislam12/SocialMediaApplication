using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socialMedia.API.Helpers
{
    public class UserParams
    {
        //to prevent user from requesting say 1Mil users
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize=10;

        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public int UserId { get; set; }
        public string Gender { get; set; }
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 100;
        public string OrderBy { get; set; } 
        public bool Likers { get; set; } = false;
        public bool Likees { get; set; } = false;
    }
}
