const Form = ({onNameChange, onNumberChange, onFormSubmit}) => {
    return (
        <form>
            <div>
                name: <input onChange={onNameChange}/>
            </div>
            <div>
                number: <input onChange={onNumberChange}/>
            </div>
            <div>
                <button onClick={onFormSubmit} type="submit">add</button>
            </div>
        </form>
    )
}

export default Form;
