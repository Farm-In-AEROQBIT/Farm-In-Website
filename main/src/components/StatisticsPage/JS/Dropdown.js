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

  // 사용 가능한 날짜 관련 상태
  const [availableYears, setAvailableYears] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [loading, setLoading] = useState(false);

  // 기본 날짜 목록 생성 (백업용)
  useEffect(() => {
    const startYear = 2023;
    const thisYear = new Date().getFullYear();
    const defaultYears = [];
    for (let y = startYear; y <= thisYear; y++) {
      defaultYears.push(y);
    }
    
    // 기본 연도 목록 설정 (데이터가 없는 경우 대비)
    if (availableYears.length === 0) {
      setAvailableYears(defaultYears);
    }
    
    // 기본 일자 목록 설정 (데이터가 없는 경우 대비)
    if (availableDays.length === 0) {
      const defaultDays = Array.from({ length: 31 }, (_, i) => i + 1);
      setAvailableDays(defaultDays);
    }
  }, [availableYears.length, availableDays.length]);

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
        
        // 센서 데이터를 받으면 바로 필터 상태 업데이트
        updateFilterState(section, sensorsData);
        
        // 받아온 센서 데이터를 분석하여 사용 가능한 날짜 추출
        extractAvailableDatesFromSensorData(sensorsData);
      })
      .catch(error => {
        console.error('센서 정보 조회 오류:', error);
        setSensors([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  // 센서 데이터에서 사용 가능한 날짜 추출
  const extractAvailableDatesFromSensorData = (sensorsData) => {
    try {
      console.log('센서 데이터에서 사용 가능한 날짜 추출 시작');
      
      // 기본값 설정
      const startYear = 2023;
      const thisYear = new Date().getFullYear();
      const years = [];
      for (let y = startYear; y <= thisYear; y++) {
        years.push(y);
      }

      // 최소 및 최대 날짜 기록
      let minDate = new Date();
      let maxDate = new Date(2023, 0, 1); // 시작 기준일 (2023년 1월 1일)
      let hasDateData = false;
      
      // 센서 데이터에서 날짜 정보 추출
      if (sensorsData && sensorsData.length > 0) {
        // 데이터 구조 확인
        console.log('센서 데이터 첫 항목:', sensorsData[0]);
        
        // 데이터에서 날짜 필드 찾기 (createdAt, updatedAt, measureDate 등 가능성 있는 필드)
        const dateFields = ['createdAt', 'updatedAt', 'measureDate', 'date', 'timestamp'];
        
        sensorsData.forEach(sensor => {
          // 센서 데이터에서 날짜 정보 찾기
          for (const field of dateFields) {
            if (sensor[field]) {
              const date = new Date(sensor[field]);
              if (!isNaN(date.getTime())) {
                // 유효한 날짜인 경우
                if (date < minDate) minDate = new Date(date);
                if (date > maxDate) maxDate = new Date(date);
                hasDateData = true;
              }
            }
          }
          
          // 중첩된 데이터 구조도 확인
          if (sensor.data && Array.isArray(sensor.data)) {
            sensor.data.forEach(item => {
              for (const field of dateFields) {
                if (item[field]) {
                  const date = new Date(item[field]);
                  if (!isNaN(date.getTime())) {
                    // 유효한 날짜인 경우
                    if (date < minDate) minDate = new Date(date);
                    if (date > maxDate) maxDate = new Date(date);
                    hasDateData = true;
                  }
                }
              }
            });
          }
        });
      }
      
      // 최소/최대 날짜 로그 출력
      if (hasDateData) {
        console.log('데이터 날짜 범위:', minDate, '~', maxDate);
        
        // 데이터 시작 연도와 끝 연도 설정
        const dataStartYear = minDate.getFullYear();
        const dataEndYear = maxDate.getFullYear();
        
        // 데이터가 있는 연도 범위만 설정
        const availableYearsFromData = [];
        for (let y = dataStartYear; y <= dataEndYear; y++) {
          availableYearsFromData.push(y);
        }
        
        if (availableYearsFromData.length > 0) {
          setAvailableYears(availableYearsFromData);
          setSelectedYear(availableYearsFromData[availableYearsFromData.length - 1].toString()); // 가장 최신 연도 선택
          
          // 월도 설정
          setAvailableMonths(Array.from({ length: 12 }, (_, i) => i + 1));
          const latestMonth = maxDate.getMonth() + 1; // 0부터 시작하므로 +1
          setSelectedMonth(latestMonth.toString());
          
          // 일 수 설정 (월에 따라 자동 설정됨)
          const latestDay = maxDate.getDate();
          setSelectedDay(latestDay.toString());
        }
      } else {
        // 날짜 데이터가 없는 경우 기본값 설정
        console.log('센서 데이터에서 날짜 정보를 찾을 수 없음, 기본값 사용');
        setAvailableYears(years);
        setAvailableMonths(Array.from({ length: 12 }, (_, i) => i + 1));
        
        // 현재 날짜 설정
        const now = new Date();
        setSelectedYear(now.getFullYear().toString());
        setSelectedMonth((now.getMonth() + 1).toString());
        setSelectedDay(now.getDate().toString());
      }
    } catch (error) {
      console.error('날짜 데이터 추출 중 오류 발생:', error);
      
      // 오류 발생 시 기본값 설정
      const startYear = 2023;
      const thisYear = new Date().getFullYear();
      const years = [];
      for (let y = startYear; y <= thisYear; y++) {
        years.push(y);
      }
      
      setAvailableYears(years);
      setAvailableMonths(Array.from({ length: 12 }, (_, i) => i + 1));
      
      // 현재 날짜 설정
      const now = new Date();
      setSelectedYear(now.getFullYear().toString());
      setSelectedMonth((now.getMonth() + 1).toString());
      setSelectedDay(now.getDate().toString());
    }
  };

  // 돈사 이름을 한글로 변환하는 함수
  const getKoreanSectionName = (section) => {
    if (!section) return '';
    
    // type이 영문인 경우 한글로 변환
    return sectionTypeToKorean[section.type] || section.name;
  };

  // 필터 상태 업데이트 함수
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
      day: selectedDay,
      showGraph: true // 그래프 표시 플래그 설정
    };
    
    console.log("필터 데이터 자동 업데이트:", filterData);
    onFilterChange(filterData);
  }, [
    selectedFarm, 
    selectedYear, 
    selectedMonth, 
    selectedDay, 
    onFilterChange
  ]);

  // 검색 실행 함수
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
      day: selectedDay,
      showGraph: true // 그래프 표시 플래그 설정
    });
  }, [
    selectedSection, 
    selectedFarm, 
    sensors, 
    selectedYear, 
    selectedMonth, 
    selectedDay, 
    onFilterChange
  ]);

  // 센서 데이터로부터 사용 가능한 날짜 여부 확인
  const checkDateHasData = useCallback((year, month, day) => {
    // 날짜 유효성 기본 검사
    const selectedDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // 미래 날짜는 데이터가 없음
    if (selectedDate > today) {
      return false;
    }
    
    // 센서 데이터가 없는 경우 현재 날짜까지만 유효
    if (!sensors || sensors.length === 0) {
      // 2023년 이전 데이터는 없다고 가정
      if (year < 2023) {
        return false;
      }
      
      // 오늘 이전 날짜는 모두 데이터가 있다고 가정
      return true;
    }
    
    // 이 부분은 실제 센서 데이터의 구조에 따라 맞춤 구현 필요
    // 여기서는 간단히 올해 데이터만 있다고 가정
    const currentYear = new Date().getFullYear();
    
    // 센서 데이터에 해당 날짜가 포함되어 있는지 확인하는 코드를 여기에 추가
    // 현재는 단순히 2023년 이후 현재까지의 날짜는 데이터가 있다고 가정
    return year >= 2023 && year <= currentYear;
  }, [sensors]);
  
  // 월 선택 변경 시 일 수 조정
  useEffect(() => {
    if (!selectedYear || !selectedMonth) return;
    
    // 선택한 월에 맞는 일 수 계산
    let daysInMonth = 31;
    
    // 월별 일수 계산
    if (selectedMonth === '4' || selectedMonth === '6' || 
        selectedMonth === '9' || selectedMonth === '11') {
      daysInMonth = 30;
    } else if (selectedMonth === '2') {
      // 윤년 계산
      const year = parseInt(selectedYear);
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth = 29;
      } else {
        daysInMonth = 28;
      }
    }
    
    // 해당 월에 맞는 일 수 설정
    setAvailableDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    
    // 선택된 일이 해당 월의 최대 일수보다 크면 조정
    if (selectedDay && parseInt(selectedDay) > daysInMonth) {
      setSelectedDay('1');
    }
  }, [selectedYear, selectedMonth, selectedDay]);
  
  // 날짜 선택 시 필터 업데이트
  useEffect(() => {
    if (selectedSection && sensors.length > 0 && 
        selectedYear && selectedMonth && selectedDay) {
      
      // 필터 업데이트
      updateFilterState(selectedSection, sensors);
    }
  }, [
    selectedYear, 
    selectedMonth, 
    selectedDay, 
    updateFilterState, 
    selectedSection, 
    sensors
  ]);

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

      {/* 센서 정보 표시 */}
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

      {/* 시간 선택 영역 - 주차 드롭다운 제거 및 월에 따른 일 수 조정 */}
      <div className="time-grid">
        <div className="time-column">
          <label>년도</label>
          <select 
            value={selectedYear} 
            onChange={e => setSelectedYear(e.target.value)}
            disabled={!selectedSection}
          >
            <option value="">년도 선택</option>
            {availableYears.map(year => (
              <option 
                key={`year-${year}`} 
                value={year}
                disabled={!checkDateHasData(year, 1, 1)} // 해당 연도에 데이터가 없으면 비활성화
              >
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="time-column">
          <label>월</label>
          <select 
            value={selectedMonth} 
            onChange={e => setSelectedMonth(e.target.value)}
            disabled={!selectedYear}
          >
            <option value="">월 선택</option>
            {availableMonths.map(month => {
              const hasData = checkDateHasData(
                parseInt(selectedYear), 
                month, 
                1
              );
              return (
                <option 
                  key={`month-${month}`} 
                  value={month}
                  disabled={!hasData} // 해당 월에 데이터가 없으면 비활성화
                >
                  {month}월
                </option>
              );
            })}
          </select>
        </div>

        <div className="time-column">
          <label>일</label>
          <select 
            value={selectedDay} 
            onChange={e => setSelectedDay(e.target.value)}
            disabled={!selectedMonth}
          >
            <option value="">일 선택</option>
            {availableDays.map(day => {
              const hasData = checkDateHasData(
                parseInt(selectedYear), 
                parseInt(selectedMonth), 
                day
              );
              return (
                <option 
                  key={`day-${day}`} 
                  value={day}
                  disabled={!hasData} // 해당 일에 데이터가 없으면 비활성화
                >
                  {day}일
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;