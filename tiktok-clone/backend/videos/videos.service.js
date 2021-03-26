import Videos from './videos.model.js';

export const getVideos = (req, res) => {
    return Videos.find()
        .then(videos => res.status(200).json(videos))
        .catch(err => res.status(500).json(err));
};

export const createVideos = (req, res) => {
    const videos = req.body;
    return Videos.create(videos)
        .then(videos => res.status(201).json(videos))
        .catch(err => res.status(500).json(err));
};
