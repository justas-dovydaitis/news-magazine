const controller = require('../controllers/file');

module.exports = (router) => {
    router.route('/files/')
        .post(controller.create);
    router.route('/files/:fileId/')
        .get(controller.read)
        .delete(controller.delete);
};