import { Component, OnInit } from '@angular/core';
import { environment } from '@app/env';

@Component({
  selector: 'adstate-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {
  applicationIsEmbedded = environment.exportPortalComponent;
  color = '#f9f9fa';

  constructor() {}

  ngOnInit(): void {}
}
