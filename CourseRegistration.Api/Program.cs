using Microsoft.EntityFrameworkCore;
using CourseRegistration.Api.Data;
using CourseRegistration.Api.Services;
using CourseRegistration.Api.Services.Abstractions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<CourseRegistrationContext>(opt =>
    opt.UseInMemoryDatabase("CourseRegistration"));

builder.Services.AddScoped<ICourseService, CourseService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();