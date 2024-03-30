function Card({catName, catData}){
    return(
    <div>
        {catData ? (
            <div className="card">
                <div className="card-header">{catName}</div>
                <div className="card-text">{catData}</div>
            </div>
        ) :
            <div className="card">
                <div className="card-header">{catName}</div>
                <div className="card-text">No City Selected</div>
            </div>
        }
    </div>
    )
}

export default Card;