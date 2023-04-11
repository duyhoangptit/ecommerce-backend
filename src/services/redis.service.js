const {setnx} = require("../utils/redis.util");
const acquireLock = async (productId, quantity, cartId) => {
    const key = `lock_v2023_${productId}`
    const retryTimes = 10
    const expireTime = 3000

    for(let i = 0; i < retryTimes; i++) {
        const result = await setnx(key, expireTime)
        console.log(`result::`, result)

        if (result === 1) {
            // thao tac voi inventory
            return key;
        } else {
            await new Promise((resolve) => setTimeout(resolve, 50))
        }
    }
}

const releaseLock = async (keyLock) => {
    const delAsyncKey = de
}