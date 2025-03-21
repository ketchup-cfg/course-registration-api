using Microsoft.EntityFrameworkCore;
using CourseRegistration.Api.Data;
using CourseRegistration.Api.Services;
using CourseRegistration.Api.Services.Abstractions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<CourseRegistrationContext>(opt =>
    opt.UseInMemoryDatabase("CourseRegistration"));
builder.Services.AddScoped<ICourseService, CourseService>();

var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();

app.Run();