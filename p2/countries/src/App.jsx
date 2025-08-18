import RestController from "./controllers/RestController.js";
import CountryBox from "./CountryBox.jsx";
import CountryModel from "./models/CountryModel.js";
import {useState, useEffect} from 'react';

function App() {
  const [newPrefix, setPrefix] = useState('');
  const [countries, setCountries] = useState([]);

  // Fetch country information
  useEffect(() => {
    RestController.getAll()
      .then((data) => {
        setCountries(data);
      })
  }, []);

  /**
   * Handles input change and updates input box
   * 
   * @param {*} setter 
   * @returns event handler
   */
  const handleInputChange = (setter) => {
    const result = (e) => {
      const newVal = e.target.value;
      setter(newVal);
    }

    return result;
  }

  return (
    <>
      <div>
        find countries <input onChange={handleInputChange(setPrefix)}/>
      </div>
      <CountryBox prefix={newPrefix} countries={countries}/>
    </>
  )
}

export default App;
