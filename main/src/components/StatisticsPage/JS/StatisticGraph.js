import React, { useState, useCallback, useEffect } from 'react';
import useElementSize from './useElementSize';
import '../CSS/StatisticGraph.css';
import DropDown from '../JS/Dropdown';
import DataVisualization from './DataVisualization';

const StatisticGraph = () => {
    const [ref, bodySize] = useElementSize();
    const [filter, setFilter] = useState(null); // 필터 상태 추가
    const [searchInfo, setSearchInfo] = useState({
        canSearch: false,
        isLoading: false,
        handleSearch: null
    });
    const [data, setData] = useState(null); // 데이터 상태 추가

    const startDate = '2023-01-30';
    const today = new Date();
    const endDate = today.toISOString().split('T')[0];

    // 필터 변경 시 로깅 추가
    const handleFilterChange = useCallback((newFilter) => {
        console.log("필터 변경됨:", newFilter);
        setFilter(newFilter);
    }, []);

    // 메모이제이션된 함수로 searchInfo 업데이트 처리
    const handleSearchInfoUpdate = useCallback((info) => {
        setSearchInfo(prevInfo => ({
            ...prevInfo,
            ...info
        }));
    }, []);

    // DataVisualization으로부터 데이터 받기
    const handleDataUpdate = useCallback((newData) => {
        console.log("데이터 업데이트됨:", newData);
        setData(newData);
    }, []);

    // 상태 디버깅을 위한 useEffect
    useEffect(() => {
        console.log("현재 필터 상태:", filter);
        console.log("현재 검색 정보:", searchInfo);
    }, [filter, searchInfo]);

    // CSV 파일 다운로드 함수
    const handleExportCSV = useCallback(() => {
        if (!data || data.length === 0) {
            alert('내보낼 데이터가 없습니다. 먼저 정보를 조회해주세요.');
            return;
        }

        try {
            // CSV 헤더 생성 (데이터의 첫 번째 객체에서 키 추출)
            const headers = Object.keys(data[0]);
            
            // CSV 컨텐츠 생성
            let csvContent = headers.join(',') + '\n';
            
            // 데이터 행 추가
            data.forEach(item => {
                const row = headers.map(header => {
                    // 쉼표나 줄바꿈이 포함된 값은 따옴표로 감싸기
                    const cell = item[header] === null ? '' : String(item[header]);
                    if (cell.includes(',') || cell.includes('\n') || cell.includes('"')) {
                        return `"${cell.replace(/"/g, '""')}"`;
                    }
                    return cell;
                });
                csvContent += row.join(',') + '\n';
            });

            // Blob 생성 및 다운로드
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            
            // 현재 날짜를 파일명에 포함
            const fileName = `farm_air_data_${new Date().toISOString().split('T')[0]}.csv`;
            
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('CSV 내보내기 오류:', error);
            alert('파일 다운로드 중 오류가 발생했습니다.');
        }
    }, [data]);

    return (
        <main className="graph-container" ref={ref}>
            <summary className="title-box">
                <span className="Nanum-Gothic-bold" style={{ fontSize: bodySize.width / 25 }}>실시간&nbsp;</span>
                <span className="Nanum-Gothic-light" style={{ fontSize: bodySize.width / 25 }}>업데이트 농장&nbsp;</span>
                <span className="Nanum-Gothic-bold" style={{ fontSize: bodySize.width / 25 }}>공기 정보&nbsp;</span>
                <span className="Nanum-Gothic-light" style={{ fontSize: bodySize.width / 25 }}>확인하기</span>
            </summary>

            <div className='statistic-grid'>
                <section className='display-section'>
                    <DataVisualization filter={filter} onDataUpdate={handleDataUpdate} />
                    <hr className='bottom-hr'/>
                </section>

                <section className='droplist-section'>
                    <p className='look-up-duration'>
                        <span className='Nanum-Gothic-bold' style={{ fontSize: bodySize.width / 58 }}>김회원</span>
                        <span className='Nanum-Gothic' style={{ fontSize: bodySize.width / 58 }}>님의 조회 가능 기간은&nbsp;</span>
                        <span className='duration-text' style={{ fontSize: bodySize.width / 58 }}>{startDate} ~ {endDate}</span>
                        <span className='Nanum-Gothic' style={{ fontSize: bodySize.width / 58 }}>입니다</span>
                    </p>
                    <DropDown 
                        onFilterChange={handleFilterChange} 
                        onSearch={handleSearchInfoUpdate}
                    />
                </section>

                <section className='btn-section'>
                    <button 
                        className='inquiry-btn' 
                        style={{ fontSize: bodySize.width / 50 }}
                        onClick={() => searchInfo.handleSearch && searchInfo.handleSearch()}
                        disabled={!searchInfo.canSearch || searchInfo.isLoading}
                    >
                        <span>{searchInfo.isLoading ? '로딩 중...' : '정보 조회하기'}</span>
                        <div className='icon-container'>
                            <div className='icon-magnfier'></div>
                        </div>
                    </button>
                    <button 
                        className='export-btn' 
                        style={{ fontSize: bodySize.width / 50 }}
                        onClick={handleExportCSV}
                        disabled={!data || data.length === 0}
                    >
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