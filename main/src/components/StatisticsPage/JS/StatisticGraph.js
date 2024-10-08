import useElementSize from './useElementSize';
import '../CSS/StatisticGraph.css';


const StatisticGraph = ({dataVisualization}) => {
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
            <div className='statistic-grid'>
                <section className='display-section'>
                    {dataVisualization}
                    <hr className='bottom-hr'/>
                </section>
                <section className='droplist-section'>
                    <p className='look-up-duration'>
                        <span className='Nanum-Gothic-bold'style={{fontSize: (bodySize.width/58)}}>김회원</span>
                        <span className='Nanum-Gothic'style={{fontSize: (bodySize.width/58)}}>님의 조회 가능 기간은&nbsp;</span>
                        <span className='duration-text'style={{fontSize: (bodySize.width/58)}}>2023.01.30 ~ 2024.10.07</span>
                        <span className='Nanum-Gothic'style={{fontSize: (bodySize.width/58)}}>입니다</span>
                    </p>
                </section>
                <section className='btn-section'>
                    <button className='inquiry-btn' style={{fontSize: (bodySize.width/50)}}>
                        <span>정보 조회하기</span>
                        <div className='icon-container'>
                            <div className='icon-magnfier'></div>
                        </div>
                    </button>
                    <button className='export-btn'style={{fontSize: (bodySize.width/50)}}>
                        <span>엑셀파일로 다운받기</span>
                        <div className='icon-container'>
                            <div className='icon-csv'></div>
                        </div>
                    </button>
                </section>
            </div> 
        </main>
        
    );
};

export default StatisticGraph;
 