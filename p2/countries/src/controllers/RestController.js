import CountryModel from "../models/CountryModel.js";

const RestController = (() => {
    /**
     * Gets information about all countries
     * 
     * @returns {CountryModel[]} array of country models 
     */
    const getAll = () => {
        const result = fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
            .then((response) => response.json())
            .then((data) => {
                return data.map((item) => {
                    try {
                        return new CountryModel(
                            item.name.common,
                            item.capital[0],
                            item.area,
                            [...Object.values(item.languages)],
                            item.flags.png
                        );
                    }
                    catch (e){
                        return null;
                    }
                })
                .filter((item) => item !== null);
            });

        return result;
    };

    return {
        getAll
    };
})();

export default RestController;
