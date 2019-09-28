const app = require('./app');
require('./database');

async function init() {
    await app.listen(5000);
    console.log('server on port 5000');
}

init();