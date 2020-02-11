const posts = require('./posts');
const categories = require('./categories');
module.exports = (router) => {
    posts(router);
    categories(router);
    return router;
};