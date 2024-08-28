import { useState, useEffect } from 'react';

const useMaxScreenSize = () => {
  const [maxScreenSize, setMaxScreenSize] = useState({
    width: window.screen.width,  // 모니터의 최대 너비
    height: window.screen.height, // 모니터의 최대 높이
  });

  useEffect(() => {
    const updateMaxScreenSize = () => {
      setMaxScreenSize({
        width: window.screen.width,
        height: window.screen.height,
      });
    };

    // 이벤트 리스너는 필요 없지만, 여기서는 추가적인 업데이트를 위해 설정
    window.addEventListener('resize', updateMaxScreenSize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateMaxScreenSize);
    };
  }, []);

  return maxScreenSize;
};

export default useMaxScreenSize;