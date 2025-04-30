import './Info.css';

function Info(props) {
    return (
        <div className="info-box">
            <h2>{props.header}</h2>
            <div className='text-box'>
                {props.para}
            </div>
        </div>
    )
}

export default Info;
