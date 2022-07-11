import {css} from '@emotion/css';
import {createRoot} from 'react-dom/client';
import sea from './assets/sea.jpg';
import seaMap from './assets/sea-map.png';

import '@fontsource/kaushan-script';
import './styles/index.scss';

const App = () => {
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
          position: relative;
        `}
      >
        <div
          className={css`
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-image: url(${sea});
            background-size: cover;
          `}
        >
          <div
            className={css`
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              background-image: url(${seaMap});
              background-size: cover;
              filter: url('#turbulence');
            `}
          ></div>
        </div>

        <svg>
          <filter id="turbulence" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              id="sea-filter"
              numOctaves="3"
              seed="2"
              baseFrequency="0.02 0.05"
            ></feTurbulence>
            <feDisplacementMap
              scale="20"
              in="SourceGraphic"
            ></feDisplacementMap>
            <animate
              href="#sea-filter"
              attributeName="baseFrequency"
              dur="60s"
              keyTimes="0;0.5;1"
              values="0.02 0.06;0.04 0.08;0.02 0.06"
              repeatCount="indefinite"
            />
          </filter>
        </svg>
      </div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
