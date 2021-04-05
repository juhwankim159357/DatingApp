using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Dtos
{
    public class PhotoForCreationDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; } // IFormFile: File with HttpRequest
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; } // back from Cloudinary

        public PhotoForCreationDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}