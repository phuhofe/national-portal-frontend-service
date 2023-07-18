import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ApplicationActions } from '../store/application.actions';

export interface ApplicationStateModel {
  notFound: boolean;
  readyLanguages: Set<string>;
  currentReadyLanguage: string;
}

@State({
  name: 'application',
  defaults: {
    notFound: undefined,
    readyLanguages: new Set(),
    currentReadyLanguage: null,
  },
})
@Injectable()
export class ApplicationState {
  constructor() {}

  @Action(ApplicationActions.NotFound)
  notFound(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.NotFound): void {
    ctx.patchState({
      notFound: action.notFound,
    });
  }

  @Action(ApplicationActions.AddReadyLanguage)
  addReadyLanguage(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.AddReadyLanguage): void {
    const { readyLanguages } = ctx.getState();

    if (!readyLanguages.has(action.readyLanguage)) {
      readyLanguages.add(action.readyLanguage);
      ctx.patchState({
        readyLanguages,
      });
    }
  }

  @Action(ApplicationActions.SetCurrentReadyLanguage)
  setCurrentReadyLanguage(ctx: StateContext<ApplicationStateModel>, action: ApplicationActions.SetCurrentReadyLanguage): void {
    const { readyLanguages, currentReadyLanguage } = ctx.getState();

    if (readyLanguages.has(action.readyLanguage) && currentReadyLanguage !== action.readyLanguage) {
      ctx.patchState({
        currentReadyLanguage: action.readyLanguage,
      });
    }
  }
}
