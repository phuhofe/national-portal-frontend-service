import { Component, OnInit } from '@angular/core';
import { environment } from '@app/env';

@Component({
  selector: 'app-privacy-policy-page',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyPageComponent implements OnInit {
  constructor() {}

  applicationIsEmbedded = environment.exportPortalComponent;

  ngOnInit(): void {}

  openCookiePopUp(): void {
    const event = new Event('adstate-settings-cookie-pop-up-open');
    document.dispatchEvent(event);
  }

  closeCookiePopUp(): void {
    const event = new Event('adstate-settings-cookie-pop-up-close');
    document.dispatchEvent(event);
  }

  deleteAllCookies(): void {
    const event = new Event('adstate-settings-cookie-pop-up-delete');
    document.dispatchEvent(event);
  }

  cookiePopUpEventListenerStarted(): void {
    // The timeout prevents NG0100: ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.closeCookiePopUp();
    });
  }
}
