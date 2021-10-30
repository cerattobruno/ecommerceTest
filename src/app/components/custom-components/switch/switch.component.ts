import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input () name: any = ''
  @Output () respuesta: EventEmitter<boolean> = new EventEmitter()
  
  public value: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  changeState(){
    this.value = !this.value
    this.respuesta.emit(this.value)
  }

}
