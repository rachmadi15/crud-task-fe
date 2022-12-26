import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import taskListModel from './models/taskListModel';
import taskModel from './models/taskModel';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfigService: ApiConfigService) { }

  // to fetch all task lists
  getAllTaskLists(): Observable<taskListModel[]> {
    return this.apiConfigService.get('tasklists');
  }

  // Create a task list bucket
  createTaskList(title: string): Observable<taskListModel>{
    let data = { 'title': title };
    return this.apiConfigService.post('tasklists', data);
  }

  // to fetch all task inside task lists object
  getAllTasksForATaskList(taskListId: string): Observable<taskModel[]>{
    return this.apiConfigService.getTasks(`tasklists/${taskListId}/tasks`);
  }

  // create a task inside a particular task list object
  createTaskInsideATaskList(taskListId: string, title: string){
    let data = { 'title' : title }
    return this.apiConfigService.post(`tasklists/${taskListId}/tasks`, data);
  }

  // delete a task list
  deleteTaskList(taskListId: string): Observable<taskListModel>{
    return this.apiConfigService.delete(`tasklists/${taskListId}`);
  }

  // delete a task inside a particular task list
  deleteTaskInsideATaskList(taskListId: string, taskId: string): Observable<taskModel>{
    return this.apiConfigService.deleteTask(`tasklists/${taskListId}/tasks/${taskId}`);
  }

  // update the status of a task
  updateTaskStatus(taskListId: string, taskObject: taskModel){
    let updateData = { completed: !taskObject.completed };
    return this.apiConfigService.put(`tasklists/${taskListId}/tasks/${taskObject._id}`, updateData);
  }
}
