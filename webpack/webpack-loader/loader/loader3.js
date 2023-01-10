const { getOptions } = require('loader-utils');

module.exports = function (content) {
    console.log('content 33');
    const opts = getOptions(this);
    console.log(33, opts);
    return content;
}