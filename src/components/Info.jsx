import './Info.css';

function Info(props) {
    return (
        <div className="info-box">
            <h2>{props.header}</h2> {/* displays the heading */}
            <div className='text-box'>
                {props.para} {/* displays the paragraph content */}
            </div>
        </div>
    )
}

export default Info;
