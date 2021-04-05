using System;

namespace DatingApp.API.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }

        // no need for password
        public string Gender { get; set; }
        public int Age { get; set; } // instead of dateBirth
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime? LastActive { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; } // instead of Photo object
    }
}