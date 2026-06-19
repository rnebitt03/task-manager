using Microsoft.AspNetCore.Mvc;
using TaskManager.API.DTOs;
using TaskManager.API.Models;
using TaskManager.API.Services.Interfaces;


namespace TaskManger.API.Controllers;

[ApiController]
[Route("api/[controller]")]

// All methods are async to avoid blocking the server while waiting on service to wait on database operations
// This allows the server to handle other requests while waiting for the database to respond
public class TaskController : ControllerBase
{
    //Private variable that cant be changed for the injected service layer
    private readonly ITaskService _taskService;
    //Private variable that cant be changed for logging
    private readonly ILogger<TaskController> _logger;

    //Constructor containing dependency injection for the service layer, and the logger
    public TaskController(ITaskService taskService, ILogger<TaskController> logger)
    {    
        _taskService = taskService;
        _logger = logger;
    }


    //GET /api/task
    [HttpGet]
    //Returns a list of tasks or a error response
    public async Task<ActionResult<IEnumerable<TaskItem>>> GetAllTasks()
    {
        try
        {   
            //Calls service to fetch all tasks from the db
            var tasks = await _taskService.GetAllTasksAsync();
            //Returns 200 response with the list of tasks
            return Ok(tasks);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retreiving tasks");
            return StatusCode(500, new { error = "Failed to retrieve tasks"});
        }
    }

    //GET /api/task/{id}
    [HttpGet("{id}")]
    //Returns task with matching id, or sends a error response
    public async Task<ActionResult<TaskItem>> GetTask(int id)
    {
        try
        {   
            //Calls service to find task with matching id
            var task = await _taskService.GetTaskByIdAsync(id);
            //Returns error message if task was not found
            if (task == null)
                return NotFound(new { error = $"Task with if {id} not found" });
            //Returns 200 response and the found task
            return Ok(task);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving task {Id}", id);
            return StatusCode(500, new { error = "Failed to retrieve task"});
        }
    }

    //POST /api/task
    [HttpPost]
    //Reads request body and deserialize it into dto object
    //Returns Created task or error response
    public async Task<ActionResult<TaskItem>> CreateTask([FromBody] CreateTaskDto dto)
    {
        try
        {   
            //Checks if Title is empty string or a bunch of spaces, returns error message if true
            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest(new { error = "Title is required" });
            //Calls service to create new task and passes dto
            //Returns 201 created response, location header, and the created task
            var task = await _taskService.CreateTaskAsync(dto);
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating task");
            return StatusCode(500, new { error = "Failed to create task" });
        }
    }

    //PUT /api/task/{id}
    [HttpPut("{id}")]
    //Takes in task id and reads request body and deserialize it into dto object
    //Returns Updated task or error response
    public async Task<ActionResult<TaskItem>> UpdateTask(int id, [FromBody] UpdateTaskDto dto)
    {
        try
        {   
            //Checks if Title is empty or contains a bunch of spaces, returns error message if true
            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest(new { error = "Title is required" });

            //Passes id and dto to service to update task
            var task = await _taskService.UpdateTaskAsync(id, dto);
            //Returns error message if task was not found
            if (task == null)
                return NotFound(new { error = $"Task with id {id} not found" });
            //Returns 200 response and the updated task
            return Ok(task);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating task {Id}", id);
            return StatusCode(500, new { error = "Failed to update task" });
        }
    }

    //DELETE /api/task/{id}
    [HttpDelete("{id}")]
    //Returns only a status code
    public async Task<ActionResult> DeleteTask(int id)
    {
        try
        {   
            //Passes task id to service to delete task
            var result = await _taskService.DeleteTaskAsync(id);
            //If no task was found returns error message
            if (!result)
                return NotFound(new { error = $"Task with id {id} not found" });
            //Returns 204 for a successful delete
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting task {Id}", id);
            return StatusCode(500, new { error = "Failed to delete task" });
        }
    }
}