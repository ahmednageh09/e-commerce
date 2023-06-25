import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() data:any[]=[];
  @Input() title:string="";
  @Output() selectedValue = new EventEmitter();
  constructor(){}
  detectChange(event:any){
    this.selectedValue.emit(event);
  }
}
