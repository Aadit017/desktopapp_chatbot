// Import the necessary modules and libraries
const { app, BrowserWindow } = require('electron')
const axios = require('axios')

// Create a main Electron.js window
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Load the HTML file for the Electron.js window
  mainWindow.loadFile('index.html')
  // Open the DevTools for debugging
  mainWindow.webContents.openDevTools()

  // Handle the window being closed
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// When the Electron.js application is ready, create the window
app.on('ready', createWindow)

// Handle any windows being closed
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Handle the Electron.js application being activated
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

// Make an API call using Axios and display the data in the GET method section
axios.get('https://api.example.com/data')
  .then(function (response) {
    // Handle the successful response
    let data = response.data
    let getSection = document.getElementById('get-section')
    let dataElement = document.createElement('p')
    dataElement.textContent = JSON.stringify(data)
    getSection.appendChild(dataElement)
  })
  .catch(function (error) {
    // Handle the error
    console.error(error)
  })

// Handle the form submission in the POST method section
let postForm = document.getElementById('post-form')
postForm.addEventListener('submit', function (event) {
  event.preventDefault()
  let formData = new FormData(postForm)
  axios.post('https://api.example.com/data', formData)
    .then(function (response) {
      // Handle the successful response
      console.log(response)
    })
    .catch(function (error) {
      // Handle the error
      console.error(error)
    })
})
