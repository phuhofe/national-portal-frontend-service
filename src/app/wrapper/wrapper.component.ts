import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class WrapperComponent {
  constructor() {}
}
