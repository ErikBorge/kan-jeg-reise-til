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
  const [localCanTravel, setLocalCanTravel] = useState(false);
  const [localCanTravelToSomeButNotAll, setLocalCanTravelToSomeButNotAll] =
    useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasRunOnce, setHasRunOnce] = useState(false);
  const [play, setPlay] = useState(true);
  const [pause, setPause] = useState(true);
  // const [reverse, setReverse] = useState(false);
  const getDefaultOptions = () => {
    let animation;
    if (hasRunOnce) {
      if (chosenCountry) {
        if (localCanTravelToSomeButNotAll) {
          animation = noytral;
        } else if (localCanTravel) {
          animation = glad;
        } else {
          animation = lei_seg;
        }
      } else {
        if (localCanTravelToSomeButNotAll) {
          animation = noytral_revers;
        } else if (localCanTravel) {
          animation = glad_revers;
        } else {
          animation = lei_seg_revers;
        }
      }
    } else {
      animation = glad;
    }

    return {
      loop: false,
      autoplay: false,
      animationData: animation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        filterSize: {
          width: "600%",
          height: "600%",
          x: "-200%",
          y: "-200%",
        },
      },
    };
  };

  useEffect(() => {
    setIsMounted(true);
    // setPause(!pause);
  }, []);

  useEffect(() => {
    // console.log(
    //   "chosenCountry",
    //   chosenCountry,
    //   "canTravel",
    //   canTravel,
    //   "pause",
    //   pause
    // );
  });
  useEffect(() => {
    if (isMounted) {
      setPause(!pause);
    }
    if (chosenCountry && !hasRunOnce) {
      setHasRunOnce(true);
    }
  }, [chosenCountry]);
  // console.log("redraw");

  useEffect(() => {
    if (chosenCountry) {
      if (chosenCountry.data.length > 1) {
        let someButNotAll = false;
        let all = true;
        chosenCountry.data.map((region) => {
          if (region.value !== "2" && region.value !== "3") {
            someButNotAll = true;
          } else {
            all = false;
          }
        });
        if (all) {
          setLocalCanTravel(true);
          setLocalCanTravelToSomeButNotAll(false);
        } else if (someButNotAll) {
          setLocalCanTravel(true);
          setLocalCanTravelToSomeButNotAll(true);
        }
      } else {
        chosenCountry.data.map((region) => {
          if (region.value !== "2" && region.value !== "3") {
            setLocalCanTravel(true);
            setLocalCanTravelToSomeButNotAll(false);
          } else {
            setLocalCanTravel(false);
            setLocalCanTravelToSomeButNotAll(false);
          }
        });
      }
    } else {
      setLocalCanTravel(false);
      setLocalCanTravelToSomeButNotAll(false);
    }
  }, [chosenCountry]);

  const lottieRef = useRef(null);
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
            // setHasRunOnce(true);
            // setReverse(!reverse);
          },
        },
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
