import {css} from '@emotion/css';
import {createRoot} from 'react-dom/client';
import {useEffect, useMemo, useRef} from 'react';
import gsap from 'gsap';
import imageToBase64 from 'image-to-base64/browser';
import SimplexNoise from 'simplex-noise';

import rippleWater from './assets/pexels-pixabay-261403.jpg';

import '@fontsource/kaushan-script';
import './styles/index.scss';

const App = () => {
  const feTurbulenceDomRef = useRef(null);
  const tl = useMemo(() => {
    return gsap.timeline({
      onComplete: function () {
        tl.reverse(0);
      },
      onReverseComplete: function () {
        tl.play(0);
      },
    });
  }, []);

  const simplex = useMemo(() => {
    return new SimplexNoise();
  }, []);

  useEffect(() => {
    const feTurbulenceDom = feTurbulenceDomRef.current;
    tl.to(
      feTurbulenceDom,
      5,
      {
        onUpdate: function () {
          const t = this.progress();
          // const noise = simplex.noise2D(t * 0.005, t * 0.005);
          // const bfX = noise + 0.02,
          //   bfY = noise + 0.1;
          const bfX = t * 0.005 + 0.02,
            bfY = t * 0.05 + 0.1;
          const bfStr = bfX.toString() + ' ' + bfY.toString();
          feTurbulenceDom.setAttribute('baseFrequency', bfStr);
        },
      },
      0
    );
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
            background-image: url(${rippleWater});
            background-size: cover;
            filter: url('#turbulence');
            z-index: 2;
          `}
        />
        <div
          className={css`
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-image: url(${rippleWater});
            background-size: cover;
            z-index: 1;
          `}
        />
        <svg xlmns="http://www.w3.org/2000/svg" version="1.1">
          <filter
            id="turbulence"
            filterUnits="objectBoundingBox"
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <feTurbulence
              ref={feTurbulenceDomRef}
              id="feturbulence"
              type="fractalNoise"
              numOctaves="1"
              seed="2"
              baseFrequency="0.01968375 0.1468375"
            ></feTurbulence>
            <feDisplacementMap
              xChannelSelector="G"
              yChannelSelector="B"
              scale="25"
              in="SourceGraphic"
            ></feDisplacementMap>
          </filter>
        </svg>
      </div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
