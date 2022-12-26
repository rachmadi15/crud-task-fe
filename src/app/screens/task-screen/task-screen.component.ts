import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import taskListModel from 'src/app/models/taskListModel';
import taskModel from 'src/app/models/taskModel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.scss']
})
export class TaskScreenComponent {
  taskLists: taskListModel[] = [];
  tasks: taskModel[] = [];
  taskListId: string = '';
  
  constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.taskService.getAllTaskLists().subscribe(allTaskLists=> this.taskLists = allTaskLists);
    this.activatedRoute.params.subscribe(params => {
      this.taskListId = params['taskListId'];
      if(this.taskListId){
        this.taskService.getAllTasksForATaskList(this.taskListId).subscribe(
          (tasks: taskModel[]) => this.tasks = tasks
        );
      }
    });
  }

  taskClicked(item: taskModel) {
    console.log(item);
    this.taskService.updateTaskStatus(this.taskListId, item).subscribe(() => item.completed = !item.completed)
  }

  deleteTask(item: taskModel) {
    this.taskService.deleteTaskInsideATaskList(this.taskListId, item._id).subscribe(
      (itemDeleted: taskModel) => {
        this.tasks = this.tasks.filter(t => t._id != itemDeleted._id);
      }
    );
  }

  deleteTaskList(item: taskListModel){
    this.taskService.deleteTaskList(this.taskListId).subscribe(
      (itemDeleted: taskListModel) => {
        this.taskLists = this.taskLists.filter(t => t._id != itemDeleted._id);
      }
    )
  }

  addNewTask(){
    if(this.taskListId){
      // route the user to add task screen for the selected task list
      this.router.navigate(['./new-task'], { relativeTo: this.activatedRoute })
    } else {
      alert("Please select a task list!");
      return;
    }
  }

}
