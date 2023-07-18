import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ApplicationSelectors } from './store/application.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @Select(ApplicationSelectors.notFound) notFound$: Observable<boolean>;

  constructor() {}

  ngOnInit(): void {}
}
