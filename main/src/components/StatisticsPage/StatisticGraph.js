import useElementSize from './useElementSize';
import './StatisticGraph.css';


const StatisticGraph = () => {
    const [ref, bodySize] = useElementSize();
    return(
        <main className="graph-container" ref={ref}>
            <summary style={{margin: 0}} className="title-box">
                <span className="graph-title-bold" style={{fontSize: (bodySize.width/25)}}>실시간&nbsp;</span>
                <span className="graph-title" style={{fontSize: (bodySize.width/25)}}>업데이트<br/></span>
                <span className="graph-title" style={{fontSize: (bodySize.width/25)}}>농장&nbsp;</span>
                <span className="graph-title-bold" style={{fontSize: (bodySize.width/25)}}>공기 정보&nbsp;</span>
                <span className="graph-title" style={{fontSize: (bodySize.width/25)}}>확인하기</span>
            </summary>
            <p>어디에 배치되지?</p>
            <div className='display-section'>
            </div> 
        </main> 
        
    );
};

export default StatisticGraph;
 