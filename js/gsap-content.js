gsap.registerPlugin(ScrollTrigger);


/* Preload dynamic imgs */
let imgList = [];

for (let i = 1; i < 11; i++) {
  imgList[i - 1] = new Image();
  if (i >= 10) {
    imgList[i - 1].src = "./img/scene/" + i + ".png";
  } else {
    imgList[i - 1].src = "./img/scene/0" + i + ".png";
  }
}

document.fonts.ready.then(function () {

  const body = document.querySelector("body");

  //-----------------------------------------------
  // HERO

  let heroSection = document.querySelector(".hero");
  let cursorActive = false;

  document.querySelector(".mouse").style.transform = "translate3d(" + document.querySelector(".asterisk-container").parentNode.getBoundingClientRect().left + "px, " + document.querySelector(".asterisk-container").parentNode.getBoundingClientRect().top + "px,0px)";

  // Reveal
  gsap.timeline()
    .to("div.preloader", {
      delay: 1,
      opacity: 0,
      duration: .8,
      onComplete: () => {
        gsap.set('div.preloader', {visibility:"hidden", display:"none"});
        body.classList.remove('preloader');

        // init mouse position after loading screen
        gsap.to(".mouse", {
          rotation: "360deg",
          duration: 3,
          repeat: -1,
          ease: 'none'
        });
        gsap.to(".mouse", {
          delay: 1.4,
          opacity: 1,
          duration: 1,
          ease: "power1.out"
        });

      }
    })
    .to(".mouse", {
      opacity: 0,
      duration: .8,
      ease: "power1.out"
    }, "<")
    .fromTo(".subheader-wrapper", {
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
    .to(".header-wrapper .overlay", {
      transform: "skew(-25deg)",
      delay: .5,
      width: 0,
      stagger: .1,
      duration: 1,
      ease: "power2.out"
    }, "<")
    .from(".header-wrapper h1", {
      xPercent: -14,
      stagger: .1,
      duration: 1,
      ease: "power2.out"
    }, "<")
    .fromTo(".subheader-upper-wrapper .member-tag", {
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
    .fromTo(".subheader-lower-wrapper .member-tag", {
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
    .fromTo(".hero .single", {
      xPercent: -20,
      opacity: 0
    },
      {
        xPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {

          document.querySelector(".hero").classList.add("member-focusable");

          if (!cursorActive) {
            //document.querySelector(".cursor-container").appendChild(document.querySelector(".asterisk-container"));
            cursorActive = true;
          }
        }
      }, "<")
    .to(".member-tag .overlay", {
      transform: "skew(-25deg)",
      delay: .15,
      width: 0,
      stagger: .25,
      duration: 1,
      ease: "power2.out"
    }, "<");

  const heroContainer = document.querySelector('.hero .container');

  document.querySelectorAll(".member-tag").forEach((member) => {
    let memberClassList = member.classList;
    let memberFocus = memberClassList[0].replace("member-tag", "") + memberClassList[1].replace("-tag", "");

    member.addEventListener("mouseover", () => {
      if (heroContainer) {
        heroContainer.classList.add(memberFocus + "-focus");
      }
    });
    member.addEventListener("mouseout", () => {
      if (heroContainer) {
        heroContainer.classList.remove(memberFocus + "-focus");
      }
    });

    member.addEventListener("click", () => {
      if (member.classList.contains('seola-tag')) {
        window.open('https://www.instagram.com/seola_s/', '_blank');
      }
      else if (member.classList.contains('bona-tag')) {
        window.open('https://www.instagram.com/bn_95819/', '_blank');
      }
      else if (member.classList.contains('exy-tag')) {
        window.open('https://www.instagram.com/exychu__/', '_blank');
      } else if (member.classList.contains('eunseo-tag')) {
        window.open('https://www.instagram.com/eeunseo._.v/', '_blank');
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
      // markers: false
    }
  })
    .to(".hero h1", {
      filter: "blur(20px)"
    })
    .to(".hero h1", {
      opacity: 0,
    });

  //-----------------------------------------------
  // GALLERY

  const gallerySection = document.querySelector('.gallery');
  const gallerySectionContainer = gallerySection.querySelector('.container');
  const galPanel = document.querySelectorAll(".gallery .member");
  const galleryImg = document.querySelectorAll('.gallery img');

  let galWidth = (document.querySelector(".gallery .subsection").offsetWidth - window.innerWidth);

  // reveal
  gsap.from(gallerySectionContainer, {
    scrollTrigger: {
      trigger: gallerySection,
      start: "top 60%",
      end: "+=100%",
      scrub: 1,
      // markers: true,
    },
    opacity: 0,
    yPercent: 80,
    filter: "blur(10px)"
  });

  // pin gallery section
  let panelAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: gallerySection,
        pin: true,
        pinSpacing: "margin",
        start: "top top",
        end: () => "+=" + galWidth,
        scrub: 1
      },
    }
  )
    .to(galPanel, {
      xPercent: -100 * (galPanel.length - 1) - 100,
      ease: "none",
      duration: 1
    });

  // img parallax effect
  galleryImg.forEach((img) => {
    gsap.fromTo(img, {
      xPercent: -5,
      yPercent: 2
    }, {
      scrollTrigger: {
        trigger: img,
        containerAnimation: panelAnimation,
        start: "left right",
        end: "right left+=2",
        scrub: 1,
      },
      xPercent: 30,
      yPercent: -2,
      ease: 'power2.out'
    });
  });


  // Gallery Marquee
  let textWidthOffset = document.querySelectorAll(".gallery-marquee .text")[0].offsetWidth + document.querySelectorAll(".gallery-marquee .text")[1].offsetWidth + document.querySelectorAll(".gallery-marquee .text")[2].offsetWidth;

  gsap.timeline({
    scrollTrigger: {
      trigger: gallerySectionContainer,
      start: 'top top',
      end: "+=650%",
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

  const soundtracksSection = document.querySelector(".soundtracks");
  const trackCs = document.querySelectorAll(".track-container");
  const trackCLeft = document.querySelector(".track-container-left");
  const trackCRight = document.querySelector(".track-container-right");
  let headerRevealed = false;

  let soundtrackTm = gsap.timeline({
    scrollTrigger: {
      trigger: soundtracksSection,
      start: "top top",
      end: "+=350%",
      scrub: true,
      toggleActions: "play reverse play reverse",
    }
  });

  // if mobile, animate line horizontally, else make it vertical
  if (window.innerWidth <= 991) {
    soundtrackTm.from(".soundtracks .content", {
      opacity: 0,
      duration: .2
    })
      .to(document.querySelector(".divider span"), {
        width: "100vw"
      });
  } else {
    soundtrackTm.from(".soundtracks .content", {
      opacity: 0,
      duration: .2
    })
      .to(".divider span", {
        height: "100vh"
      });
  }

  gsap.timeline({
    scrollTrigger: {
      trigger: soundtracksSection,
      start: "top top",
      end: "+=350%",
      scrub: true,
      // markers: false,
      pin: true,
      toggleActions: "play reverse play reverse",
      onEnterBack: () => {
        if (document.querySelector("body").classList.contains("THEBLACK")) {
          document.documentElement.style.setProperty('--background-color', 'var(--the-white)');
        }

        gsap.to(soundtracksSection, {
          opacity: 1,
          duration: .4,
          ease: "power2.out"
        });
      },
      onLeave: () => {
        if (document.querySelector("body").classList.contains("THEBLACK")) {
          document.documentElement.style.setProperty('--background-color', 'var(--the-black)');
        }

        gsap.to(soundtracksSection, {
          delay: .4,
          opacity: 0,
          duration: .4,
          ease: "power2.out"
        });
      }
    }
  })
    // .from(soundtracksSection, {
    //   opacity: 0,
    //   height: "0vh",
    //   duration: .8,
    //   ease: "power1.out"
    // }, "<")
    .from(".soundtracks h3", {
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
        ease: "power2.out"
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

  const ostContainer = document.querySelector('.soundtracks .container');

  // desktop hover interaction
  if (window.innerWidth > 991) {
    trackCs.forEach((tContainer) => {

      tContainer.addEventListener("mouseout", function () {
        ostContainer.classList.remove("hover-right");
        ostContainer.classList.remove("hover-left");

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
          .to(".inner h1", {
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
          ostContainer.classList.remove("hover-right");
          ostContainer.classList.add("hover-left");

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
            .to(".inner h1", {
              skewX: skew,
              duration: duration,
              ease: ease
            }, "<");
        }
        // right side
        else {
          ostContainer.classList.remove("hover-left");
          ostContainer.classList.add("hover-right");

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
            .to(".inner h1", {
              skewX: -skew,
              duration: duration,
              ease: ease
            }, "<");
        }

      });
    });
  }

  gsap.timeline({
    scrollTrigger: {
      trigger: soundtracksSection,
      start: "top center",
      toggleActions: "play resume resume resume"
    }
  })
    .to(document.querySelector("body"), {
      onStart: () => {
        if (document.querySelector("body").classList.contains("THEBLACK")) {

          gsap.to("body", {
            backgroundColor: "var(--the-white)",
            duration: 1.4,
            ease: "power2.out"
          });
        }
      }
    });



  //-----------------------------------------------
  // CLUE

  let clueSection = document.querySelector(".clue");

  if (clueSection) {
    gsap.timeline({
      scrollTrigger: {
        trigger: clueSection,
        start: "top center",
        end: "bottom bottom",
        // markers: true,
        scrub: 1,
        toggleActions: "play resume resume reverse",
        onEnter: () => {
          gsap.fromTo(".backdrop-container", {
            opacity: 0
          }, {
            opacity: 1,
            duration: .25,
            ease: "power1.out"
          });
        },
      }
    }).to(".clue-h.slow", {
      y: "-120px"
    });


    // add another transition for the parent container, so as to fade out immediately after scrolling down to footer 
    // (headers take too long to fade-out as they need the stagger for the initial reveal)
    const clueH = document.querySelectorAll(".clue-h");
    const backdrop = document.querySelector(".backdrop");
    const backdropsImg = document.querySelector(".backdrop img");

    // mouse hover event for desktop
    if (window.innerWidth > 1024) {
      clueH.forEach((clue) => {
        clue.addEventListener("mouseover", () => {
          showClueImage(clue);
          // console.log("mouse in");
        });
      });

      clueH.forEach((clue) => {
        clue.addEventListener("mouseout", () => {
          hideClueImage();
          // console.log("mouse out");
        });
      });
    } else {
      // scrolltrigger reveal if mobile device
      clueH.forEach((clue) => {
        ScrollTrigger.create({
          trigger: clue,
          start: "top 52%",
          end: "+=320px",
          // markers: { startColor: "pink", endColor: "orange" },
          onEnter: () => {
            showClueImage(clue);
            clue.classList.add("hovered");
          },
          onEnterBack: () => {
            showClueImage(clue);
            clue.classList.add("hovered");
          },
          onLeave: () => {
            hideClueImage();
            clue.classList.remove("hovered");
          },
          onLeaveBack: () => {
            hideClueImage();
            clue.classList.remove("hovered");
          }
        });
      });
    }

    function showClueImage(clue) {
      backdropsImg.src = "./img/scene/" + clue.getAttribute("scene") + ".png";
      backdrop.classList.add("show");
    }

    function hideClueImage() {
      backdrop.classList.remove("show");
    }


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
    .from(".code-message-wrapper", {
      opacity: 0,
      delay: .15,
      duration: 1.2,
      ease: "power2.in"
    }, "<")
    .to(".code-message-wrapper", {
      opacity: 0,
      delay: 6,
      duration: 1.5,
      ease: "power2.out"
    });

  codeSection.addEventListener("click", function (e) {
    e.stopPropagation();

    inputEl.focus();

    // animate blinking input bar
    inputMirror.classList.add("blinking");
    inputMirror.classList.remove("solid");
  });


  inputEl.addEventListener("input", function (e) {
    e.stopPropagation();

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
    if (regex.test(inputEl.value) && !lastSequence) {
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

          if (inputEl.value == "210512" || inputEl.value === "120521" || inputEl.value == "220705" || inputEl.value == "050722") {
            let keyTimeout = setTimeout(() => {
              document.querySelector(".code .container").style.display = "none";
              document.querySelector(".input-container").remove();
              document.querySelector(".code .overlay").remove();
              clearTimeout(keyTimeout);
            }, 5000);

            document.querySelector(".clue").remove();
            ScrollTrigger.refresh();
          }

          if (inputEl.value == "210512" || inputEl.value === "120521") {
            codename = "THEBLACK";

            document.querySelector('#vid1').play().catch(err => {
              console.warn('Autoplay blocked:', err);
            });

          } else if (inputEl.value == "220705" || inputEl.value == "050722") {
            codename = "MERMAID";
            document.documentElement.style.setProperty('--background-color', '#46D9E9');
            document.documentElement.style.setProperty('--header-color', '#46D9E9');
            document.documentElement.style.setProperty('--subheader-color', '#46D9E9');

            // document.querySelector(".cursor-container").remove();
            document.querySelector('main').remove();
            ScrollTrigger.refresh();

            document.querySelector('#vid2').play().catch(err => {
              console.warn('Autoplay blocked:', err);
            });
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
              delay: 1.25,
              duration: 1
            });

        }
      }).to("#video", {
        delay: 1,
        opacity: 1,
        duration: 1.8,
        ease: "power3.out"
      }, ">").to(".code .overlay", {
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
        gsap.to(".mouse", {
          x: e.clientX + 5,
          y: e.clientY - 35,
          transformOrigin: "center",
          ease: 'power5.out'
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