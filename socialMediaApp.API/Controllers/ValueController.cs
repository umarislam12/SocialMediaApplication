using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using socialMedia.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace socialMedia.API.Controllers
{
  //[AllowAnonymous]
  [ApiController]
  [Route("[controller]")]
  public class ValueController : ControllerBase
  {
    private readonly DataContext _context;
    public ValueController(DataContext context)
    {
      _context = context;

    }
    // GET api/values
    [Authorize(Roles ="Admin")]
    [HttpGet]
    public async Task<IActionResult> GetValues()
    {
      var values = await _context.Values.ToListAsync();
      return Ok(values);
    }
    [Authorize(Roles ="Member")]
    // GET api/values/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetValue(int id)
    {
      //first method returns an exception so we use firstOrdDefault

      var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);
      return Ok(value);
    }

    // POST api/values
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
