import { useEffect, useRef } from 'react';
import { createUseGesture, dragAction, pinchAction } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import WorldMap from './assets/world-map.svg?react';
import classes from './App.module.css';

const MIN_ZOOM = 1;
const MAX_ZOOM = 20;

const useGesture = createUseGesture([dragAction, pinchAction]);

function App() {
  const svgRef = useRef();
  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    rotateZ: 0,
  }));

  useGesture(
    {
      onDrag: ({ pinching, cancel, offset: [x, y] }) => {
        if (pinching) return cancel();
        api.start({ x, y });
      },
      onPinch: ({ origin: [ox, oy], first, movement: [ms], offset: [s, a], memo }) => {
        if (first) {
          const { width, height, x, y } = svgRef.current.getBoundingClientRect();
          const tx = ox - (x + width / 2);
          const ty = oy - (y + height / 2);
          memo = [style.x.get(), style.y.get(), tx, ty];
        }

        const x = memo[0] - (ms - 1) * memo[2];
        const y = memo[1] - (ms - 1) * memo[3];
        api.start({ scale: s, rotateZ: a, x, y });
        return memo;
      },
    },
    {
      target: svgRef,
      drag: { from: () => [style.x.get(), style.y.get()] },
      pinch: { scaleBounds: { min: MIN_ZOOM, max: MAX_ZOOM }, rubberband: true },
    },
  );

  useEffect(() => {
    const gestureHandler = (event) => {
      event.preventDefault();
    };

    document.addEventListener('gesturestart', gestureHandler);
    document.addEventListener('gesturechange', gestureHandler);
    document.addEventListener('gestureend', gestureHandler);

    return () => {
      document.removeEventListener('gesturestart', gestureHandler);
      document.removeEventListener('gesturechange', gestureHandler);
      document.removeEventListener('gestureend', gestureHandler);
    };
  }, []);

  return (
    <main>
      <h1 className={classes.title}>SVG - Zoom, Pan, Pinch</h1>
      <animated.div className={classes.svgContainer} ref={svgRef} style={style}>
        <WorldMap />
      </animated.div>
    </main>
  );
}

export default App;
