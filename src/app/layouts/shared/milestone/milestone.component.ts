import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
export type MileStoneStatus = "PENDING" | 'COMPLETED' | "INPROGRESS" | "";
export interface MileStone {
  value : string,
  label: string,
  icon: string,
  status: MileStoneStatus
}

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})

export class MilestoneComponent implements OnInit {
  @Output() continue = new EventEmitter();
  @Input() public vertical :Boolean = false;
  @Input() public milestones: MileStone[] = [
    
  ]
  constructor() { }

  ngOnInit(): void {
  }

  get getInProgress(){
    return this.milestones && this.milestones.find(stone=>stone.status === 'INPROGRESS' || stone.status == '') 
  }

  onContinue(){
    console.log(this.getInProgress);
    this.continue.next(this.getInProgress);
  }

}
