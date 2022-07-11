import {css} from '@emotion/css';
import {createRoot} from 'react-dom/client';
import {useEffect, useMemo, useRef} from 'react';
import gsap from 'gsap';
import imageToBase64 from 'image-to-base64/browser';

import rippleWater from './assets/pexels-pixabay-261403.jpg';

import '@fontsource/kaushan-script';
import './styles/index.scss';

const App = () => {
  const feImageDomRef = useRef(null);
  const tl = useMemo(() => {
    return gsap.timeline({repeat: -1, repeatDelay: 1});
  }, []);

  useEffect(() => {
    tl.from('#displacement-map', 1.5, {attr: {scale: 100}}, 0).to(
      'feImage',
      1.5,
      {attr: {x: 125, y: 125, width: '20%', height: '20%'}},
      0
    );
  }, []);

  useEffect(() => {
    const xlink = 'http://www.w3.org/1999/xlink';
    // const imgUrl =
    //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/ripple512.png';
    // const imgUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/13842/disp.jpg`;
    const imgUrl = `https://res.cloudinary.com/dvxikybyi/image/upload/v1486634113/2yYayZk_vqsyzx.png`;
    // const imgUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/zeldaWaves.png`;
    const feImage = feImageDomRef.current;

    imageToBase64(imgUrl)
      .then((data) => {
        feImage.setAttributeNS(
          xlink,
          'xlink:href',
          `data:image/png;base64,${data}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
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
            <filter id="ripple-filter">
              <feImage
                ref={feImageDomRef}
                x="1200"
                y="300"
                width="0%"
                height="0%"
                result="rippleImage"
              />

              <feDisplacementMap
                id="displacement-map"
                xChannelSelector="R"
                yChannelSelector="G"
                in="SourceGraphic"
                in2="rippleImage"
                result="displacementMap"
                colorInterpolationFilters="sRGB"
                scale="0"
              />

              <feComposite operator="in" in2="rippleImage"></feComposite>
            </filter>
          </defs>

          <g id="logo">
            <image
              id="logo-image"
              width={'100%'}
              // height={"100%"}
              href={rippleWater}
            />

            <image
              id="logo-overlay"
              width={'100%'}
              // height={"100%"}
              href={rippleWater}
              filter="url(#ripple-filter)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
