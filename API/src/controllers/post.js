const Post = require('../models/post').model;
const upload = require('../../multer').upload;

const InternalError = {
    '_message': 'Database error',
    'message': 'Database error',
    'name': 'Internal server error'
};
module.exports = {
    // POST /posts/:postId/
    create: (req, res) => {
        const requestBody = req.body;
        upload(req, res, errors => {
            console.log(requestBody, req.body);
            if (errors) {
                return res.status(400).json({ errors: 'Error uploading file.' });
            }
            Post.create({...requestBody, imageUrl: '/uploads/' + req.file.filename, categories: requestBody.categories.split(',') })
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
        let result = {};
        Post.find({})
            .sort({ created: -1 })
            .limit(10)
            .populate('categories')
            .then((latestPosts) => {
                result.latest = latestPosts;
                Post.find({ featured: true })
                    .limit(4)
                    .sort({ created: -1 })
                    .populate('categories')
                    .then((featuredPosts) => {
                        result.featured = featuredPosts;
                        Post.find({})
                            // .sample(4)
                            .skip(10 * (req.query.page - 1))
                            .limit(10)
                            .populate('categories')
                            .then((allPosts) => {
                                result.allPosts = allPosts;
                                res.status(200).json(result);
                            })
                            .catch((errors) => {
                                res.status(500).json({ errors });
                            });
                    })
                    .catch((errors) => {
                        res.status(500).json({ errors });
                    });
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
};