import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SettingsSelectors } from 'src/app/settings/store/settings.selectors';
import { TranslocoService } from '@ngneat/transloco';
import { Footer } from '@app/core/interface/footer.interface';
import { ApplicationSelectors } from 'src/app/store/application.selectors';
import { ApplicationStateModel } from 'src/app/store/application.state';
import { Destroyable, DestroyableComponent, takeUntilDestroyed } from '@app/core/destroyable';
import { environment } from '@app/env';
import { EnvironmentName } from '@app/core/enums/environment-name.enum';
import { NationalPortalCompanyName } from '@app/config';

@Destroyable()
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent extends DestroyableComponent implements OnInit {
  @Select(SettingsSelectors.portalSettingsFooter) portalSettingsFooter$: Observable<any>;
  @Select(ApplicationSelectors.currentReadyLanguage) currentReadyLanguage$: Observable<ApplicationStateModel['currentReadyLanguage']>;
  @Select(SettingsSelectors.companySlug) companySlug$: Observable<any>;

  portalSettingsFooter = null;
  footerProps = null;
  showFooter = false;

  isDevEnvironment = environment.name === EnvironmentName.DEVELOPMENT || environment.name === EnvironmentName.LOCAL;
  nationalPortalCompanyName = NationalPortalCompanyName;

  constructor(private translateService: TranslocoService) {
    super();
  }

  ngOnInit(): void {
    this.setupPortalSettings();
  }

  private setupPortalSettings(): void {
    this.currentReadyLanguage$.pipe(
      takeUntilDestroyed(this.componentDestroyed$)
    ).subscribe((currentReadyLanguage) => {
      if (currentReadyLanguage) {
        const translate = (original: Footer): Footer => {
          const translatedFooterProps = {
            ...original,
            description: this.translateService.translate(original.description),
            menu: original.menu.map((menuItem) => {
              return {
                ...menuItem,
                text: this.translateService.translate(menuItem.text),
              };
            }),
            copyright: `${this.translateService.translate(original.copyright)} © ${new Date().getFullYear()} - Adstate AS`,
            menuHeading: this.translateService.translate(original.menuHeading),
          };

          if (original.descriptionLink && Object.keys(original.descriptionLink).length) {
            translatedFooterProps.descriptionLink = {
              ...original.descriptionLink,
              text: this.translateService.translate(original.descriptionLink.text),
            };
          }

          return translatedFooterProps;
        };

        if (this.portalSettingsFooter) {
          this.footerProps = translate(this.portalSettingsFooter);
          this.updateFooterVisibility();
        }

        this.portalSettingsFooter$.subscribe((portalSettingsFooter) => {
          if (portalSettingsFooter) {
            this.portalSettingsFooter = portalSettingsFooter;
            this.footerProps = translate(portalSettingsFooter);
            this.updateFooterVisibility();
          }
        });
      }
    });
  }

  private updateFooterVisibility(): void {
    if (
      !this.portalSettingsFooter.logo &&
      !this.portalSettingsFooter.description &&
      !this.portalSettingsFooter.descriptionLink &&
      !this.portalSettingsFooter.copyright &&
      !this.portalSettingsFooter.menuHeading &&
      this.portalSettingsFooter.menu.length === 0
    ) {
      this.showFooter = false;
    } else {
      this.showFooter = true;
    }
  }
}
