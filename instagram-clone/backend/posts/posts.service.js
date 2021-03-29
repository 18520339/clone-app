import Posts from './posts.model.js';

export const getPosts = (req, res) => {
    return Posts.find()
        .then(posts => {
            posts.sort((a, b) => a.timestamp - b.timestamp);
            res.status(200).json(posts);
        })
        .catch(err => res.status(500).json(err));
};

export const createPosts = (req, res) => {
    const posts = req.body;
    return Posts.create(posts)
        .then(posts => res.status(201).json(posts))
        .catch(err => res.status(500).json(err));
};
