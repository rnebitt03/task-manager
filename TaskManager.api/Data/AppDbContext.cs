using Microsoft.EntityFrameworkCore;
using TaskManager.API.Models;

namespace TaskManager.API.Data;

public class AppDbContext : DbContext
{

    // SQLite connection options via dependecy injection
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // Task table in database
    public DbSet<TaskItem> Tasks { get; set; }
}