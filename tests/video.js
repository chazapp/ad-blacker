let contentDuration = 5;
let adDuration = 10;

let ad_intervalId = 0;
let content_intervalId = 0;

function formatDuration(duration, format) {
    const minutes = Math.floor(duration / 60); // Calculate the number of minutes
    const seconds = duration % 60; // Calculate the number of remaining seconds
  
    // Format the minutes and seconds based on the format string
    const formattedMinutes = String(minutes).padStart(2, '0'); // Ensure the minutes have leading zeros if necessary
    const formattedSeconds = String(seconds).padStart(2, '0'); // Ensure the seconds have leading zeros if necessary
  
    // Replace 'mm' and 'ss' in the format string with the formatted minutes and seconds
    const formattedDuration = format.replace('mm', formattedMinutes).replace('ss', formattedSeconds);
  
    return formattedDuration;
  }
  
  const format = "mm:ss";
  const duration = 90;
  
  const formattedDuration = formatDuration(duration, format);
  console.log(formattedDuration); // Output: "01:30"
  

const ad = () => {
    let ad_countdown = document.querySelector('[data-a-target="video-ad-countdown"');
    document.getElementById("content").textContent = "Ad"
    adDuration--;
    //  - "0:10"
    //  - "Ad n°1 of 2 (0:10)"
    ad_countdown.textContent = formatDuration(adDuration, "mm:ss");
    if (adDuration <= 0) {
        clearInterval(ad_intervalId);
        ad_countdown.remove()
        adDuration = 10;
        contentDuration = 10;
        content_intervalId = setInterval(content, 1000)
    }
}

const content = () => {
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

content_intervalId = setInterval(content, 1000); 