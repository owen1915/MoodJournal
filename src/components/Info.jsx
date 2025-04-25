import './Info.css';

function Info(props) {
    return (
        <div className="info-box">
            <h2>{props.header}</h2>
            <p>{props.para}</p>
        </div>
    )
}

export default Info;
