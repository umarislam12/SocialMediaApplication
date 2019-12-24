using System;

namespace socialMediaApp.API.Dtos
{
  public class UserForListDto
  {
    public int Id { get; set; }
    public string Username { get; set; }

    public string Gender { get; set; }
    public int Age { get; set; }
    public string KnownAs { get; set; }
    public DateTime Created { get; set; }
    public DateTime LastActive { get; set; }

    public string City { get; set; }
    public string Country { get; set; }
    //this is user's main photo
    //Photo coming from photosForListDto
    public string PhotoUrl { get; set; }
  }
}