const ContactList = ({contacts, prefix, handleDelete}) => {
    return (
        <>
        {contacts.filter(item => item.name.startsWith(prefix))
                .map(item => (
                    <div key={item.id}>
                        <button onClick={handleDelete(item)}>delete</button>
                        <p>{item.name} {item.number}</p>
                    </div>
                ))}
        </>
    )
};

export default ContactList;
