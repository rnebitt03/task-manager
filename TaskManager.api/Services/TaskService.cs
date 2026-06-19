using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using TaskManager.API.Data;
using TaskManager.API.DTOs;
using TaskManager.API.Models;
using TaskManager.API.Services.Interfaces;

namespace TaskManager.API.Services;

// All methods are async to avoid blocking the server while waiting on database operations
// This allows the server to handle other requests while waiting for the database to respond

public class TaskService : ITaskService
{
    //private variable that cant be changed for the db connection
    private readonly AppDbContext _context;

    //Constructor that takes the db dependency injection and stors it in the private variable.
    public TaskService(AppDbContext context)
    {
        _context = context;
    }

    //Returns the list of all tasks in the table
    public async Task<IEnumerable<TaskItem>> GetAllTasksAsync()
    {
        return await _context.Tasks.ToListAsync();
    }

    //Search for task in table by primary key id
    public async Task<TaskItem?> GetTaskByIdAsync(int id)
    {
        return await _context.Tasks.FindAsync(id);
    }

    //Creates and adds new TaskItem in table from the DTO, returns the new task with id and timestamps
    public async Task<TaskItem> CreateTaskAsync(CreateTaskDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            Priority = dto.Priority
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return task;
    }

    //Finds task in table, then updates the field based on the dto, then sets UpdatedAt and handles CompletedAt logic.
    //If tasked is marked complete it sets CompletedAt to now, if not marked complete it clears CompletedAt to null
    public async Task<TaskItem?> UpdateTaskAsync(int id, UpdateTaskDto dto)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return null;

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.IsCompleted = dto.IsCompleted;
        task.Priority = dto.Priority;
        task.UpdatedAt = DateTime.UtcNow;

        if (dto.IsCompleted && task.CompletedAt == null)
        {
            task.CompletedAt = DateTime.UtcNow;
        }
        else if (!dto.IsCompleted)
        {
            task.CompletedAt = null;
        }

        await _context.SaveChangesAsync();
        return task;
    }

    //Finds task in table and removes it, returns true if task is removed, returns false if task is not found
    public async Task<bool> DeleteTaskAsync(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return false;

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return true;
    }
}