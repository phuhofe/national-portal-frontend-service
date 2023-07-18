import { Component, Input, OnInit } from '@angular/core';
import { DeviceDetectorService, DeviceInfo, DeviceType, OS } from 'ngx-device-detector';

@Component({
  selector: 'app-download-actions',
  templateUrl: './download-actions.component.html',
  styleUrls: ['./download-actions.component.scss'],
})
export class DownloadActionsComponent implements OnInit {
  @Input() hideOnMobile = false;

  userDevice = this.detectDevice();
  storeButtons = [
    {
      url: '/app',
      srcImg:
        'https://img.adstate.com/3ZLgP8r2QlgQCW884-vu47_39D-Ak69nhfNe5VR-zQw/rs:fit:0:0:1/czM6Ly9qYXZhLWh1dC1pbWdwcm94eS8vYWRtZW1vcmlhLXJlc291cmNlcy9kb3dubG9hZC1iYWRnZXMvZW4tYXBwbGUtYXBwLXN0b3JlLWRvd25sb2FkLWJhZGdlLnN2Zw.svg',
      altImg: 'Apple App Store badge',
      os: OS.IOS,
    },
    {
      url: '/app',
      srcImg:
        'https://img.adstate.com/HG38_EFRzGzc01FvNAyzVLlW9oZyT8HZJwR_k33EAAQ/rs:fill:1568:480:1/czM6Ly9qYXZhLWh1dC1pbWdwcm94eS9zbS11cGxvYWRzL2IyL2UzZjJkYTA4ZDE0YWM2ODEyNGJmMDkwMWU3YTMxZS9lbi1nb29nbGUtcGxheS1zdG9yZS1kb3dubG9hZC1iYWRnZS5zdmc.svg',
      altImg: 'Google Play Store badge',
      os: OS.ANDROID,
    },
  ];

  constructor(private deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
    if (this.userDevice && this.userDevice.deviceType === DeviceType.Mobile) {
      this.storeButtons = this.storeButtons.filter((item) => item.os === this.userDevice.os);
    }
  }

  detectDevice(): DeviceInfo | undefined {
    const userAgent = window.navigator.userAgent;
    this.deviceService.setDeviceInfo(userAgent);
    return this.deviceService.getDeviceInfo();
  }
}
