// Due to https://github.com/zeit/next-plugins/issues/585, this file is temporarily in js format
import hljs from 'highlight.js';

self.addEventListener("message", (event) => {
    let body = event.data;
    let highlightedBody = hljs.highlightAuto(body).value;
    self.postMessage(highlightedBody);
    self.close();
});