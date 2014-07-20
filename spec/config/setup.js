if (typeof process !== 'undefined') {
    setupForNode();
} else {
    setupForBrowser();
}

function setupForNode() {
    // We are in node. Require modules.
    expect = require('chai').expect;
    isBrowser = false;
}

function setupForBrowser() {
    // We are in the browser. Set up variables like above using served js files.
    expect = chai.expect;
    // num and sinon already exported globally in the browser.
    isBrowser = true;
}