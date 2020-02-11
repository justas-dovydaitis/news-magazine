const controller = require('../controllers/post');

module.exports = (router) => {
    router.route('/posts')
        .get(controller.list)
        .post(controller.create);
    router.route('/posts/:postId')
        .get(controller.get)
        .put(controller.update)
        .delete(controller.delete);
    router.route('/posts/:postId/categories')
        .get(controller.getCategories);
    // .post(controller.addCategories);
    // router.route('/posts/:postId/categories/categoryId')
    //     .delete(controller.deleteCategory);
};