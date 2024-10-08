
let newPlayer;
let started = false;

document.addEventListener("DOMContentLoaded", function () {
    console.log("running observer");

    loadVideo();

    const targetEl = document.querySelector('body')
    const options = {
        attributes: true
    }

    function callback(mutationList, observer) {
        mutationList.forEach(function (mutation) {
            if (mutation.attributeName === 'class' && newPlayer && targetEl.classList.length > 0) {
                if (targetEl.classList.contains("THEBLACK") && !started) {
                    newPlayer.seekTo(12.8);
                    console.log("Running THE BLACK");

                } else if (targetEl.classList.contains("MERMAID") && !started) {
                    newPlayer.loadVideoById("z0YLZmcARRU");
                    console.log("LOADING MERMAID");

                    document.querySelector(".gallery").parentElement.remove();
                    document.querySelector(".soundtracks").parentElement.remove();
                    document.querySelector(".pin-spacer").remove();
                    document.querySelector(".empty").remove();
                    document.querySelector(".empty").remove();
                }

                let playDelay = setTimeout(() => {
                    console.log("playing video");
                    newPlayer.playVideo();
                    started = true;
                    clearTimeout(playDelay);
                }, 1000);

                let keyTimeout = setTimeout(() => {
                    document.querySelector(".code .container").style.display = "none";
                    document.querySelector(".input-container").remove();
                    document.querySelector(".code .overlay").remove();
                    clearTimeout(keyTimeout);
                }, 3000);

                document.querySelector(".clue").remove();
                ScrollTrigger.refresh();
            }
        })
    }

    const observer = new MutationObserver(callback)
    observer.observe(targetEl, options)

});

function loadVideo() {

    (function loadYoutubeIFrameApiScript() {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";

        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        tag.onload = setupPlayer;
    })();

    let player = null;

    function setupPlayer() {
        YT.ready(function () {
            player = new YT.Player("video", {
                height: "390",
                width: "640",
                videoId: "p_C_ZmSWpzc?feature=shared&t=12",
                start: "12",
                playerVars: {
                    controls: 0
                },
                events: {
                    onReady: onPlayerReady
                    //onStateChange: onPlayerStateChange
                }
            });
        });
    }

    function onPlayerReady() {
        newPlayer = player;
    }

    function onPlayerStateChange(event) {
        var videoStatuses = Object.entries(window.YT.PlayerState);
        console.log(videoStatuses.find(status => status[1] === event.data)[0]);
    }
}

if (document.readyState !== "loading") {
    console.info(`document.readyState ==>`, document.readyState);
    loadVideo();
}