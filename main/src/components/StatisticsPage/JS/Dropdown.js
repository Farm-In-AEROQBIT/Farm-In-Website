import React, { useEffect, useState, useCallback } from 'react';
import '../CSS/Dropdown.css';
import axiosInstance from '../../../axiosInstance';

// 섹션 타입 영문명을 한글명으로 매핑
const sectionTypeToKorean = {
  'finishing': '비육사',
  'growing': '육성사',
  'maternity': '분만사',
  'gestation': '임신사',
  'piglet': '자돈사',
  'boars': '웅돈사',
  'reserve': '후보사'
};

const Dropdown = ({ onFilterChange, onSearch }) => {
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [sensors, setSensors] = useState([]);

  const [yearList, setYearList] = useState([]);
  const [dayList, setDayList] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [loading, setLoading] = useState(false);

  // 날짜 목록 생성 (회원가입일 ~ 오늘까지)
  useEffect(() => {
    const startYear = 2023;
    const thisYear = new Date().getFullYear();
    const years = [];
    for (let y = startYear; y <= thisYear; y++) {
      years.push(y);
    }
    setYearList(years);

    // 일자
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    setDayList(days);
  }, []);

  // 농장 정보 가져오기
  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/api/farms')
      .then(res => {
        console.log('농장 데이터:', res.data);
        // body 배열에서 데이터 추출
        const farmsData = res.data.body || [];
        setFarms(farmsData);
      })
      .catch(error => {
        console.error('농장 정보 조회 오류:', error);
        setFarms([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 선택한 농장의 섹션 정보 가져오기
  useEffect(() => {
    if (!selectedFarm) {
      setSections([]);
      setSelectedSection(null);
      setSensors([]);
      return;
    }

    setLoading(true);
    axiosInstance.get(`/api/farm/${selectedFarm}/sections`)
      .then(res => {
        console.log('섹션 데이터:', res.data);
        // body 배열에서 데이터 추출
        const sectionsData = res.data.body || [];
        setSections(sectionsData);
        setSelectedSection(null);
        setSensors([]);
      })
      .catch(error => {
        console.error('섹션 정보 조회 오류:', error);
        setSections([]);
        setSelectedSection(null);
        setSensors([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedFarm]);

  // 선택한 섹션의 센서 정보 가져오기
  const handleSectionSelect = (sectionId, sectionType) => {
    if (!sectionId || !sectionType) {
      setSelectedSection(null);
      setSensors([]);
      return;
    }

    const section = sections.find(s => s.id === parseInt(sectionId));
    if (!section) return;

    console.log('선택된 섹션 데이터:', section);
    
    setSelectedSection(section);
    setLoading(true);

    // 영문 섹션 타입 사용
    axiosInstance.get(`/api/section/${sectionId}/sensors?sectionType=${sectionType}`)
      .then(res => {
        console.log('센서 데이터:', res.data);
        // body 배열에서 데이터 추출
        const sensorsData = res.data.body || [];
        setSensors(sensorsData);
        
        // 센서 데이터를 받으면 바로 필터 상태 업데이트 (중요 변경!)
        updateFilterState(section, sensorsData);
      })
      .catch(error => {
        console.error('센서 정보 조회 오류:', error);
        setSensors([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 돈사 이름을 한글로 변환하는 함수
  const getKoreanSectionName = (section) => {
    if (!section) return '';
    
    // type이 영문인 경우 한글로 변환
    return sectionTypeToKorean[section.type] || section.name;
  };

  // 필터 상태 업데이트 함수 (새로 추가)
  const updateFilterState = useCallback((section, sensorsData) => {
    if (!section) return;
    
    // 선택한 섹션의 영문 타입 가져오기
    const sectionType = section.type;
    const filterData = {
      farmId: selectedFarm,
      sectionId: section.id,
      sectionType: sectionType,
      barnType: sectionTypeToKorean[sectionType] || '',
      sensors: sensorsData,
      snFarmId: section.snFarmId || section.sn_farm_id,
      year: selectedYear,
      month: selectedMonth,
      week: selectedWeek,
      day: selectedDay,
      showGraph: true // 그래프 표시 플래그 설정
    };
    
    console.log("필터 데이터 자동 업데이트:", filterData);
    onFilterChange(filterData);
  }, [
    selectedFarm, 
    selectedYear, 
    selectedMonth, 
    selectedWeek, 
    selectedDay, 
    onFilterChange
  ]);

  // handleSearch 함수 - 로깅 추가
  const handleSearch = useCallback(() => {
    console.log("handleSearch 호출됨", selectedSection);
    if (!selectedSection) return;
    
    // 선택한 섹션의 영문 타입 가져오기
    const sectionType = selectedSection.type;
    console.log("필터 데이터 전송:", {
      farmId: selectedFarm,
      sectionId: selectedSection.id,
      sectionType: sectionType,
      sensors: sensors.length,
      showGraph: true
    });

    onFilterChange({
      farmId: selectedFarm,
      sectionId: selectedSection.id,
      sectionType: sectionType,
      barnType: sectionTypeToKorean[sectionType] || '',
      sensors: sensors,
      snFarmId: selectedSection.snFarmId || selectedSection.sn_farm_id,
      year: selectedYear,
      month: selectedMonth,
      week: selectedWeek,
      day: selectedDay,
      showGraph: true // 그래프 표시 플래그 설정
    });
  }, [
    selectedSection, 
    selectedFarm, 
    sensors, 
    selectedYear, 
    selectedMonth, 
    selectedWeek, 
    selectedDay, 
    onFilterChange
  ]);

  // 날짜 선택 시 필터 업데이트 (새로 추가)
  useEffect(() => {
    if (selectedSection && sensors.length > 0) {
      updateFilterState(selectedSection, sensors);
    }
  }, [selectedYear, selectedMonth, selectedWeek, selectedDay, updateFilterState, selectedSection, sensors]);

  // handleSearch 함수 전달
  useEffect(() => {
    if (onSearch) {
      onSearch(prevInfo => ({
        ...prevInfo,
        handleSearch
      }));
    }
  }, [handleSearch, onSearch]);

  // 검색 가능 여부, 로딩 상태 업데이트
  useEffect(() => {
    if (onSearch) {
      onSearch(prevInfo => ({
        ...prevInfo,
        canSearch: !!selectedSection,
        isLoading: loading
      }));
    }
  }, [selectedSection, loading, onSearch]);

  return (
    <div className="custom-dropdown-wrapper">
      {/* 농장 & 돈사 드롭다운 → 가로 정렬 */}
      <div className="farm-barn-row">
        <div className="dropdown-block">
          <label>농장 선택</label>
          <select 
            value={selectedFarm} 
            onChange={e => setSelectedFarm(e.target.value)}
            disabled={loading || farms.length === 0}
          >
            <option value="">농장 선택</option>
            {Array.isArray(farms) && farms.map(farm => (
              <option key={farm.id} value={farm.id}>{farm.name}</option>
            ))}
          </select>
        </div>

        <div className="dropdown-block">
          <label>돈사 선택</label>
          <select 
            value={selectedSection ? selectedSection.id : ''} 
            onChange={e => {
              const section = sections.find(s => s.id.toString() === e.target.value);
              if (section) {
                handleSectionSelect(section.id, section.type);
              } else {
                setSelectedSection(null);
                setSensors([]);
              }
            }}
            disabled={loading || sections.length === 0 || !selectedFarm}
          >
            <option value="">돈사 선택</option>
            {sections.map(section => (
              <option key={section.id} value={section.id}>
                {getKoreanSectionName(section)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 센서 정보 표시 (드롭다운 대신 텍스트로 표시) */}
      <div className="dropdown-block">
        <label>센서 정보</label>
        <div className="sensor-info">
          {selectedSection ? (
            <span>
              {selectedSection.snFarmId || selectedSection.sn_farm_id || '센서 정보 없음'}
            </span>
          ) : (
            <span>돈사를 선택하면 센서 정보가 표시됩니다</span>
          )}
        </div>
      </div>

      {/* 시간 선택 영역 */}
      <div className="time-grid">
        <div className="time-column">
          <label>년도</label>
          <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
            <option value="">년도 선택</option>
            {yearList.map(year => (
              <option key={`year-${year}`} value={year}>{year}</option>
            ))}
          </select>

          <label>주차</label>
          <select value={selectedWeek} onChange={e => setSelectedWeek(e.target.value)}>
            <option value="">주차 선택</option>
            {[1,2,3,4,5].map(week => (
              <option key={`week-${week}`} value={week}>{week}주차</option>
            ))}
          </select>
        </div>

        <div className="time-column">
          <label>월</label>
          <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
            <option value="">월 선택</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <option key={`month-${month}`} value={month}>{month}월</option>
            ))}
          </select>

          <label>일</label>
          <select value={selectedDay} onChange={e => setSelectedDay(e.target.value)}>
            <option value="">일 선택</option>
            {dayList.map(day => (
              <option key={`day-${day}`} value={day}>{day}일</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;