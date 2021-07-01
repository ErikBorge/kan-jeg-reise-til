import { useState, useEffect } from "react";
import Image from "next/image";

import Explosion from "../../assets/explosion.gif";

const HaraldMode = ({ hasCheeseBurger }) => {
  const [startAgain, setStartAgain] = useState(true);
  const [clearIntervalVar, setClearIntervalVar] = useState(false);
  const arr = Array.from(document.getElementsByTagName("div"));

  // const makeSomeNoise = (reset) => {
  //   let interval = setInterval(() => {
  //     if (hasCheeseBurger) {
  //       let index = Math.floor(Math.random() * (arr.length + 1));
  //       fuckup(index);
  //     }
  //     if (reset) {
  //       clearInterval(interval);
  //       cleanup();
  //     }
  //   }, 400);
  // };

  const fuckup = (i) => {
    if (arr[i] && arr[i].style) {
      arr[i].style.filter = `hue-rotate(${Math.random() * "180"}deg)`;
      arr[i].style.backgroundColor = `rgb(${Math.random() * 255}, ${
        Math.random() * 255
      }, ${Math.random() * 255})`;
    }
  };
  const cleanup = () => {
    arr.forEach((item, i) => {
      item.style.filter = "none";
    });
  };
  useEffect(() => {
    let element = document.getElementById("explosion");
    let newElement = document.body.appendChild(element);
    // let newElement2 = document.body.appendChild(element.cloneNode(true));
    if (hasCheeseBurger) {
      newElement.style.display = "block";
      // newElement2.style.display = "block";
      // trigger vercel committttt
    }
    let interval = setInterval(() => {
      newElement.style.top =
        Math.floor(Math.random() * (window.innerHeight - 75 - 75 + 1)) +
        75 +
        "px";
      newElement.style.left =
        Math.floor(Math.random() * (window.innerWidth - 150 + 1)) + "px";
    }, 1000);
    // let interval2 = setInterval(() => {
    //   newElement2.style.top =
    //     Math.floor(Math.random() * (window.innerHeight - 75 - 75 + 1)) +
    //     75 +
    //     "px";
    //   newElement2.style.left =
    //     Math.floor(Math.random() * (window.innerWidth - 75 - 75 + 1)) +
    //     75 +
    //     "px";
    // }, 800);
    // console.log("started");
    if (!hasCheeseBurger) {
      clearInterval(interval);
      // clearInterval(interval2);
    }

    // Fade in mr. LilBub
    //   document.getElementById("lilBubDiv").style.left = "0";
    // Attach onclicks to all elements in laser cat mode
    //   Array.from(document.getElementsByTagName("div")).forEach((item, i) => {
    //     if (item.id !== "root" && item.id !== "app") {
    //       item.addEventListener("click", (e) => destroyElement(e), true);
    //     }
    //   });
    // console.log("starting");
    // makeSomeNoise();
    // arr.forEach((item, i) => {
    //   if (item.id !== "root" && item.id !== "app") {
    //     let timeout = setTimeout(() => {
    //       item.style.filter = `hue-rotate(${Math.random() * "180"}deg)`;
    //     }, 800 * i);
    //     if (i === arr.length - 1) {
    //       console.log("reached end at index ", i);
    //       clearInterval(timeout);
    //       setStartAgain(!startAgain);
    //     }
    //   }
    // });
    // clearInterval(interval);
    //   alert("LASER CAT MODE! Click to destroy.");
    // TODO: this doesn't remove the react onClick handler. Fix
    // getElementsByIdStartsWith('history-content', 'div', 'history-element').forEach((element) => {
    //   element.onclick = null;
    // })
    // Rotate head according to mouse position
    //   document.body.addEventListener("mousemove", (e) => {
    //     rotateLilBub(
    //       document.getElementById("lilbub"),
    //       e.clientX,
    //       window.innerHeight - e.clientY
    //     );
    //   });
    // }
    return () => {
      // console.log("stopped");
      // cleanup();
      // makeSomeNoise(true);
      clearInterval(interval);
      // clearInterval(interval2);
      newElement.style.display = "none";
      // newElement2.style.display = "none";
      // arr.forEach((item, i) => {
      //   item.style.filter = "unset";
      // });
    };
  }, [hasCheeseBurger]);

  // Destroys the clicked element
  // const destroyElement = (e) => {
  //   // if (e.target.id === "lilbub") {
  //   //   setTimeout(() => {
  //   //     alert("NOOOOO YOU KILLED LILBUB");
  //   //     window.location.reload(false);
  //   //   }, 1100);
  //   // }
  //   // e.target.style.display = "none";
  //   console.log(e);
  //   const element = document.getElementById("explosion");
  //   const newElement = document.body.appendChild(element);
  //   newElement.style.display = "block";
  //   newElement.style.top = e.clientY + "px";
  //   newElement.style.left = e.clientX + "px";
  //   newElement.style.transform = "translateX(-50%) translateY(-50%)";
  //   // document.body.appendChild(element);
  //   laserSound.play();
  //   setTimeout(() => {
  //     //   document.body.removeChild(element);
  //     laserSound.pause();
  //     laserSound.currentTime = 0;
  //     newElement.style.display = "none";
  //   }, 1000);
  // };

  // // Rotates LilBub's head to pouse position
  // const rotateLilBub = (bub, posX, posY) => {
  //   bub.style.transform = `rotate(${-Math.atan2(posY, posX)}rad)`;
  // };

  // TODO: works, but need to fix removal of onclick events further up in this file
  // const getElementsByIdStartsWith = (container, selectorTag, prefix) => {
  //   var items = [];
  //   var myPosts = document.getElementById(container).getElementsByTagName(selectorTag);
  //   for (var i = 0; i < myPosts.length; i++) {
  //       //omitting undefined null check for brevity
  //       if (myPosts[i].id.lastIndexOf(prefix, 0) === 0) {
  //           items.push(myPosts[i]);
  //       }
  //   }
  //   return items;
  // }

  return (
    // <>
    //   {hasCheeseBurger && (
    //     <>
    //       {/* <div className="lilbub" id="lilBubDiv">
    //         <div
    //           id="lilbub"
    //           style={{
    //             position: "absolute",
    //             bottom: "120px",
    //             left: "0",
    //             width: "180px",
    //             zIndex: "10",
    //             transformOrigin: "center 80%",
    //           }}
    //         >
    //           <Image src={LilBubHead} alt="Lil Bub" width={180} height={100} />
    //         </div>
    //         <div
    //           style={{
    //             position: "absolute",
    //             bottom: "20px",
    //             left: "0",
    //             width: "250px",
    //           }}
    //         >
    //           <Image src={LilBubBody} alt="Lil Bub" width={250} height={200} />
    //         </div> */}

    //       {/* </div> */}
    //     </>
    //   )}
    // </>
    <>
      <div
        id="explosion"
        style={{
          position: "absolute",
          display: "none",
          width: "150px",
          height: "150px",
          zIndex: "1000",
        }}
      >
        <Image src={Explosion} alt="explosion" width={150} height={150} />
      </div>
    </>
  );
};

export default HaraldMode;
