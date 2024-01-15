import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../assets/Anim.json'; 

const LottieAnimation = () => {
  const animationContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return <div ref={animationContainer}></div>;
};

export default LottieAnimation;