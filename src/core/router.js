// src/core/router.js
export class HashRouter {
  constructor(container) {
    this.container = container;
    this.routes = {};
    this.currentRoute = '';
    this.params = {};
    this.onHashChange = this.onHashChange.bind(this);
    window.addEventListener('hashchange', this.onHashChange);
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  start() {
    this.onHashChange();
  }

  onHashChange() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, queryString] = hash.split('?');
    const params = {};
    if (queryString) {
      queryString.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        params[key] = decodeURIComponent(value || '');
      });
    }
    this.params = params;
    this.currentRoute = path;

    const handler = this.routes[path];
    if (handler) {
      handler(this.container, this.params);
    } else {
      this.container.innerHTML = '<h1>404 — Страница не найдена</h1>';
    }
  }

  navigate(path, params = {}) {
    const queryString = Object.keys(params).length > 0
      ? '?' + Object.entries(params).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')
      : '';
    window.location.hash = path + queryString;
  }
}