import SingleCountry from "./SingleCountry.jsx";
import {useState} from 'react';

const CountryBox = (props) => {
    const prefix = props.prefix.toLowerCase();
    const countries = props.countries;

    // Find how many countries start with prefix
    const prefixCountries = countries.filter((country) => country.name.toLowerCase().startsWith(prefix));
    
    // Display message that we need more
    if (prefixCountries.length > 10){
        return (
            <p>Too many matches, specify another filter</p>
        );
    }

    // Check that there is a country with exatcly the same prefix
    const uniqueCountry = prefixCountries.find((country) => country.name.toLowerCase() === prefix);
    if (uniqueCountry){
        return (
            <SingleCountry country={uniqueCountry} />
        )
    }
    // Display all countries one by one
    else {
        return (
            <>
                {prefixCountries.map((item, index) => (
                    <CountryListOption key={index} country={item} />
                ))}
            </>
        );
    }
};

const CountryListOption = ({country}) => {
    const [toShow, setToShow] = useState(false);

    const onClick = (e) => {
        setToShow(!toShow);
    }

    if (toShow){
        return (
            <>
            <div>
                {country.name} <button onClick={onClick}>Hide</button>
            </div>
            <SingleCountry country={country}/>
            </>
        )
    }
    else {
        return (
            <div>
                {country.name} <button onClick={onClick}>Show</button>
            </div>
        )
    }
}

export default CountryBox;
