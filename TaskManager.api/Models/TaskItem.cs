namespace TaskManager.API.Models;

// Database model 
public class TaskItem
{
    // Primary key, auto incremented by Entity Framework
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsCompleted { get; set; } = false;
     public int Priority { get; set;} = 2;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 
    public DateTime? UpdatedAt { get; set; }
    public DateTime? CompletedAt { get; set; }

}