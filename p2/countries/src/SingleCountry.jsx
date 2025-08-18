const SingleCountry = ({country}) => {
    return (
        <>
            <h2>{country.name}</h2>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {country.languages.map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            <img src={country.flagUrl}/>
        </>
    );
}

export default SingleCountry;
