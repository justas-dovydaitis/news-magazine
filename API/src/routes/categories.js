const controller = require('../controllers/category');

module.exports = (router) => {
    router.route('/categories/')
        .get(controller.list)
        .post(controller.create);

    router.route('/categories/:categoryId/')
        .get(controller.read)
        .put(controller.update)
        .delete(controller.delete);
    router.route('/categories/:categoryId/posts/')
        .get(controller.postsList);
};