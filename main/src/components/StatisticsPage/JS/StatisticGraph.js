import React from 'react';
import useElementSize from './useElementSize';
import DropDown from './Dropdown';  // DropDown 컴포넌트 임포트
import '../CSS/Dropdown.css';
import '../CSS/StatisticGraph.css';

const StatisticGraph = ({ dataVisualization }) => {
    const [ref, bodySize] = useElementSize();
    
    // 고정된 시작 날짜와 현재 날짜 계산
    const startDate = '2023-01-30'; // 시작 날짜 고정
    const today = new Date();
    const endDate = today.toISOString().split('T')[0]; // 현재 날짜를 'YYYY-MM-DD' 형식으로 변환

    return (
        <main className="graph-container" ref={ref}>
            <summary style={{ margin: 0 }} className="title-box">
                <span className="Nanum-Gothic-bold" style={{ fontSize: (bodySize.width / 25) }}>실시간&nbsp;</span>
                <span className="Nanum-Gothic-light" style={{ fontSize: (bodySize.width / 25) }}>업데이트<br /></span>
                <span className="Nanum-Gothic-light" style={{ fontSize: (bodySize.width / 25) }}>농장&nbsp;</span>
                <span className="Nanum-Gothic-bold" style={{ fontSize: (bodySize.width / 25) }}>공기 정보&nbsp;</span>
                <span className="Nanum-Gothic-light" style={{ fontSize: (bodySize.width / 25) }}>확인하기</span>
            </summary>
            <div className='statistic-grid'>
                <section className='display-section'>
                    {dataVisualization}
                    <hr className='bottom-hr' />
                </section>

                {/* look-up-duration과 dropdown을 세로로 배치 */}
                <section className='droplist-section'>
                    {/* 조회 기간 표시 */}
                    <p className='look-up-duration'>
                        <span className='Nanum-Gothic-bold' style={{ fontSize: (bodySize.width / 58) }}>김회원</span>
                        <span className='Nanum-Gothic' style={{ fontSize: (bodySize.width / 58) }}>님의 조회 가능 기간은&nbsp;</span>
                        <span className='duration-text' style={{ fontSize: (bodySize.width / 58) }}>{startDate} ~ {endDate}</span>
                        <span className='Nanum-Gothic' style={{ fontSize: (bodySize.width / 58) }}>입니다</span>
                    </p>
                    
                    {/* 드롭다운 리스트 배치 */}
                    <DropDown />
                </section>

                <section className='btn-section'>
                    <button className='inquiry-btn' style={{ fontSize: (bodySize.width / 50) }}>
                        <span>정보 조회하기</span>
                        <div className='icon-container'>
                            <div className='icon-magnfier'></div>
                        </div>
                    </button>
                    <button className='export-btn' style={{ fontSize: (bodySize.width / 50) }}>
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
