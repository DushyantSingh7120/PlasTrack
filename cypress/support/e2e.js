const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML = `
    .reporter-wrap { display: none !important; }
    .runner { display: none !important; }
    .size-container { width: 100% !important; max-width: 100% !important; height: 100% !important; max-height: 100% !important; padding: 0 !important; margin: 0 !important; }
    .container { width: 100% !important; height: 100% !important; }
    iframe.aut-iframe { width: 100% !important; height: 100% !important; background: white; }
  `;
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}
