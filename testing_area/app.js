let contentDuration = 5;
let adDuration = 10;

let ad_intervalId = 0;
let content_intervalId = 0;

function ad() {
    let ad_countdown = document.querySelector('[data-a-target="video-ad-countdown"');
    document.getElementById("content").textContent = "Ad"
    adDuration--;
    ad_countdown.textContent = `${adDuration}s`
    if (adDuration <= 0) {
        clearInterval(ad_intervalId);
        ad_countdown.remove()
        adDuration = 10;
        contentDuration = 10;
        content_intervalId = setInterval(content, 1000)
    }
}

function content() {
    contentDuration--;
    document.getElementById("content").textContent = "Content"
    if (contentDuration <= 0) {
        clearInterval(content_intervalId);
        adDuration = 10;
        contentDuration = 10
        let ad_countdown = document.createElement("div");
        ad_countdown.setAttribute("data-a-target", "video-ad-countdown");
        ad_countdown.setAttribute("id", "ad-countdown");
        document.querySelector('[class="my-player"]').insertAdjacentElement("afterbegin", ad_countdown);
        ad_intervalId = setInterval(ad, 1000)
    }
}

ad_intervalId = setInterval(ad, 1000);