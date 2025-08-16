const Statistics = ({feedbacksState, statistics}) => {
    if (statistics.totalCount > 0){
        return (
            <>
            {feedbacksState.map((item, index) => (<p key={index}>{item.category} {item.count}</p>))}
            <StatisticsLine name="all" value={statistics.totalCount}/>
            <StatisticsLine name="average" value={statistics.totalValue / statistics.totalCount}/>
            <StatisticsLine name="all" value={statistics.positiveCount / statistics.totalCount * 100 + "%"}/>
            </>
        );
    }
    else {
        return (
            <p>No feedback given</p>
        )
    }
}

const StatisticsLine = ({name, value}) => {
    return (
        <p>{name} {value}</p>
    );
}

export default Statistics;