using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socialMedia.API.Helpers
{
    public class MessageParams
    {
        //to prevent user from requesting say 1Mil users
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;

        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public int UserId { get; set; }
        public string MessageContainer { get; set; } = "Unread";
    }
}
