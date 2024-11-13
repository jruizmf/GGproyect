import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { DatePipe, NgFor } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [DragDropModule, NgFor, MatCardModule, DatePipe,MatIconModule, MaterialModule],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanBoardComponent {

  constructor() { }
  board: Board = new Board('Test Board', [
    new Column('Waiting', [
      "Some random idea",
      "This is another random idea",
      "build an awesome application"
    ]),
    new Column('In Process', [
      "Lorem ipsum",
      "foo",
      "This was in the 'Research' column"
    ]),
    new Column('Shipping', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ])
    
  ]);

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


}
