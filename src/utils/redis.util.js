// lay ip user
const client = require('../configs/config.redis');

const get = async (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, data) => {
            if (err) {
                return reject(err);
            }

            return resolve(data);
        });
    })
}

// co the set nhieu lan
const set = async (key, value) => {
    return new Promise((resolve, reject) => {
        client.set(key, value, (err, data) => {
            if (err) {
                return reject(err);
            }

            resolve(data);
        });
    })
}

// set 1 lan duy nhat
const setnx = async (key, value) => {
    return new Promise((resolve, reject) => {
        client.setnx(key, value, (err, data) => {
            if (err) {
                return reject(err);
            }

            resolve(data);
        });
    })
}

// cache tu dong tang with redis
const incr = key => {
    return new Promise((resolve, reject) => {
        // method tu dong tang trong redis
        client.incr(key, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

const decrby = async (key, count) => {
    return new Promise((resolve, reject) => {
        // method tu dong tang trong redis
        client.decrby(key, count, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

// expire key redis
const expire = (key, ttl) => {
    return new Promise((resolve, reject) => {
        // method tu dong tang trong redis
        client.expire(key, ttl, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

// get ttl thoi gian het han con lai
const ttl = (key) => {
    return new Promise((resolve, reject) => {
        // method tu dong tang trong redis
        client.ttl(key, (err, ttl) => {
            if (err) return reject(err);
            resolve(ttl);
        });
    });
}

const exists = async (key) => {
    return new Promise((resolve, reject) => {
        // method tu dong tang trong redis
        client.exists(key, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

module.exports = {
    get,
    set,
    setnx,
    incr,
    decrby,
    expire,
    exists,
    ttl,
}