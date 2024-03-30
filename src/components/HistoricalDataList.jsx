function HistoricalDataList({dataList}){
    return(
    <div>
        <div className="list-element">
                <div className="list-date">Date</div>
                <div className="list-mintemp">Low Temp</div>
                <div className="list-maxtemp">High Temp</div>
                <div className="list-precip">Precipitation</div>
        </div>
        {dataList ? (
            <div className="list-element">
                <div className="list-date"></div>
            </div>
        ) :
            null
        }
    </div>
    )
}

export default HistoricalDataList;