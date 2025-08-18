import axios from "axios";

const ServerController = (() => {
    const baseUrl = "http://localhost:3001";

    const getAll = () => {
        return axios.get(baseUrl + "/persons");
    };

    const addNew = (person) => {
        return axios.post(baseUrl + "/persons", person);
    };

    const remove = (personId) => {
        return axios.delete(baseUrl + `/persons/${personId}`);
    };

    const update = (person) => {
        return axios.put(baseUrl + `/persons/${person.id}`, person);
    }

    return {
        getAll,
        addNew,
        remove,
        update
    }
})();

export default ServerController;
