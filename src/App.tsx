import React from "react"
import logo from "./logo.svg"
import "./App.css"

function App() {
  const [time, setTime] = React.useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="App"
      // onClick={() => {
      //   document.querySelector(".toggle").addEventListener("click", (event) => {
      //     if (document.fullscreenElement) {
      //       // If there is a fullscreen element, exit full screen.
      //       document.exitFullscreen()
      //       return
      //     }
      //     // Make the .element div fullscreen.
      //     document.querySelector(".element").requestFullscreen()
      //   })
      // }}
    >
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>*/}
        <p>Clock</p>
        <p>{time.toLocaleTimeString()}</p>
        <p>{time.toLocaleDateString()}</p>
      </header>
    </div>
  )
}

export default App
