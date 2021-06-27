import React, { useState, useEffect, useRef } from "react";
import { isEqual } from "lodash";
import Lottie from "react-lottie";
import * as glad from "../../assets/glad.json";
import * as glad_revers from "../../assets/glad-revers.json";
import * as lei_seg from "../../assets/lei_seg.json";
import * as lei_seg_revers from "../../assets/lei_seg-revers.json";
import * as noytral from "../../assets/noytral.json";
import * as noytral_revers from "../../assets/noytral-revers.json";

const LottieControl = ({
  chosenCountry,
  canTravel,
  canTravelToSomeButNotAll,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [hasRunOnce, setHasRunOnce] = useState(false);
  const [play, setPlay] = useState(true);
  const [pause, setPause] = useState(true);
  const [reverse, setReverse] = useState(false);
  const getDefaultOptions = () => {
    let animation;
    if (!reverse) {
      if (canTravelToSomeButNotAll) {
        animation = noytral;
      } else if (canTravel) {
        animation = glad;
      } else {
        animation = lei_seg;
      }
    } else {
      if (canTravelToSomeButNotAll) {
        animation = noytral_revers;
      } else if (canTravel) {
        animation = glad_revers;
      } else {
        animation = lei_seg_revers;
      }
    }

    return {
      loop: false,
      autoplay: false,
      animationData: animation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        //original filter sizes
        // filterSize: {
        //   width: "300px",
        //   height: "500px",
        //   x: "-50%",
        //   y: "-100%",
        // },
        filterSize: {
          width: "600%",
          height: "600%",
          x: "-200%",
          y: "-200%",
        },
      },
    };
  };

  //   const changeAnimation = (reverse) => {
  //     let newAnimation;
  //     let newName;
  //     if (!reverse) {
  //       if (canTravelToSomeButNotAll) {
  //         newAnimation = noytral;
  //       } else if (canTravel) {
  //         newAnimation = glad;
  //       } else {
  //         newAnimation = lei_seg;
  //       }
  //     } else {
  //       if (canTravelToSomeButNotAll) {
  //         newAnimation = noytral_revers;
  //       } else if (canTravel) {
  //         newAnimation = glad_revers;
  //       } else {
  //         newAnimation = lei_seg_revers;
  //       }
  //     }

  //     // setDefaultOptions((prev) => ({
  //     //   ...prev,
  //     //   animationData: newAnimation,
  //     //   name: newName,
  //     // }));
  //   };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // useEffect(() => {
  //   console.log(
  //     "chosenCountry",
  //     chosenCountry,
  //     "canTravel",
  //     canTravel,
  //     "pause",
  //     pause,
  //     "reverse",
  //     reverse
  //   );
  // });
  useEffect(() => {
    if (isMounted) {
      setPause(!pause);
    }
    if (chosenCountry && hasRunOnce) {
      setReverse(false);
    } else {
      if (hasRunOnce) {
        setReverse(true);
      }
    }
    // setPause(!pause);
  }, [chosenCountry]);
  // console.log("redraw");

  const lottieRef = useRef(null);
  // console.log(lottieRef);
  return (
    <Lottie
      ref={lottieRef}
      options={getDefaultOptions()}
      // height={400}
      // width={400}
      isStopped={!play}
      isPaused={pause}
      isClickToPauseDisabled={true}
      eventListeners={[
        {
          eventName: "complete",
          callback: () => {
            // console.log("********** animation completed **********");
            setPause(true);
            setHasRunOnce(true);
            // setReverse(!reverse);
          },
        },
        // {
        //   eventName: "loopComplete",
        //   callback: () => {
        //     console.log("animation completed");
        //     setPause(true);
        //     changeAnimation(!reverse);
        //     setReverse(!reverse);
        //   },
        // },
      ]}
    />
  );
};

// export default LottieControl;
export default React.memo(LottieControl, (props, nextProps) => {
  if (isEqual(props, nextProps)) {
    return true;
  }
  return false;
});
