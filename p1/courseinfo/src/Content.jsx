import Part from "./Part";

const Content = (props) => {
    const parts = props.parts;

    return (
        <div>
            {parts.map((item, index) => (
                <Part key={index} name={item.name} count={item.count}/>
            ))}
        </div>
    )
};

export default Content;
