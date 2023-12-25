
  // <div data-a-target="video-ad-countdown" class="Layout-sc-1xcs6mc-0 gdoBNE"><span class="CoreText-sc-1txzju1-0 ffZeRf">0 : 29</span></div>


// This function takes the duration of the ad taken from HTML and turns it into ms
// Text variable examples:
//  - "0:10"
//  - "Ad n°1 of 2 (0:10)"
const displayedTimeToMilliseconds = (text) => {
  // Extract the time portion from the text
  console.log("displayedTimeToMS: text: ", text);
  const timeRegex = /(\d{1,2}\s*:\s*\d{2})/; // Regex to match the time format (mm:ss) within parentheses
  const timeMatch = text.match(timeRegex);
  
  if (timeMatch) {
    const timeString = timeMatch[1]; // Extract the matched time string (e.g., "0:10")
    const [minutes, seconds] = timeString.split(':').map(Number); // Split minutes and seconds
    
    // Calculate the total duration in milliseconds
    const durationMilliseconds = (minutes * 60 + seconds) * 1000;
    
    return durationMilliseconds;
  }
  console.log("Can't find displayed time");
  // Return null if the time format is not found
  return null;
}

//This function returns the black screen overlayed above the video player
const blackScreen = () => {
  let blacker = document.createElement("div");
  blacker.id = "adblacker"
  blacker.style.backgroundColor = "black";
  blacker.style.position = "absolute"
  blacker.style.zIndex = 1;
  blacker.style.width = "inherit";
  blacker.style.margin = "auto";
  blacker.style.height = "100%";
  blacker.textContent = "0s"
  blacker.style.color = "white"
  return blacker
}

const wikipediaIFrame = () => {
  let iFrame = document.createElement("iframe");
  iFrame.id = "adblacker";
  iFrame.width = "inherit";
  iFrame.style.position = "absolute"
  iFrame.style.zIndex = "1";
  iFrame.style.width = "inherit";
  iFrame.style.margin = "auto";
  iFrame.style.height = "100%";
  iFrame.src = "https://en.wikipedia.org/wiki/Special:Random"
  return iFrame
}

const adBlacker = (duration, videoPlayer, blacker) => {
  // Find a div that indicates an ad is being played and for how long
  console.log("---AdBlacker On---")
  // Create a black div element
  blacker.durationLeft = duration / 1000;
  // Mute tab
  document.querySelectorAll('audio, video').forEach(item => {
    item.muted = true;
  });
  videoPlayer.insertAdjacentElement("afterbegin", blacker);
  // Display ad duration
  let durationIntervalId = setInterval(() => {
    blacker.textContent = `${blacker.durationLeft}s`
    blacker.durationLeft--;
  }, 1000);

  console.log(`Removing Blacker screen in ${duration}s`)
  setTimeout(() => {
    console.log("Removing Blacker div");
    blacker.remove();
    document.querySelectorAll('audio, video').forEach(item => {
      item.muted = false;
    });
    blackerRunning = false;
    clearInterval(durationIntervalId);
  }, duration);

};

let blackerRunning = false;

const eventLoop = async () => {
  while (true) {
    // Detect a video player and adCountdown. 
    // If none, sleep for 1s
    console.log("AdBlacker !!");
    let adIndicator = document.querySelector('[data-a-target="video-ad-countdown"');
    let videoPlayer = document.querySelector('[data-a-target="video-player"]')
    if (adIndicator && adIndicator.innerText && videoPlayer && !blackerRunning) {
      let duration = displayedTimeToMilliseconds(adIndicator.innerText);
      if (duration != null) {
        blackerRunning = true;
        let blacker = blackScreen();
        let wikiFrame = wikipediaIFrame();
        adBlacker(duration, videoPlayer, wikiFrame)
      }
    }
    await new Promise(r => setTimeout(r, 1000));
  }
};

eventLoop();
