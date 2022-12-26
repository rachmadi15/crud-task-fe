import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task-screen',
  templateUrl: './new-task-screen.component.html',
  styleUrls: ['./new-task-screen.component.scss']
})
export class NewTaskScreenComponent {

  taskListId: string = '';
  constructor(private router: Router, private taskService: TaskService, private activedRoute: ActivatedRoute) {
    this.activedRoute.params.subscribe(params => {
      this.taskListId = params['taskListId'];
    }
  );
  }

  addNewTask(title: string){
    if(title){
      this.taskService.createTaskInsideATaskList(this.taskListId, title).subscribe(
        (() => {
          this.router.navigate(['../'], { relativeTo: this.activedRoute })
        })
      )

    } else {
      alert("Tittle cannot be empty");
      return;
    }
  }
}
