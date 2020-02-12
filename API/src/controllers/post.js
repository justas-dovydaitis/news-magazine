const Post = require('../models/post').model;
// const Category = require('../models/category').model;
const InternalError = {
    '_message': 'Database error',
    'message': 'Database error',
    'name': 'Internal server error'
};
module.exports = {
    // POST /posts/:postId/
    create: (req, res) => {
        Post.create(req.body)
            .then((post) => {
                res.status(201).json(post);
            })
            .catch((errors) => {
                if (errors)
                    res.status(400).json(errors);
                else res.status(500).json({
                    errors: InternalError
                });
            });
    },
    // GET /posts/:postId/
    get: (req, res) => {
        Post.findById(req.params.postId)
            .populate('categories')
            .then((post) => {
                if (!post)
                    res.status(404).json({ errors: 'Not found' });
                else
                    res.status(200).json(post);
            })
            .catch((errors) => {
                if (errors)
                    res.status(400).json(errors);
                else res.status(500).json({
                    errors: InternalError
                });
            });
    },
    // PUT /posts/:postId/
    update: (req, res) => {
        Post.findByIdAndUpdate(req.params.postId)
            .then((post) => {
                if (!post)
                    res.status(404).json({ errors: 'Not found' });
                else
                    res.status(200).json(post);
            })
            .catch((errors) => {
                if (errors)
                    res.status(400).json(errors);
                else res.status(500).json({
                    errors: InternalError
                });
            });
    },
    // DELETE /posts/:postId/
    delete: (req, res) => {
        Post.findByIdAndDelete(req.params.postId)
            .then(() => {
                res.status(204).json({});
            })
            .catch((errors) => {
                if (errors)
                    res.status(400).json(errors);
                else res.status(500).json({
                    errors: InternalError
                });
            });
    },
    // GET /posts/
    list: (req, res) => {
        Post.find({})
            .sort({ created: -1 })
            .populate('categories')
            .then((posts) => {
                res.status(200).json(posts);
            })
            .catch((errors) => {
                res.status(500).json({ errors });
            });
    },
    // GET /posts/:postId/categories/
    getCategories: (req, res) => {
        Post.findById(req.params.postId)
            .populate('categories')
            .then((post) => {
                if (!post)
                    res.status(304).json({ errors: 'Post not found' });
                else
                    res.status(200).json(post.categories);
            });
    },
    // POST /posts/:postId/categories/
    // addCategories: (req, res) => {},

    // DELETE /posts/:postId/categories/:categoryId
    // deleteCategory: (req, res) => {},

};