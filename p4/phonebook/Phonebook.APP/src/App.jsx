import { useEffect, useState } from 'react';
import ServerController from './controllers/ServerController.js';
import Filter from './Filter.jsx';
import Form from './Form.jsx';
import ContactList from './ContactList.jsx';
import StatusMessage from './StatusMessage.jsx';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newPrefix, setPrefix] = useState('');
  const [statusMessage, setStatusMessage] = useState({
    message: '',
    isSuccess: false,
    toShow: false
  });

  // Load data 
  useEffect(() => {
    ServerController.getAll()
                    .then(response => {
                      setPersons(response.data)
                    });
  }, []);

  const handleInputChange = function(setter){
    return (e) => {
      const newVal = e.target.value;
      setter(newVal);
    };
  }

  const handleSubmission = async function(e){
    e.preventDefault();
    // Check that new name is unique
    for (let item of persons){
      if (item.name === newName){
        // Update phone number to the new one
        if (window.confirm(`${item.name} is already added in the phonebook, replace the old number with a new one?`)){
          // Update database information
          item.number = newNumber;
          ServerController.update(item)
            .then(() => {
               // Update ui
              const copy = [...persons];
              setPersons(copy);

              // Display status message and make it disappear
              const newStatusMessage = {
                message: `Updates ${item.name}`,
                isSuccess: true,
                toShow: true
              };
              setStatusMessage(newStatusMessage);

              // Make it disappear after 5 seconds
              setTimeout(() => {
                const newStatusMessage = {...statusMessage, toShow: false};
                setStatusMessage(newStatusMessage);
              }, 5000);
            })
            .catch(() => {
              const newStatusMessage = {
                message: `Failed to update information`,
                isSuccess: false,
                toShow: true
              };
              setStatusMessage(newStatusMessage);

              // Make it disappear after 5 seconds
              setTimeout(() => {
                const newStatusMessage = {...statusMessage, toShow: false};
                setStatusMessage(newStatusMessage);
              }, 5000);
            });
        }
        return;
      }
    }

    // Push new phone number
    const newPerson = {
      name: newName,
      number: newNumber
    };

     // Update database
    ServerController.addNew(newPerson)
      .then((response) => {
        newPerson.id = response.data.id;
        alert("Updated database");

        // Update UI
        const copy = [...persons];
        copy.push(newPerson);
        setPersons(copy);

        // Display status message and make it disappear
        const newStatusMessage = {
          message: `Added ${newPerson.name}`,
          isSuccess: true,
          toShow: true
        };
        setStatusMessage(newStatusMessage);

        // Make it disappear after 5 seconds
        setTimeout(() => {
          const newStatusMessage = {...statusMessage, toShow: false};
          setStatusMessage(newStatusMessage);
        }, 5000);
      })
      .catch(() => {
        const newStatusMessage = {
          message: `Failed to add user ${newPerson.name}`,
          isSuccess: false,
          toShow: true
        };
        setStatusMessage(newStatusMessage);

        // Make it disappear after 5 seconds
        setTimeout(() => {
          const newStatusMessage = {...statusMessage, toShow: false};
          setStatusMessage(newStatusMessage);
        }, 5000);
      })
  }

  const handleDeletion = (person) => {
    const result = async () => {
      if (window.confirm(`Delete ${person.name}`)){
        // Remove from database and update ui
        console.log(person);
        await ServerController.remove(person.id);

        // Filter out array and update ui
        const copy = persons.filter((item) => item.id !== person.id);
        setPersons(copy);
      }
    };

    return result;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <StatusMessage message={statusMessage.message} isSuccess={statusMessage.isSuccess} toShow={statusMessage.toShow}/>
      <Filter onChange={handleInputChange(setPrefix)}/>
      <h2>Add a new</h2>
      <Form onNameChange={handleInputChange(setNewName)} onNumberChange={handleInputChange(setNewNumber)} onFormSubmit={handleSubmission}/>
      <h2>Numbers</h2>
      <ContactList contacts={persons} prefix={newPrefix} handleDelete={handleDeletion}/>
    </div>
  )
}

export default App