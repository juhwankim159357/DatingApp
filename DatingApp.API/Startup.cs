using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace DatingApp.API
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
            // don't forget to add package named : Microsoft.EntityFrameworkCore.SqlServer
            services.AddDbContext<DataContext>(x => x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // ref: https://stackoverflow.com/questions/58006152/net-core-3-not-having-referenceloophandling-in-addjsonoptions?noredirect=1&lq=1
            // ref: https://stackoverflow.com/questions/57684093/using-usemvc-to-configure-mvc-is-not-supported-while-using-endpoint-routing
            // NOTE: when upgrading from 2.2 to 3.x, then use AddNewtonsoftJson
            services.AddMvc(option => option.EnableEndpointRouting = false)
                .SetCompatibilityVersion(CompatibilityVersion.Latest)
                .AddNewtonsoftJson(options => { options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore; }); // avoid self referencing error (such as user and photos)

            services.AddCors();
            
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));

            // ref: https://www.codementor.io/@zedotech/how-to-using-automapper-on-asp-net-core-3-0-via-dependencyinjection-zq497lzsq
            // services.AddAutoMapper(typeof(Startup)); 
            services.AddAutoMapper(typeof(DatingRepository).Assembly);

            services.AddTransient<Seed>();
            // Dependency Injection
            services.AddScoped<IAuthRepository, AuthRepository>(); 
            services.AddScoped<IDatingRepository, DatingRepository>();

            // it interacts with [Authorize] or [AllowAnonymous]...

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
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
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, Seed seeder)
        {
            // NOTE: In AuthContorller, login method, we are rasing excpetion by manual
            // ref: DatingApp.API\Properties\launchSettings.json
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // chaging mode to "production" in DatingApp.API\Properties\launchSettings.json
                // Instead of define try catch block inside each controllers,
                // centralizing error in production mode with simplicity is very important
                app.UseExceptionHandler(builder => {
                    builder.Run(async context => {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null) 
                        {
                            // extension method: To add response header properly and get rid of misleading information such as CORS issue, which does not actually happens
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
                // app.UseHsts();
            }

            // app.UseHttpsRedirection();

            // only when data needs to be initialized for testing purpose
            // seeder.SeedUsers();
            app.UseCors(x => x.WithOrigins("http://localhost:4200")
                .AllowAnyHeader().AllowAnyMethod().AllowCredentials());

            // Token Authentication
            app.UseAuthentication();

            // ref: https://stackoverflow.com/questions/57684093/using-usemvc-to-configure-mvc-is-not-supported-while-using-endpoint-routing
            app.UseMvc();
        }
    }
}
