import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@app/env';
import { DeviceDetectorService, DeviceInfo, DeviceType, OS } from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';
import { TrackingService } from 'src/app/settings/services/tracking.service';
import { CustomPageService } from '../../services/custom-page.service';

@Component({
  selector: 'app-download-app',
  templateUrl: './download-app.component.html',
  styleUrls: ['./download-app.component.scss'],
})
export class DownloadAppComponent implements OnInit {
  translations$ = new BehaviorSubject({
    title: null,
    content: null,
    loading: false,
    error: false,
  });

  userDevice = this.detectDevice();
  applicationIsEmbedded = environment.exportPortalComponent;
  iOSAppStoreLink = 'https://apps.apple.com/no/app/minnesider/id1529239925';
  AndroidGooglePlayStoreLink = 'https://play.google.com/store/apps/details?id=com.adstate.admemoria';

  constructor(
    private route: ActivatedRoute,
    private customPageService: CustomPageService,
    private deviceService: DeviceDetectorService,
    private trackingService: TrackingService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.loadPageData();
    this.redirectMobileDeviceToAppStore();
  }

  detectDevice(): DeviceInfo | undefined {
    const userAgent = window.navigator.userAgent;
    this.deviceService.setDeviceInfo(userAgent);
    return this.deviceService.getDeviceInfo();
  }

  redirectMobileDeviceToAppStore(): void {
    let redirectToAppStore = false;
    let redirectLink = '';

    this.route.queryParams.subscribe((params) => {
      redirectToAppStore = this.userDevice && this.userDevice.deviceType === DeviceType.Mobile;

      // Don't redirect if they have param: "redirect=false"
      if (Object.keys(params).length !== 0 && params.redirect && params.redirect === 'false') {
        return;
      }

      if (this.userDevice.os === OS.IOS) {
        redirectLink = this.iOSAppStoreLink;
        this.trackingService.onTrackDownloadAppPageRedirectForIOS();
      } else if (this.userDevice.os === OS.ANDROID) {
        redirectLink = this.AndroidGooglePlayStoreLink;
        this.trackingService.onTrackDownloadAppPageRedirectForAndroid();
      }

      if (redirectToAppStore && redirectLink.length !== 0 && redirectLink.includes('http')) {
        this.document.location.href = redirectLink;
      }
    });
  }

  loadPageData = (): void => {
    this.translations$.next({
      title: null,
      content: null,
      loading: true,
      error: false,
    });

    try {
      this.customPageService.getPageById('1').subscribe((value) => {
        this.translations$.next(value);
      });
    } catch (error) {
      console.error(error);
      this.translations$.next({
        title: null,
        content: null,
        loading: false,
        error: true,
      });
    }
  }
}
