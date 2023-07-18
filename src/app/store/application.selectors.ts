import { Selector } from '@ngxs/store';
import { ApplicationState, ApplicationStateModel } from './application.state';

export class ApplicationSelectors extends ApplicationState {
  @Selector()
  static notFound(state: ApplicationStateModel): boolean {
    return state.notFound;
  }

  @Selector()
  static readyLanguages(state: ApplicationStateModel): ApplicationStateModel['readyLanguages'] {
    return state.readyLanguages;
  }

  @Selector()
  static currentReadyLanguage(state: ApplicationStateModel): ApplicationStateModel['currentReadyLanguage'] {
    return state.currentReadyLanguage;
  }
}
