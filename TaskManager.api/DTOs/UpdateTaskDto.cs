namespace TaskManager.API.DTOs;

//Defines data accepted from user when updating a task
//Prevents user from updating id, or any timestamps
//Permits user to update Title, Description, if the task is completed, and Priority
public class UpdateTaskDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
    public int Priority { get; set; } = 2;

}