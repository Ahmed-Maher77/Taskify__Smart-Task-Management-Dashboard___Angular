import { Component } from '@angular/core';
import { TaskList } from '../../components/TaskList/TaskList';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  templateUrl: './my-tasks.html',
  styleUrl: './my-tasks.css',
  imports: [TaskList],
})
export class MyTasks {}
