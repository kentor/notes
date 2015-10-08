import jsdom from 'jsdom';

global.document = jsdom.jsdom();
global.navigator = { userAgent: 'node.js' };
global.window = document.defaultView;

require('react');
