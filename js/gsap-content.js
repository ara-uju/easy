console.clear();
gsap.registerPlugin(ScrollTrigger);


/* Preload dynamic imgs */
let imgList = [];

for (let i = 1; i < 11; i++) {
  imgList[i - 1] = new Image();
  if (i >= 10) {
    imgList[i - 1].src = "../img/scene/" + i + ".png";
  } else {
    imgList[i - 1].src = "../img/scene/0" + i + ".png";
  }
}

window.onpagehide = () => {
  window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', function () {

  window.scroll(0, 0);

  //-----------------------------------------------
  // HERO

  let heroSection = document.querySelector(".hero");
  let cursorActive = false;

  document.querySelector(".mouse").style.transform = "translate3d(" + document.querySelector(".asterisk-container").parentNode.getBoundingClientRect().left + "px, " + document.querySelector(".asterisk-container").parentNode.getBoundingClientRect().top + "px,0px)";

  gsap.timeline()
    .to(document.querySelector(".preloader:before"), {
      opacity: 0,
      duration: .8,
      onComplete: () => {
        document.querySelector("body").classList.remove("preloader");
      }
    })
    .to(document.querySelector(".mouse"), {
      rotation: "360deg",
      duration: 3,
      repeat: -1,
      ease: Linear.easeNone
    })
    .from(document.querySelector(".mouse"), {
      delay: 1.4,
      opacity: 0,
      duration: 1,
      ease: "power1.out"
    }, "<");

  // Reveal
  gsap.timeline().fromTo(document.querySelector(".subheader-wrapper"), {
    xPercent: -14,
    opacity: 0
  },
    {
      xPercent: 0,
      opacity: 1,
      stagger: .1,
      delay: 0.5,
      duration: 1,
      ease: "power2.out"
    })
    .to(document.querySelectorAll(".header-wrapper .overlay"), {
      transform: "skew(-25deg)",
      delay: .5,
      width: 0,
      stagger: .1,
      duration: 1,
      ease: "power2.out"
    }, "<")
    .from(document.querySelectorAll(".header-wrapper h1"), {
      xPercent: -14,
      stagger: .1,
      duration: 1,
      ease: "power2.out"
    }, "<")
    .fromTo(document.querySelectorAll(".subheader-upper-wrapper .member-tag"), {
      xPercent: -10,
      opacity: 0
    },
      {
        xPercent: 0,
        opacity: 1,
        stagger: .25,
        delay: 0.5,
        duration: .8,
        ease: "power2.out"
      }, "<")
    .fromTo(document.querySelectorAll(".subheader-lower-wrapper .member-tag"), {
      xPercent: -10,
      opacity: 0
    },
      {
        xPercent: 0,
        opacity: 1,
        stagger: .25,
        duration: .8,
        ease: "power2.out"
      }, "<")
    .fromTo(document.querySelectorAll(".hero .single"), {
      xPercent: -20,
      opacity: 0
    },
      {
        xPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, "<")
    .to(document.querySelectorAll(".member-tag .overlay"), {
      transform: "skew(-25deg)",
      delay: .15,
      width: 0,
      stagger: .25,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {

        document.querySelector(".hero").classList.add("member-focusable");

        if (!cursorActive) {
          //document.querySelector(".cursor-container").appendChild(document.querySelector(".asterisk-container"));
          cursorActive = true;
        }
      }
    }, "<");

  document.querySelectorAll(".member-tag").forEach((member) => {
    let memberClassList = member.classList;
    let memberFocus = memberClassList[0].replace("member-tag", "") + memberClassList[1].replace("-tag", "");

    member.addEventListener("mouseover", () => {
      if (document.querySelector(".hero .container")) {
        document.querySelector(".hero .container").classList.add(memberFocus + "-focus");
      }
    });
    member.addEventListener("mouseout", () => {
      if (document.querySelector(".hero .container")) {
        document.querySelector(".hero .container").classList.remove(memberFocus + "-focus");
      }
    });
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      pin: true,
      start: "top top",
      end: "+=80%",
      scrub: 1,
      markers: false
    }
  })
    .to(document.querySelectorAll(".hero h1"), {
      filter: "blur(20px)"
    })
    .to(document.querySelectorAll(".hero h1"), {
      opacity: 0,
    });

  //-----------------------------------------------
  // GALLERY

  let galPanel = document.querySelectorAll(".gallery .member");
  let galWidth = (document.querySelector(".gallery .subsection").offsetWidth - innerWidth);

  // enter
  gsap.from(".gallery .container", {
    scrollTrigger: {
      trigger: ".gallery",
      start: "top 60%",
      end: "+=100%",
      scrub: 1
    },
    opacity: 0,
    yPercent: 80,
    filter: "blur(10px)"
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: ".gallery",
      pin: true,
      pinSpacing: "margin",
      start: "top top",
      scrub: 1,
      markers: false,
      end: () => "+=" + galWidth
    }
  })
    .to(galPanel, {
      xPercent: -100 * (galPanel.length - 1) - 100,
      ease: "none"
    })
    .to(document.querySelectorAll(".gallery img"), {
      xPercent: 28,
      stagger: .04,
      yPercent: -4
    }, "<");


  // Gallery Marquee
  let textWidthOffset = document.querySelectorAll(".gallery-marquee .text")[0].offsetWidth + document.querySelectorAll(".gallery-marquee .text")[1].offsetWidth + document.querySelectorAll(".gallery-marquee .text")[2].offsetWidth;

  gsap.timeline({
    scrollTrigger: {
      trigger: ".gallery",
      start: 'top top',
      end: ()=> galWidth*1.5,
      toggleActions: 'play pause resume resume'
    }
  }).fromTo(".gallery-marquee .text", {
    x: -textWidthOffset
  },
    {
      duration: 60,
      ease: "none",
      x: "+=" + textWidthOffset,
      /*modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % textWidthOffset) // reset x, reposition element seamlessly
      },*/
      repeat: -1
    });

  //-----------------------------------------------
  // SOUNDTRACKS

  let trackCs = document.querySelectorAll(".track-container");
  let trackCLeft = document.querySelector(".track-container-left");
  let trackCRight = document.querySelector(".track-container-right");
  let headerRevealed = false;

  gsap.timeline({
    scrollTrigger: {
      trigger: document.querySelector(".soundtracks"),
      start: "top 20%",
      end: "+=350%",
      scrub: true,
      toggleActions: "play reverse play reverse"
    }
  })
    .from(document.querySelector(".soundtracks .content"), {
      opacity: 0,
      duration: .2
    })
    .to(document.querySelector(".divider span"), {
      height: "100vh"
    });

  gsap.timeline({
    scrollTrigger: {
      trigger: document.querySelector(".soundtracks"),
      start: "top top",
      end: "+=350%",
      scrub: true,
      markers: false,
      pin: true,
      toggleActions: "play reverse play reverse",
      onEnterBack: () => {
        if (document.querySelector("body").classList.contains("THEBLACK")) {
          document.documentElement.style.setProperty('--background-color', 'var(--the-white)');
        }
      },
      onLeave: () => {
        if (document.querySelector("body").classList.contains("THEBLACK")) {
          document.documentElement.style.setProperty('--background-color', 'var(--the-black)');
        }
      }
    }
  })
    .from(document.querySelector(".soundtracks"), {
      opacity: 0,
      height: "0vh",
      duration: .8,
      ease: "power1.out"
    }, "<")
    .from(document.querySelector(".soundtracks h3"), {
      opacity: 0,
      xPercent: -15,
      duration: .8
    })
    .fromTo(trackCLeft.querySelector("h1"), {
      opacity: 0,
      xPercent: 150
    },
      {
        opacity: 1,
        xPercent: 0,
        duration: .4,
        ease: "power2.out",
        onComplete: () => {
          //scrambled code previously here
        }
      }, "<")
    .fromTo(trackCRight.querySelector("h1"), {
      opacity: 0,
      xPercent: -150
    },
      {
        opacity: 1,
        xPercent: 0,
        duration: .4,
        ease: "power2.out",
        onEnter: () => {
          trackCLeft.classList.remove("normalize-z");
          trackCRight.classList.remove("normalize-z");
        },
        onLeaveBack: () => {
          trackCLeft.classList.remove("normalize-z");
          trackCRight.classList.remove("normalize-z");
        },
        onLeave: () => {
          trackCLeft.classList.remove("normalize-z");
          trackCRight.classList.remove("normalize-z");
        },
        onComplete: () => {

          let textLeft = document.querySelector(".t-one").innerHTML;
          let textRight = document.querySelector(".t-two").innerHTML;

          // if body has no class and first time revealing
          if (textLeft && textRight && !document.querySelector("body").classList.length && !headerRevealed) {
            let scrambleTimeout = setTimeout(() => {
              scrambleText(document.querySelector(".t-two"), textRight);
              scrambleText(document.querySelector(".t-one"), textLeft);

              headerRevealed = true;

              trackCLeft.classList.add("normalize-z");
              trackCRight.classList.add("normalize-z");
              clearTimeout(scrambleTimeout);
            }, 400);
          }
        }
      }, "<");

  /*.fromTo(document.querySelectorAll(".track"), {
    opacity: 0
  },
    {
      opacity: 1,
      stagger: 0.15,
      duration: .5,
      onComplete: ()=>{
        trackCLeft.classList.add("normalize-z");
        trackCRight.classList.add("normalize-z");
      },
      onLeaveBack: ()=>  {
        trackCLeft.classList.add("normalize-z");
        trackCRight.classList.add("normalize-z");
      },
      onLeave: ()=>{
        trackCLeft.classList.remove("normalize-z");
        trackCRight.classList.remove("normalize-z");
      }
    }, "<");*/

  trackCs.forEach((tContainer) => {

    tContainer.addEventListener("mouseout", function () {
      document.querySelector(".soundtracks .container").classList.remove("hover-right");
      document.querySelector(".soundtracks .container").classList.remove("hover-left");

      let gtm = gsap.timeline({
        defaults: {
          overwrite: true
        }
      });

      gtm.to(trackCLeft, {
        width: "50%",
        skewX: 0,
        duration: .2,
        ease: "power4.out"
      }, "<")
        .to(trackCRight, {
          width: "50%",
          skewX: 0,
          duration: .2,
          ease: "power4.out"
        }, "<")
        .to(document.querySelectorAll(".inner h1"), {
          skewX: 0,
          duration: .2,
          ease: "power4.out"
        }, "<");

    });

    tContainer.addEventListener("mouseover", function () {

      let gtm = gsap.timeline({
        defaults: {
          overwrite: true
        }
      });

      let duration = .15;
      let ease = "power4.out";
      let skew = 20;
      let widthGrow = "80%";
      let widthShrink = "20%";

      // left side
      if (tContainer.classList.contains("track-container-left")) {
        document.querySelector(".soundtracks .container").classList.remove("hover-right");
        document.querySelector(".soundtracks .container").classList.add("hover-left");

        gtm.to(trackCLeft, {
          width: widthGrow,
          skewX: -skew,
          duration: duration,
          ease: ease
        }, "<")
          .to(trackCRight, {
            width: widthShrink,
            skewX: -skew,
            duration: duration,
            ease: ease
          }, "<")
          .to(document.querySelectorAll(".inner h1"), {
            skewX: skew,
            duration: duration,
            ease: ease
          }, "<");
      }
      // right side
      else {
        document.querySelector(".soundtracks .container").classList.remove("hover-left");
        document.querySelector(".soundtracks .container").classList.add("hover-right");

        gtm.to(trackCRight, {
          width: widthGrow,
          skewX: skew,
          duration: duration,
          ease: ease
        })
          .to(trackCLeft, {
            width: widthShrink,
            skewX: skew,
            duration: duration,
            ease: ease
          }, "<")
          .to(document.querySelectorAll(".inner h1"), {
            skewX: -skew,
            duration: duration,
            ease: ease
          }, "<");
      }

    });
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: document.querySelector(".soundtracks"),
      start: "top center",
      toggleActions: "play resume resume resume"
    }
  })
    .to(document.querySelector("body"), {
      onStart: () => {
        if (document.querySelector("body").classList.contains("THEBLACK")) {

          gsap.to(document.querySelector("body"), {
            backgroundColor: "var(--the-white)",
            duration: 1.4,
            ease: "power2.out"
          });
        }
      }
    });



  //-----------------------------------------------
  // CLUE

  /*gsap.from(document.querySelector(".backdrop"), {
    scrollTrigger: {
      trigger: document.querySelector("section.clue"),
      start: "top top",
      pin: document.querySelector(".backdrop")
    }
  });*/

  let clueSection = document.querySelector(".clue");

  if (clueSection) {
    gsap.timeline({
      scrollTrigger: {
        trigger: clueSection,
        start: "top center",
        end: "bottom bottom",
        scrub: 1,
        toggleActions: "play resume resume reverse"
      }
    })
      .to(document.querySelector(".backdrop-container"), {
        opacity: 1,
        duration: .25,
        ease: "power1.out"
      }, "<")
      .to(document.querySelectorAll(".clue-h.slow"), {
        y: "-120px"
      }, "<");


    // add another transition for the parent container, so as to fade out immediately after scrolling down to footer 
    // (headers take too long to fade-out as they need the stagger for the initial reveal)
    let clueH = document.querySelectorAll(".clue-h");

    clueH.forEach((clue) => {
      clue.addEventListener("mouseover", function () {
        document.querySelector(".backdrop img").src = "./img/scene/" + clue.getAttribute("scene") + ".png";
        document.querySelector(".backdrop").classList.add("show");
      });
    });

    clueH.forEach((clue) => {
      clue.addEventListener("mouseout", function () {
        document.querySelector(".backdrop").classList.remove("show");
      });
    });
  }


  //-----------------------------------------------
  // CODE

  let codeSection = document.querySelector(".code");
  let inputEl = document.querySelector("input");
  let inputMirror = document.querySelector(".input-mirror");

  let tries = 0;

  let keyTimeout;

  inputEl.value = "";

  let lastSequence = false;

  //focus input bar on enter
  gsap.timeline({
    scrollTrigger: {
      trigger: codeSection,
      start: "top center",
      markers: true,
      toggleActions: "play resume play reverse",
      onEnter: () => {
        inputEl.click();
        if (document.querySelector(".code-message h2")) {
          scrambleText(document.querySelector(".code-message h2"), "CRACK THE CODE:");
        }

      },
      onLeaveBack: () => {
        if (document.querySelector(".clue")) {
          document.querySelector(".clue").click();
        }

        if (document.querySelector("body").classList.contains("THEBLACK")) {
          document.documentElement.style.setProperty('--background-color', 'var(--the-white)');
          document.documentElement.style.setProperty('--header-color', 'var(--the-black)');
          document.documentElement.style.setProperty('--text-border-bg-color', 'var(--the-white)');

          document.querySelector(".t-one").innerHTML = "easy";
          document.querySelector(".t-two").innerHTML = "kiss \nyour lips";

          let imgArray = document.querySelectorAll(".member img");
          for (let i = 1; i < 6; i++) {
            imgArray[i - 1].src = "./img/WJSN_THE_BLACK_2-" + i + ".webp";
          }
        }
      }
    }
  })
    .fromTo(inputMirror, {
      opacity: 0,
    }, {
      opacity: 1,
      delay: .4,
      duration: 1,
      ease: "power1.out"
    }, "<")
    .from(document.querySelector(".code-message-wrapper"), {
      opacity: 0,
      delay: .15,
      duration: 1.2,
      ease: "power2.in",
      // onEnter: () => {
      //   if (document.querySelector(".code-message h2")) {
      //     scrambleText(document.querySelector(".code-message h2"), "CRACK THE CODE:");
      //   }
      // }
    }, "<")
    .to(document.querySelector(".code-message-wrapper"), {
      opacity: 0,
      delay: 6,
      duration: 1.5,
      ease: "power2.out"
    });

  codeSection.addEventListener("click", function () {
    // hide input bar
    inputMirror.classList.remove("blinking");
    inputMirror.classList.remove("solid");
  });

  inputEl.addEventListener("click", function (e) {
    e.stopPropagation();

    inputEl.focus();

    // animate blinking input bar
    inputMirror.classList.add("blinking");
    inputMirror.classList.remove("solid");
  });


  inputEl.addEventListener("input", function () {

    // solid input bar
    inputMirror.classList.add("solid");
    inputMirror.classList.remove("blinking");

    // bar back to blinking if no writting after a while
    clearTimeout(keyTimeout);
    keyTimeout = setTimeout(() => {
      inputMirror.classList.add("blinking");
      inputMirror.classList.remove("solid");
    }, 400);

    inputMirror.innerHTML = inputEl.value;

    const regex = /[a-zA-Z]+/;

    // check if input contains letters
    if (regex.test(inputEl.value)) {
      //console.log("alphabetical chars input");
      tries += 1;
    }

    if (tries >= 2) {
      tries = 0;
      let tipMessage = gsap.timeline().to(".code-tip", {
        delay: 0.5,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      })
        .to(".code-tip", {
          delay: 4,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
    }

    if ((inputEl.value == "210512" || inputEl.value === "120521" || inputEl.value == "220705" || inputEl.value == "050722") && !lastSequence) {

      lastSequence = true;

      clearTimeout(keyTimeout);

      inputMirror.classList.remove("blinking");
      inputMirror.classList.remove("solid");

      gsap.timeline().to(inputMirror, {
        color: "var(--the-white)",
        textStroke: "0rem rgb(255,255,255) !important",
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {

          document.querySelector(".code-message-wrapper").remove();
          let newMsg = document.createElement("h2");
          newMsg.classList.add("msg");

          let codename = "";

          if (inputEl.value == "210512" || inputEl.value === "120521") {
            codename = "THEBLACK";

          } else if (inputEl.value == "220705" || inputEl.value == "050722") {
            codename = "MERMAID";
            document.documentElement.style.setProperty('--background-color', '#46D9E9');
            document.documentElement.style.setProperty('--header-color', '#46D9E9');
            document.documentElement.style.setProperty('--subheader-color', '#46D9E9');

            document.querySelector(".cursor-container").remove();
          }

          newMsg.innerHTML = "codename: " + codename;
          document.querySelector(".code-message").append(newMsg);

          gsap.timeline().fromTo(newMsg, {
            opacity: 0
          },
            {
              opacity: 1,
              duration: 1,
              ease: "power4.out",
              onComplete: () => {
                document.querySelector("body").classList.add(codename);
              }
            })
            .to(newMsg, {
              opacity: 0,
              delay: 1.5,
              duration: 1.2
            });

        }
      }).to(document.querySelector("#video"), {
        delay: 1,
        opacity: 1,
        duration: 1.8,
        ease: "power3.out"
      }, ">").to(document.querySelector(".code .overlay"), {
        opacity: 0,
        delay: 2,
        duration: 2.5,
        ease: "power4.out"
      }, "<").to(inputMirror, {
        delay: .1,
        duration: .2,
        opacity: 0,
        filter: "blur(10px)"
      }, "<").to(inputEl, {
        opacity: 0,
        duration: .2
      }, "<");
    }

  });

  //-----------------------------------------------
  // MOUSE FOLLOWER

  function mouseFollowerInit() {
    window.addEventListener("mousemove", function (e) {
      if (cursorActive) {
        gsap.to(document.querySelector(".mouse"), {
          x: e.clientX + 5,
          y: e.clientY - 35,
          transformOrigin: "center",
          ease: 'power3.out'
        });
      }

    });
  }

  if (window.innerWidth > 991) {
    mouseFollowerInit();
  }


  // TEXT SCRAMBLER
  function scrambleText(el, codeMessageText) {
    let interval = 0;
    const mixer = "I'LL#MAKE?IT?LOOK_GOODFOR>YA";
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      el.textContent = el.textContent.split("")
        .map((letter, index) => {
          if (index < iteration) {
            return codeMessageText[index];
          }

          return mixer[Math.floor(Math.random() * codeMessageText.length / 2)]
        })
        .join("");

      if (iteration >= codeMessageText.length) {
        clearInterval(interval);
        interval = 0;
      }

      iteration += 1 / 3;
    }, 30);
  }


  // FOOTER
  const footerMarquee = document.querySelector(".footer-marquee");
  let footerTextWidth = document.querySelector(".footer-marquee .text").offsetWidth;

  gsap.timeline({
    scrollTrigger: {
      trigger: footerMarquee,
      start: 'top bottom',
      toggleActions: 'play resume resume pause'
    }
  }).fromTo(".footer-marquee .text", {
    x: () => -footerTextWidth * 2
  },
    {
      duration: 50,
      ease: "none",
      x: () => "+=" + footerTextWidth,
      repeat: -1
    });

}); //document onload