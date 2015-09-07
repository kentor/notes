import jsdom from 'jsdom';

export function jsdomReact(markup = '<html><body></body></html>') {
  if (typeof document !== 'undefined') {
    return;
  }
  global.document = jsdom.jsdom(markup);
  global.navigator = { userAgent: 'node.js' };
  global.window = document.parentWindow;
}
