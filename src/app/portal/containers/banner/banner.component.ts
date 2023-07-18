import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SettingsSelectors } from 'src/app/settings/store/settings.selectors';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  @Select(SettingsSelectors.themeMediaSettings) themeMedia$: Observable<any>;
  bannerUrl: string;

  constructor() {}

  ngOnInit(): void {
    this.themeMedia$.subscribe((themeMedia) => {
      this.bannerUrl = themeMedia?.value?.banner?.imageUrl;
    });
  }
}
