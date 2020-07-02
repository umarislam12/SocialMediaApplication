using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace socialMedia.API.Helpers
{
  public static class Extensions
  {
    public static void AddApplicationError(this HttpResponse response, string message)
    {
      response.Headers.Add("Application-Error", message);
      response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
      response.Headers.Add("Access-Control-Allow-Origin", "*");
    }
        //We make use of this method inside our controller i.e, Response.AddPagination
        //Pagination info shall be contained in header of messagesForUser method in MessagesController
        public static void AddPagination(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            //Create an instance of paginationHeader.cs
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
            var camelCaseFormatter=new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver=new CamelCasePropertyNamesContractResolver();
            //convert object into string values using JsonConvert
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    public static int CalculateAge(this DateTime theDateTime)
    {
      var age = DateTime.Today.Year - theDateTime.Year;
      if (theDateTime.AddYears(age) > DateTime.Today)

        age--;
      return age;


    }
  }
}