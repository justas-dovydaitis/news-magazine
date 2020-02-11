// const controller = require('../controllers/post');

module.exports = (router) => {
    router.route('/posts')
        .get()
        .post();

    router.route('/posts/:id')
        .get()
        .put()
        .delete();
};