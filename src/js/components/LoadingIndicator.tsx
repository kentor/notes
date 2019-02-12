import React, {useEffect, useState, useRef} from 'react';

function* dotsGenerator() {
  for (;;) {
    yield 1;
    yield 2;
    yield 3;
    yield 2;
  }
}

function LoadingIndicator() {
  const dotsCounter = useRef(dotsGenerator());

  const nextCount = () => dotsCounter.current.next().value;

  const [dots, setDots] = useState(() => nextCount());

  useEffect(() => {
    const id = setInterval(() => {
      setDots(nextCount());
    }, 100);
    return () => {
      clearInterval(id);
    };
  }, []);

  return <>{'.'.repeat(dots)}</>;
}

export default LoadingIndicator;
