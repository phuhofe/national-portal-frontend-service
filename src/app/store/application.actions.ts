// tslint:disable-next-line: no-namespace
export namespace ApplicationActions {
  export class NotFound {
    static readonly type = '[Application] Not found';
    constructor(public notFound: boolean) {}
  }

  export class AddReadyLanguage {
    static readonly type = '[Application] AddReadyLanguage';
    constructor(public readyLanguage: string) {}
  }

  export class SetCurrentReadyLanguage {
    static readonly type = '[Application] SetCurrentReadyLanguage';
    constructor(public readyLanguage: string) {}
  }
}
