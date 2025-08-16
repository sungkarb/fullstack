const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.category}</button>
    )
};

export default Button;
