import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import taskListModel from 'src/app/models/taskListModel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task-list-screen',
  templateUrl: './new-task-list-screen.component.html',
  styleUrls: ['./new-task-list-screen.component.scss']
})
export class NewTaskListScreenComponent {

  constructor(private router: Router, private taskService: TaskService) {}

  addNewTaskList(title: string){
    if(title){
      this.taskService.createTaskList(title).subscribe(
        (newCreatedTaskList: taskListModel) => {
          this.router.navigate(['/task-list', {taskListId: newCreatedTaskList._id}]);
        }
      );
    } else {
      alert("Tittle cannot be empty");
      return;
    }
  }

}
