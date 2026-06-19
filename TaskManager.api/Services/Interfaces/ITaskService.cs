using TaskManager.API.DTOs;
using TaskManager.API.Models;

namespace TaskManager.API.Services.Interfaces;

//Contract for task operations
//Interface allows implementation to be swapped out without changing controller
public interface ITaskService
{
    //Returns a list of TaskItems
    Task<IEnumerable<TaskItem>> GetAllTasksAsync();
    
    //Returns a single TaskItem, can be nullable
    Task<TaskItem?> GetTaskByIdAsync(int id);

    //Takes in a CreateTaskDto and returns a created TaskItem
    Task<TaskItem> CreateTaskAsync(CreateTaskDto dto);

    //Takes in a item id and UpdateTaskDto and returns updated task item
    //Can be nullable
    Task<TaskItem?> UpdateTaskAsync(int id, UpdateTaskDto dto);

    Task<bool> DeleteTaskAsync(int id);
}

