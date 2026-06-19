namespace TaskManager.API.DTOs;

// Defines data accepted from user when creating a task
// Prevents user from setting id, CreatedAt, or CompletedAt
// User is permitted to set Title, Description, and Priority for a Task
public class CreateTaskDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public int Priority { get; set; } = 2;

}