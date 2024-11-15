import { Component } from '@angular/core';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { KanbanComponent } from '@syncfusion/ej2-angular-kanban';
import { KanbanBoardComponent } from 'src/app/pages/kanban/kanban.component';

@Component({
  selector: 'app-kanban-modal',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, KanbanBoardComponent, MatDialogModule ],
  templateUrl: './kanban-modal.component.html',
  styleUrl: './kanban-modal.component.scss'
})
export class KanbanModalComponent {

}
