const path = require('path');

module.exports = {
    spec: [path.join(__dirname, '/test/**/*.spec.js')],
    timeout: 5_000,
};