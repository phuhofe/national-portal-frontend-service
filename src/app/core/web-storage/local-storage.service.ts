export class LocalStorageService {
  setItem(key: string, val: any): void {
    let newKey = '';
    key.split(/[.\-_]/).forEach((k, i: number) => {
      if (i > 0) {
        return newKey = newKey + '-' + k.split(/(?=[A-Z])/).join('-').toLowerCase();
      }
      return newKey = newKey + k.split(/(?=[A-Z])/).join('-').toLowerCase();
    });

    localStorage.setItem(newKey, val);
  }
}
