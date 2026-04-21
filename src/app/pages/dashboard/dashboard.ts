import { Component } from "@angular/core";
import { AddTaskForm } from "../../components/addTaskForm/addTaskForm";
import { TaskList } from "../TaskList/TaskList";
import { CarouselComponent } from "./carousel.component";
import type { ITask } from "../TaskCard/TaskCard";

@Component({
  selector: "app-dashboard",
  standalone: true,
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
  imports: [AddTaskForm, TaskList, CarouselComponent]
})
export class Dashboard {
  taskToAdd: ITask | null = null;

  onAddTask(task: ITask) {
    this.taskToAdd = { ...task, status: 'in-progress' };
  }
}
