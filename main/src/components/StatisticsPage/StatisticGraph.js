import useElementSize from './useElementSize';
import './StatisticGraph.css';


const StatisticGraph = () => {
    const [ref, bodySize] = useElementSize();
    return(
        <main className="graph-container" ref={ref}>
            <summary style={{margin: 0}} className="title-box">
                <span className="Nanum-Gothic-bold" style={{fontSize: (bodySize.width/25)}}>실시간&nbsp;</span>
                <span className="Nanum-Gothic-light" style={{fontSize: (bodySize.width/25)}}>업데이트<br/></span>
                <span className="Nanum-Gothic-light" style={{fontSize: (bodySize.width/25)}}>농장&nbsp;</span>
                <span className="Nanum-Gothic-bold" style={{fontSize: (bodySize.width/25)}}>공기 정보&nbsp;</span>
                <span className="Nanum-Gothic-light" style={{fontSize: (bodySize.width/25)}}>확인하기</span>
            </summary>
            <div className='display-section'>
                <div className='grid-test'></div>
                <div className='btn-section'>
                    <button className='inquiry-btn'>
                    </button>
                    <button className='export-btn'></button>
                </div>
            </div> 
            {/* <hr className='bottom-hr'/> */}
        </main>
        
    );
};

export default StatisticGraph;
 