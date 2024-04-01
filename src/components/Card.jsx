function Card({catName, catMainData, catSubData}){
    return(
    <div>
        {catMainData ? (
            <div className="card">
                <div className="card-header">{catName}</div>
                <div className="card-text">{catMainData}</div>
                {catSubData ? 
                    <div className="card-subtext">{catSubData}</div> :
                    null
                }
            </div>
        ) :
            <div className="card">
                <div className="card-header">{catName}</div>
                <div className="card-text">None Found</div>
            </div>
        }
    </div>
    )
}

export default Card;