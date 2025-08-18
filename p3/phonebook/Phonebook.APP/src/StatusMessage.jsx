import "./StatusMessage.css";

const StatusMessage = ({message, isSuccess, toShow}) => {
    if (!toShow){
        return;
    }

    if (isSuccess){
        return (
            <div className="status-box success-box">
                <p>{message}</p>
            </div>
        );
    }
    else {
        return (
            <div className="status-box fail-box">
                <p>{message}</p>
            </div>
        ); 
    }
};

export default StatusMessage;
