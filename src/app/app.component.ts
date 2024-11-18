import { Component, forwardRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { KanbanBoardComponent } from './pages/kanban/kanban.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DragDropModule,forwardRef(() =>KanbanBoardComponent)],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'GGolf';
}
