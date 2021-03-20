import Cards from './cards.model.js';

export const getCards = (req, res) => {
    return Cards.find()
        .then(cards => res.status(200).json(cards))
        .catch(err => res.status(500).json(err));
};

export const createCards = (req, res) => {
    const cards = req.body;
    return Cards.create(cards)
        .then(cards => res.status(201).json(cards))
        .catch(err => res.status(500).json(err));
};
