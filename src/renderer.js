/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

// buttons
const backButton = document.getElementById('back-button');
const forwardButton = document.getElementById('forward-button');
const reloadButton = document.getElementById('reload-button');
const searchButton = document.getElementById('search-button');
const newWindowButton = document.getElementById('new-window-button');
const goButton = document.getElementById('go-button');

// url field
const urlInputField = document.getElementById("url-input");

//webview
const webview = document.getElementById("webview");

newWindowButton.addEventListener("click", () => {
  api.newWindow();
})
goButton.addEventListener("click", (event) => {
  event.preventDefault(),
  console.log("go button clicked");
  handleUrl();
})

urlInputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleUrl();
  }
})

searchButton.addEventListener("click", ()=> {
  url="https://www.google.com/"
  urlInputField.value = url;
  webview.src = url;
})

backButton.addEventListener("click", () => {
  if (webview.canGoBack()) {
    webview.goBack();
  }
})

forwardButton.addEventListener("click", () => {
  if (webview.canGoForward()) {
    webview.goForward();
  }
})

reloadButton.addEventListener("click", () => {
  webview.reload();
})

webview.addEventListener("did-navigate", (event) => {
  urlInputField.value = event.url;
})

function handleUrl(){
  let url = "";
  const inputUrl = urlInputField.value;

  if (inputUrl.startsWith("http://") || inputUrl.startsWith("https://")) {
    url = inputUrl;
  } else {
    url = "https://" + inputUrl;
  }
  console.log(url);
  webview.src = url;
}

console.log('👋 This message is being logged by "renderer.js", included via Vite');
