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
            <div className='statistic-grid'>
                <section className='display-section'>
                    <hr className='bottom-hr'/>
                </section>
                <section className='droplist-section'>
                    <p className='look-up-duration'>
                        <span className='Nanum-Gothic-bold'style={{fontSize: (bodySize.width/58)}}>김회원</span>
                        <span className='Nanum-Gothic'style={{fontSize: (bodySize.width/58)}}>님의 조회 가능 기간은&nbsp;</span>
                        <span className='duration-text'style={{fontSize: (bodySize.width/58)}}>2024.01.11 ~ 2020.03.21</span>
                        <span className='Nanum-Gothic'style={{fontSize: (bodySize.width/58)}}>입니다</span>
                    </p>
                </section>
                <section className='btn-section'>
                    <button className='inquiry-btn' style={{fontSize: (bodySize.width/50)}}>
                        정보 조회하기
                    </button>
                    <button className='export-btn'style={{fontSize: (bodySize.width/50)}}>
                        <div>
                            <span>엑셀파일로 다운받기</span>
                            <div className='icon-frame'></div>
                        </div>
                    </button>
                </section>
            </div> 
        </main>
        
    );
};

export default StatisticGraph;
 