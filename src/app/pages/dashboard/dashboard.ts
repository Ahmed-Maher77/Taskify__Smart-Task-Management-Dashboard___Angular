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
  tasks: ITask[] = [
    {
      title: 'Prepare sprint planning notes',
      description:
        "Compile backlog priorities and dependencies before tomorrow's planning meeting.",
      priority: 'High',
      category: 'Work',
      dueDate: 'Due: Apr 16',
      status: 'in-progress',
    },
    {
      title: 'Update portfolio case study',
      description: 'Refine project screenshots and add measurable results from the latest release.',
      priority: 'Medium',
      category: 'Personal',
      dueDate: 'Due: Apr 20',
      status: 'in-progress',
    },
    {
      title: 'Review Angular standalone APIs',
      description: 'Read migration notes and summarize recommended patterns for upcoming tasks.',
      priority: 'Low',
      category: 'Study',
      dueDate: 'Due: Apr 21',
      status: 'in-progress',
    }
  ];

  onAddTask(task: ITask) {
    this.tasks = [{ ...task, status: 'in-progress' }, ...this.tasks];
  }

  onDeleteTask(taskIndex: number) {
    this.tasks = this.tasks.filter((_, index) => index !== taskIndex);
  }

  onUpdateTask(taskIndex: number) {
    const currentTask = this.tasks[taskIndex];
    if (!currentTask) return;

    const updatedTitle = window.prompt('Update task title', currentTask.title);
    if (!updatedTitle?.trim()) return;

    this.tasks = this.tasks.map((task, index) =>
      index === taskIndex ? { ...task, title: updatedTitle.trim() } : task
    );
  }

  onCompleteTask(taskIndex: number) {
    this.tasks = this.tasks.map((task, index) =>
      index === taskIndex
        ? { ...task, status: task.status === 'done' ? 'in-progress' : 'done' }
        : task
    );
  }
}
