import React, { useEffect, useState } from 'react';
import useElementSize from './useElementSize';
import '../CSS/DataVisualization.css';
import LineGraph from './LineGraph';

const DataVisualization = ({ filter, onDataUpdate }) => {
    const [ref, bodySize] = useElementSize();
    const [filteredData, setFilteredData] = useState([]);
    const [dateRange, setDateRange] = useState("");

    // LineGraph에서 데이터를 받아 상위 컴포넌트로 전달
    const handleGraphDataUpdate = (data) => {
        setFilteredData(data);
        
        // 부모 컴포넌트에 데이터 전달 (CSV 다운로드용)
        if (onDataUpdate) {
            onDataUpdate(data);
        }
        
        // 날짜 범위 텍스트 생성
        updateDateRangeText(data);
    };
    
    // 날짜 범위 텍스트 생성
    const updateDateRangeText = (data) => {
        if (!data || data.length === 0) {
            setDateRange("");
            return;
        }
        
        // 필터링된 날짜 범위 텍스트
        if (filter.year || filter.month || filter.day || filter.week) {
            const parts = [];
            if (filter.year) parts.push(`${filter.year}년`);
            if (filter.month) parts.push(`${filter.month}월`);
            if (filter.week) parts.push(`${filter.week}주차`);
            if (filter.day) parts.push(`${filter.day}일`);
            
            setDateRange(parts.join(' '));
        } else {
            // 필터가 없는 경우 기본 최근 데이터 텍스트
            setDateRange("최근 데이터");
        }
    };

    // 필터 변경 시 날짜 범위 업데이트
    useEffect(() => {
        if (filter) {
            const parts = [];
            if (filter.year) parts.push(`${filter.year}년`);
            if (filter.month) parts.push(`${filter.month}월`);
            if (filter.week) parts.push(`${filter.week}주차`);
            if (filter.day) parts.push(`${filter.day}일`);
            
            setDateRange(parts.length > 0 ? parts.join(' ') : "최근 데이터");
        }
    }, [filter]);

    return (
        <div>
            <div className='component-chart-grid' ref={ref}>
                <section className='upper-section'>
                    <p className='summing-up-text'>
                        <span style={{ fontSize: bodySize.width * 0.02 }} className='ascii-test'>
                            {dateRange ? `${dateRange} 기간의 측정된 센서 데이터입니다.` : '최근 측정된 온도와 습도 그래프입니다.'}
                        </span>
                    </p>
                    <hr className='graph-hr' />
                </section>

                <section className='middle-section'>
                    <LineGraph 
                        filter={filter} 
                        onDataUpdate={handleGraphDataUpdate}
                    />
                </section>
            </div>
        </div>
    );
};

export default DataVisualization;