import { JSDOM } from 'jsdom';
import Sinon from 'sinon';

const { window } = new JSDOM('<main id="app"></main>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.XMLHttpRequest = Sinon.useFakeXMLHttpRequest();
