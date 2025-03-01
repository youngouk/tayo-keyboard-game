import React, { useState, useEffect } from 'react';
import './App.css';

// 이미지 파일 가져오기
import tayoImage from './images/tayo.png';
import rogiImage from './images/rogi.png';
import raniImage from './images/rani.png';
import ganiImage from './images/gani.png';

/**
 * 알파벳과 숫자 키보드 게임 컴포넌트
 * 어린이들이 키보드를 누르면 알파벳/숫자가 표시되거나 차량이 나타나는 상호작용형 게임
 */
const App = () => {
  // 상태 관리
  const [key, setKey] = useState(null);                  // 눌린 키 값 저장
  const [showVehicle, setShowVehicle] = useState(false); // 차량 표시 여부
  const [vehiclePosition, setVehiclePosition] = useState(0); // 차량 위치
  const [animation, setAnimation] = useState(false);     // 애니메이션 상태
  const [backgroundColor, setBackgroundColor] = useState('#f8f9fa'); // 배경색
  const [currentVehicle, setCurrentVehicle] = useState('bus-tayo'); // 현재 차량 타입

  /**
   * 문자가 알파벳 또는 숫자인지 확인하는 함수
   * @param {string} char - 검사할 문자
   * @returns {boolean} - 알파벳/숫자 여부
   */
  const isAlphaNumeric = (char) => {
    return /^[a-zA-Z0-9]$/.test(char);
  };

  /**
   * 부드러운 배경 색상을 랜덤하게 생성하는 함수
   * @returns {string} - 색상 코드 (HEX)
   */
  const getSoftColor = () => {
    const colors = [
      '#f8f9fa', '#e9ecef', '#dee2e6', '#f1f3f5', 
      '#edf2fb', '#e2eafc', '#d7e3fc', '#ccdbfd', 
      '#fff1e6', '#fde2e4', '#fad2e1', '#e2ece9'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  /**
   * 글자 색상을 랜덤하게 생성하는 함수
   * @returns {string} - 색상 코드 (HEX)
   */
  const getTextColor = () => {
    const colors = [
      '#1a73e8', '#4285f4', '#34a853', '#ea4335', 
      '#5f6368', '#1e88e5', '#43a047', '#e53935', 
      '#fb8c00', '#8e24aa', '#3949ab', '#039be5'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  /**
   * 랜덤한 차량 타입을 선택하는 함수
   * @returns {string} - 차량 타입 식별자
   */
  const selectRandomVehicle = () => {
    const vehicles = ['bus-tayo', 'bus-rogi', 'bus-rani', 'bus-gani'];
    return vehicles[Math.floor(Math.random() * vehicles.length)];
  };

  // 키보드 이벤트 핸들러 설정 (컴포넌트 마운트 시 1회만 실행)
  useEffect(() => {
    /**
     * 키 입력을 처리하는 이벤트 핸들러
     * @param {KeyboardEvent} event - 키보드 이벤트 객체
     */
    const handleKeyDown = (event) => {
      // 눌린 키 가져오기
      const pressedKey = event.key;
      
      // 배경 색상 변경 (부드럽게)
      setBackgroundColor(getSoftColor());
      
      // 알파벳이나 숫자인 경우: 키 표시
      if (isAlphaNumeric(pressedKey)) {
        setKey(pressedKey);
        setShowVehicle(false);
        setAnimation(true);
        setTimeout(() => setAnimation(false), 500);
      } 
      // 다른 키인 경우: 차량 표시
      else {
        setKey(null);
        setShowVehicle(true);
        setCurrentVehicle(selectRandomVehicle());
        setVehiclePosition(prevPosition => (prevPosition + 100) % 800);
        setAnimation(true);
        setTimeout(() => setAnimation(false), 500);
      }
    };

    // 이벤트 리스너 등록 및 정리
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  /**
   * 현재 차량 타입에 맞는 UI를 렌더링하는 함수
   * @returns {JSX.Element} - 차량 UI 컴포넌트
   */
  const renderVehicle = () => {
    const scale = animation ? 1.2 : 1;
    
    switch(currentVehicle) {
      case 'bus-tayo':
        return (
          <div className="vehicle">
            <img 
              src={tayoImage} 
              alt="타요" 
              className="vehicle-image"
              style={{ transform: `scale(${scale})` }}
            />
            <p className="vehicle-name">타요</p>
          </div>
        );
      case 'bus-rogi':
        return (
          <div className="vehicle">
            <img 
              src={rogiImage} 
              alt="로기" 
              className="vehicle-image"
              style={{ transform: `scale(${scale})` }}
            />
            <p className="vehicle-name">로기</p>
          </div>
        );
      case 'bus-rani':
        return (
          <div className="vehicle">
            <img 
              src={raniImage} 
              alt="라니" 
              className="vehicle-image"
              style={{ transform: `scale(${scale})` }}
            />
            <p className="vehicle-name">라니</p>
          </div>
        );
      case 'bus-gani':
        return (
          <div className="vehicle">
            <img 
              src={ganiImage} 
              alt="가니" 
              className="vehicle-image"
              style={{ transform: `scale(${scale})` }}
            />
            <p className="vehicle-name">가니</p>
          </div>
        );
      default:
        return (
          <div className="vehicle">
            <img 
              src={tayoImage} 
              alt="타요" 
              className="vehicle-image"
              style={{ transform: `scale(${scale})` }}
            />
            <p className="vehicle-name">타요</p>
          </div>
        );
    }
  };

  // 메인 UI 렌더링
  return (
    <div className="app-container" style={{ backgroundColor }}>
      <div className="title-container">
        <h1 className="main-title">알파벳과 숫자 키보드 게임</h1>
        <p className="subtitle">아무 키나 눌러보세요!</p>
      </div>

      {/* 게임 화면 영역 */}
      <div className="game-area">
        {/* 알파벳/숫자 표시 */}
        {key && (
          <div 
            className={`key-display ${animation ? 'animated' : ''}`}
            style={{ color: getTextColor() }}
          >
            {key.toUpperCase()}
          </div>
        )}
        
        {/* 차량 표시 */}
        {showVehicle && (
          <div 
            className={`vehicle-display ${animation ? 'animated' : ''}`}
            style={{ left: `${vehiclePosition}px` }}
          >
            {renderVehicle()}
          </div>
        )}
      </div>

      {/* 게임 설명 영역 */}
      <div className="instruction-container">
        <h2 className="instruction-title">어떻게 놀아요?</h2>
        <ul className="instruction-list">
          <li className="instruction-item">
            <span className="instruction-badge">A-Z, 0-9</span>
            <span className="instruction-text">키를 눌러 알파벳과 숫자를 봐요!</span>
          </li>
          <li className="instruction-item">
            <span className="instruction-badge green">다른 키</span>
            <span className="instruction-text">여러 종류의 버스가 나와요!</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;