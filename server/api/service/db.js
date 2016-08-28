import r from 'rethinkdb'
import config from 'config'
import xss from 'xss'

function connect() {
    return r.connect(config.get('rethinkdb'));
}

export function addPhoto(photo) {
    return connect()
        .then(conn => {
            photo.createdAt = r.now();
            photo.title = xss(photo.title);
            photo.path = xss(photo.path);

            return r
                .table('photos')
                .insert(photo)
                .run(conn)
                .then(response => {
                    return Object.assign({}, photo, { id: response.generated_keys[0] });
                });
        });
}

export function listPhotos() {
    return connect()
        .then(conn => {
            return r
                .table('photos')
                .orderBy(r.desc('createdAt'))
                .run(conn)
                .then(cursor => cursor.toArray());
        })
}

// USER CRU
export function findUserByEmail(mail, cb) {
    return connect()
        .then(conn => {
            return r
                .table('users')
                .filter({username: mail})
                .limit(1)
                .run(conn)
                .then((cursor, err) => {
                    if (err) {
                        cb(err);
                    } else {
                        cursor.next((err, row) => {
                            if (err) {
                                cb(null, null);
                            } else {
                                cb(null, row);
                            }
                        })
                    }
                })
        })
}

export function findUserById(userId, cb) {
    return connect()
        .then(conn => {
            return r
                .table('users')
                .get(userId)
                .run(conn)
                .then((result, err) => {
                    if (err) {
                        cb(null, null);
                    } else {
                        cb(null, result);
                    }
                })
        })
}

export function saveUser(user, cb) {
    return connect()
        .then(conn => {
            user.regDate = new Date();
            return r
                .table('users')
                .insert(user)
                .run(conn)
                .then((result, err) => {
                    if (err) {
                        cb(err);
                    } else {
                        if (result.inserted === 1) {
                            cb(null, true);
                        } else {
                            cb(null, false);
                        }
                    }
                })
        })
}

export function updateUser(user) {
    return connect()
        .then(conn => {
            return r
                .table('users')
                .get(user.id)
                .update(user)
                .run(conn)
        })
}

// tokens
export function saveToken(token, userId, callback) {
    return connect()
        .then(conn => {
            token.created = new Date();
            token.userId = userId;
            return r
                .table('rm_tokens')
                .insert(token).run(conn)
                .then((result, err) => {
                    if (err) {
                        callback(err);
                    } else {
                        callback();
                    }
                });
        });
}

export function consumeToken(token, callback) {
    return connect()
        .then(conn => {
            return r
                .table('rm_tokens')
                .filter({ token }).limit(1).run(conn)
                .then((cursor, err) => {
                    if (err) {
                        callback(err);
                    } else {
                        cursor.next((err, row) => {
                            if (err) {
                                callback(null, null);
                            } else {
                                callback(null, row.userId);
                                deleteToken(token);
                            }
                        });
                    }
                });
        });
}

export function deleteToken(token) {
    return connect()
        .then(conn => {
            return r
                .table('rm_tokens')
                .filter({ token }).limit(1).delete()
                .run(conn);
        });
}