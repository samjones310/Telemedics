const config: any = {
  localBackendUrl: 'http://localhost:3000/api',
  devBackendUrl: 'https://mtx-brc-backend-dev-dot-mtx-brc-dev.appspot.com/api',
  demoBackendUrl:
    'https://lne-demo-backend-dot-first-skein-256008.appspot.com/api'
};

config.backendUrl =
  window.location.href.indexOf('appspot') === -1
    ? config.localBackendUrl
    : window.location.href.indexOf('demo') > -1
    ? config.demoBackendUrl
    : config.devBackendUrl;

console.log('Current Frontend Url: ' + window.location.href);
console.log('Using Backend Url: ' + config.backendUrl);

export default config;
