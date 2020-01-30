using System.Linq;
using AutoMapper;
using socialMedia.API.Dtos;
using socialMedia.API.Helpers;
using socialMedia.API.Models;
using socialMediaApp.API.Dtos;

namespace socialMediaApp.API.Helpers
{
  public class AutoMapperProfiles : Profile
  {
    public AutoMapperProfiles()
    {
      // public IMappingExpression CreateMap(Type sourceType, Type destinationType, MemberList memberList);
      CreateMap<User, UserForListDto>()
      .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
      .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
 

      CreateMap<User, UserForDetailedDto>()
      .ForMember(dest => dest.PhotoUrl, opt => 
      opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
      .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

      CreateMap<Photo, PhotosForDetailedDto>();
      CreateMap<UserForUpdateDto, User>();
     CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
            
        }

  }
}