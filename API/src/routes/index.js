const posts = require('./posts');
module.exports = (router) => {
    posts(router);
    return router;
};