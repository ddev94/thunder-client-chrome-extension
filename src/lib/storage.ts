export class storage {
  static get(key: string) {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  static set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: string) {
    window.localStorage.removeItem(key);
  }
}
