const RandomGenerator = (() => {
    /**
     * Generate random number within range
     * 
     * @param {Number} min 
     * @param {Number} max 
     * @returns {Number} random number in range
     */
    const randomInt = (min, max) => {
        if (min >= max){
            throw new Error("invalid range");
        }

        return Math.floor(Math.random() * (max - min) + min);
    }

    return {
        randomInt
    }
})();

module.exports = {
    RandomGenerator
};
