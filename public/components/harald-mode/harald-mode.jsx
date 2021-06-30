import { useState, useEffect } from "react";
import Image from "next/image";

import LilBubBody from "../../assets/lilbub-body.png";
import LilBubHead from "../../assets/lilbub-head.png";
import Explosion from "../../assets/explosion.gif";
import Laser from "../../assets/laser.mp3";

const HaraldMode = ({ hasCheeseBurger }) => {
  const laserSound = new Audio(Laser);

  useEffect(() => {
    if (hasCheeseBurger) {
      // Fade in mr. LilBub
      //   document.getElementById("lilBubDiv").style.left = "0";

      // Attach onclicks to all elements in laser cat mode
      Array.from(document.getElementsByTagName("div")).forEach((item, i) => {
        if (item.id !== "root" && item.id !== "app") {
          item.addEventListener("click", (e) => destroyElement(e), true);
        }
      });

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
    }
  });

  // Destroys the clicked element
  const destroyElement = (e) => {
    // if (e.target.id === "lilbub") {
    //   setTimeout(() => {
    //     alert("NOOOOO YOU KILLED LILBUB");
    //     window.location.reload(false);
    //   }, 1100);
    // }
    // e.target.style.display = "none";
    console.log(e);
    const element = document.getElementById("explosion");
    const newElement = document.body.appendChild(element);
    newElement.style.display = "block";
    newElement.style.top = e.clientY + "px";
    newElement.style.left = e.clientX + "px";
    newElement.style.transform = "translateX(-50%) translateY(-50%)";
    // document.body.appendChild(element);
    laserSound.play();
    setTimeout(() => {
      //   document.body.removeChild(element);
      laserSound.pause();
      laserSound.currentTime = 0;
      newElement.style.display = "none";
    }, 1000);
  };

  // Rotates LilBub's head to pouse position
  const rotateLilBub = (bub, posX, posY) => {
    bub.style.transform = `rotate(${-Math.atan2(posY, posX)}rad)`;
  };

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
    <>
      {hasCheeseBurger && (
        <>
          {/* <div className="lilbub" id="lilBubDiv">
            <div
              id="lilbub"
              style={{
                position: "absolute",
                bottom: "120px",
                left: "0",
                width: "180px",
                zIndex: "10",
                transformOrigin: "center 80%",
              }}
            >
              <Image src={LilBubHead} alt="Lil Bub" width={180} height={100} />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "0",
                width: "250px",
              }}
            >
              <Image src={LilBubBody} alt="Lil Bub" width={250} height={200} />
            </div> */}
          <div
            id="explosion"
            style={{
              position: "absolute",
              display: "none",
              width: "150px",
              height: "150px",
            }}
          >
            <Image src={Explosion} alt="explosion" width={150} height={150} />
          </div>
          {/* </div> */}
        </>
      )}
    </>
  );
};

export default HaraldMode;
