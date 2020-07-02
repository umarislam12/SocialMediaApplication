using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socialMedia.API.Dtos
{
    public class MessageToReturnDto
    {
        public int Id { get; set; }
        //User entity
        public int SenderId { get; set; }
        //Below prop take value automatically from user class i.e automapper is smart
        public string SenderKnownAs { get; set; }
        public string SenderPhotoUrl { get; set; }
        //User entity
        public int RecipientId { get; set; }
        //Below prop take value automatically from user class
        public string RecipientKnownAs { get; set; }
        public string RecipientPhotoUrl { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }
    }
}
