<p align="center">
  <img src="https://github.com/chazapp/ad-blacker/blob/master/icons/260.png?raw=true" alt="AdBlacker Logo"/>
</p>  

# AdBlacker  

[![Tests](https://github.com/chazapp/adblacker/actions/workflows/tests.yml/badge.svg)](https://github.com/chazapp/adblacker/actions/)
[![tested with webdriverio](https://img.shields.io/badge/tested%20with-webdriver.io-%23ea5906)](https://webdriver.io/)

A browser extension that detects ads on video streams and blacks them out  

[Available on Firefox Addons](https://addons.mozilla.org/fr/firefox/addon/adblacker/)
## Usage

Clone the repository, install `adblacker.js` as an extension in Firefox.  

Navigate to a Twitch stream. Ads should be blacked out and muted. 

## Development
  
The extension entry point is `adblacker.js`. It starts a polling loop of 1s intervals
to check the presence of an ad in the webpage.  

A test suite based on WebDriverIO is available. It requires the following:  

- NodeJS
- Gecko WebDriver + Firefox Developer Edition
- An HTTP webserver

Install the test suite, start GeckoWebdriver, then run the tests:

```
$ yarn install
...
$ geckodriver -p 4444 # in terminal #1
$ yarn test # in terminal #2
```