using System.Net;
using System.Reflection.Metadata;
using System.Collections.Immutable;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using socialMedia.API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;         
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using socialMedia.API.Helpers;
using AutoMapper;
using socialMediaApp.API.Helpers;

namespace socialMedia.API
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      //Orrdering here is not important

      services.AddDbContext<DataContext>(x => x.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
     
      services.AddControllers().AddNewtonsoftJson(opt => { opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore; });
      services.AddCors();
      //binding appsettings.json section and  helpers/cloudinarysettings
      services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
      //creating dependency injection
      //One of the classes in our assembly
      services.AddAutoMapper(typeof(SocialRepository).Assembly);
      //IauthRepository is used in controller functions

      services.AddScoped<IAuthRepository, AuthRepository>();
      services.AddScoped<ISocialRepository, SocialRepository>();
            
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer(options =>
      {
        options.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
          .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
          ValidateIssuer = false,
          ValidateAudience = false
        };
      });
            services.AddScoped<LogUserActivity>();
        }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler(builder =>
        {
          builder.Run(async context =>
          {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var error = context.Features.Get<IExceptionHandlerFeature>();
            if (error != null)
            {
              context.Response.AddApplicationError(error.Error.Message);
              await context.Response.WriteAsync(error.Error.Message);
            }
          });
        });
      }
      // app.UseHttpsRedirection();
      //app.Usemvc Was used in core 2.2 now it is broken down into following

      app.UseRouting();
      app.UseAuthentication();
      app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
