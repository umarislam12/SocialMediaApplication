using System.Security.Claims;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using socialMedia.API.Data;
using socialMediaApp.API.Dtos;
using System;
using socialMedia.API.Helpers;
using socialMedia.API.Models;

namespace socialMediaApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
  //[Authorize]
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
//when we pass parameters into method it gets turned into single serialized JSON object so we are gona create userParams class to pass parameters
    [HttpGet]
    public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            //Filtering current userID and by gender
           var currentUserId= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
          //  Console.WriteLine(currentUserId);
            var userFromRepo = await _repo.GetUser(currentUserId);
            userParams.UserId = currentUserId;
            if (string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            }
            //userparams are coming in query string
            //We get pagedList<Users> in users variable
            var users = await _repo.GetUsers(userParams);
            //map<dest>(source)
      var usersToReturn = _mappper.Map<IEnumerable<UserForListDto>>(users);
            //We are passing this info back to browser
            //Adding the pagination info to our response headers
            //we have access to response coz we are in API controller
            //ADDPagnination is our extension method
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            //return Ienumerable<T>has to be return in the in the end to client
      return Ok(usersToReturn);
    }
    [HttpGet("{id}", Name ="GetUser")]
    public async Task<IActionResult> GetUser(int id)
    {

      var user = await _repo.GetUser(id);
      var userToReturn = _mappper.Map<UserForDetailedDto>(user);
      return Ok(userToReturn);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
    {
      if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
      return Unauthorized();
            var userFromRepo = await _repo.GetUser(id);             
            _mappper.Map(userForUpdateDto, userFromRepo);
            if (await _repo.SaveAll())
                return NoContent();
            throw new Exception($"user {id} failed to save");
    }
       
        
        [HttpPost("{id}/like/{recepientId}")]
        public async Task<IActionResult>LikeUser(int id, int recepientId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var like = await _repo.GetLike(id, recepientId);
                if (like != null)
 return BadRequest("You have already liked this user");
            if (await _repo.GetUser(recepientId) == null)
                return NotFound();
            like = new Like
            {
                LikerId = id,
                LikeeId = recepientId
            };
            _repo.Add<Like>(like);
            if (await _repo.SaveAll())
                return Ok();
            return BadRequest("Failed to like user");
        }
  }

}