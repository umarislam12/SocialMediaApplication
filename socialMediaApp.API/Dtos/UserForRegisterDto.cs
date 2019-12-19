using System.ComponentModel.DataAnnotations;

namespace socialMedia.API.Dtos
{
  public class UserForRegisterDto
  {
    [Required]
    public string Username { get; set; }
    [Required]
    [StringLength(8, MinimumLength = 4, ErrorMessage = "you must specify password between 8 and 4")]
    public string Password { get; set; }
  }
}