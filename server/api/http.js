import * as service from './service/db';

export function addPhoto(req, res) {
    service
        .addPhoto(req.body)
        .then((photo) => res.json(photo))
        .catch(err => {
            res.status(400);
            res.json({ error: err, photo: req.body });
        })
}

export function listPhotos(req, res) {
    service
        .listPhotos()
        .then((photo) => res.json(photo))
        .catch(err => {
            res.status(400);
            res.json({ error: err });
        })
}