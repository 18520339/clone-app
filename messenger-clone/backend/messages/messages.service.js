import Messages from './messages.model.js';

export const getMessages = (req, res) => {
    return Messages.find()
        .then(messages => {
            messages.sort((a, b) => a.timestamp - b.timestamp);
            res.status(200).json(messages);
        })
        .catch(err => res.status(500).json(err));
};

export const createMessages = (req, res) => {
    const messages = req.body;
    return Messages.create(messages)
        .then(messages => res.status(201).json(messages))
        .catch(err => res.status(500).json(err));
};
