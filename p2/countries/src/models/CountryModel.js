/**
 * Represents a single country in application
 * 
 * @param {string} name 
 * @param {string} capital 
 * @param {Number} area 
 * @param {string[]} languages 
 * @param {string} flagUrl 
 */
const CountryModel = function(name, capital, area, languages, flagUrl){
    this.name = name;
    this.capital = capital;
    this.area = area;
    this.languages = languages;
    this.flagUrl = flagUrl;
}

export default CountryModel;
