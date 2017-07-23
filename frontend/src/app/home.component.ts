import { Component } from '@angular/core';

@Component({
  selector: 'home',
  template: `
  <new-message></new-message>
  <messages></messages>
  `,
})
export class HomeComponent  {
  
  constructor(){}
 }
