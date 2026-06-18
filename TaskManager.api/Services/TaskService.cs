using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using TaskManager.API.Data;
using TaskManager.API.DTOs;
using TaskManager.API.Models;
using TaskManager.API.Services.Interfaces;

namespace TaskManager.API.Services;

public class TaskService : ITaskService
{
    private readonly AppDbContext _context;

    public TaskService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TaskItem>> GetAllTasksAsync()
    {
        return await _context.Tasks.ToListAsync();
    }

    public async Task<TaskItem?> GetTaskByIdAsync(int id)
    {
        return await _context.Tasks.FindAsync(id);
    }

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

    public async Task<bool> DeleteTaskAsync(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return false;

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return true;
    }
}