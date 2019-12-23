using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using socialMedia.API.Data;
using socialMediaApp.API.Dtos;

namespace socialMediaApp.API.Controllers
{
  [Authorize]
  [ApiController]
  [Route("[controller]")]
  public class UserController : ControllerBase
  {
    private readonly ISocialRepository _repo;
    private readonly IMapper _mappper;
    public UserController(ISocialRepository repo, IMapper mappper)
    {
      _mappper = mappper;
      _repo = repo;

    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
      var users = await _repo.GetUsers();
      var usersToReturn = _mappper.Map<IEnumerable<UserForListDto>>(users);
      return Ok(usersToReturn);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {

      var user = await _repo.GetUser(id);
      var userToReturn = _mappper.Map<UserForDetailedDto>(user);
      return Ok(userToReturn);
    }
  }

}