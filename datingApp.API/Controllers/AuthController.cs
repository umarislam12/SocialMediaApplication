using System.Threading.Tasks;
using datingApp.API.Data;
using datingApp.API.Dtos;
using datingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace datingApp.API.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class AuthController : ControllerBase
  {
    private readonly IAuthRepository _repo;
    public AuthController(IAuthRepository repo)
    {
      _repo = repo;

    }
    [HttpPost("register")]
    //DTOs meet with model classes here in controller
    public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
    {
      //so that capital/lower doesnt create a problem when comparing
      userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
      //Our authRepository takes in only username and password so we use dto to hide extensive information that shall be initialized after calculation in authrepository implementation
      if (await _repo.UserExist(userForRegisterDto.Username))
      {
        return BadRequest("user already exist");
      }
      // initializing username field in model
      var userToCreate = new User()
      {
        //while AuthRepositor takes care of our password
        Username = userForRegisterDto.Username
      };
      var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);
      //validate Req
      //CreatedATRoute method we will use later now we are cheating
      return StatusCode(201);

    }
  }
}