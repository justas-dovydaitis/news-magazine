const Category = require('../models/category').model;
const Post = require('../models/post').model;

const InternalError = {
    '_message': 'Database error',
    'message': 'Database error',
    'name': 'Internal server error'
};
module.exports = {
    create: (req, res) => {
        Category.create(req.body)
            .then((category) => {
                res.status(201).json(category);
            })
            .catch((errors) => {
                if (errors)
                    res.status(400).json(errors);
                else res.status(500).json({
                    errors: InternalError
                });
            });
    },
    read: (req, res) => {
        Category.findById(req.params.categoryId)
            .then((category) => {
                if (!category)
                    res.status(404).json({ errors: 'Not found' });
                else
                    res.status(200).json(category);
            })
            .catch((errors) => {
                if (errors)
                    res.status(400).json(errors);
                else
                    res.status(500).json({
                        errors: InternalError
                    });
            });
    },
    update: (req, res) => {
        Category.findByIdAndUpdate(req.params.categoryId)
            .then((category) => {
                if (!category)
                    res.status(404).json({ errors: 'Not found' });
                else
                    res.status(200).json(category);
            })
            .catch((errors) => {
                if (errors)
                    res.status(400).json(errors);
                else res.status(500).json({
                    errors: InternalError
                });
            });
    },
    delete: (req, res) => {
        Category.findByIdAndDelete(req.params.categoryId)
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
    list: (req, res) => {
        Category.find({})
            .then((categories) => {
                res.status(200).json(categories);
            })
            .catch((errors) => {
                res.status(500).json({ errors });
            });
    },
    postsList: (req, res) => {
        Post.find({ categories: req.params.categoryId })
            .then((posts) => {
                if (!posts)
                    res.status(404).json({ error: 'Not found' });
                else
                    res.status(200).json(posts);
            })
            .catch((errors) => {
                res.status(400).json(errors);
            });
    }
};