import {css} from '@emotion/css';
import {createRoot} from 'react-dom/client';
import {useEffect, useMemo, useRef} from 'react';

import '@fontsource/kaushan-script';
import './styles/index.scss';

const App = () => {
  const reqId = useRef(null);
  const radialGradientDomRef = useRef(null);
  const animate = ({stopDomList, displacement, speed}, time) => {
    stopDomList.map((stopDom, i) => {
      stopDom.setAttributeNS(null, 'offset', (i - 2) * 10 + displacement + '%');
    });

    if (displacement <= 20) {
      displacement += speed;
    } else {
      displacement = 0;
    }

    reqId.current = window.requestAnimationFrame((time) => {
      return animate({stopDomList, displacement, speed}, time);
    });
  };

  useEffect(() => {
    const stopDomList = [...radialGradientDomRef.current.children];
    let displacement = 0;
    let speed = 0.2;
    animate({stopDomList, displacement, speed}, 0);

    return () => {
      if (reqId.current) {
        window.cancelAnimationFrame(reqId.current);
      }
    };
  }, []);

  return (
    <div
      className={css`
        display: grid;
        place-items: center;
        min-height: 100vh;
        width: 100%;
      `}
    >
      <div
        className={css`
          max-width: 100vw;
          height: 100vh;
          width: 100%;
        `}
      >
        <svg
          className={css`
            display: block;
            width: 100%;
            height: 100%;
          `}
        >
          <defs>
            {/* sine waveとかにできたら、応用効きそう */}
            <radialGradient id="rg" r=".9" ref={radialGradientDomRef}>
              <stop offset="0%" stopColor="#f00"></stop>
              <stop offset="10%" stopColor="#000"></stop>
              <stop offset="20%" stopColor="#f00"></stop>
              <stop offset="30%" stopColor="#000"></stop>
              <stop offset="40%" stopColor="#f00"></stop>
              <stop offset="50%" stopColor="#000"></stop>
              <stop offset="60%" stopColor="#f00"></stop>
              <stop offset="70%" stopColor="#000"></stop>
              <stop offset="80%" stopColor="#f00"></stop>
              <stop offset="90%" stopColor="#000"></stop>
              <stop offset="100%" stopColor="#f00"></stop>
            </radialGradient>
            <rect id="witness" width="300" height="300" fill="url(#rg)"></rect>
          </defs>
          <use href="#witness" />
        </svg>
      </div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
