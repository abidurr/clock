import React from "react"
import logo from "./logo.svg"
import "./App.css"
import { useState, useEffect } from "react"
import moment from "moment-timezone"

function App() {
  const [use24hr, setUse24hr] = useState(false)
  const [time, setTime] = useState(new Date())
  const [timezone, setTimezone] = useState(moment.tz.guess())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleFullscreen = (): void => {
    const toggleButton = document.querySelector<HTMLButtonElement>(".toggle")
    const element = document.querySelector<HTMLElement>(".element")

    if (!toggleButton || !element) {
      throw new Error("Toggle button or element not found in the DOM")
    }

    toggleButton.addEventListener("click", async (event: MouseEvent) => {
      event.preventDefault()

      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen()
        } else {
          await element.requestFullscreen()
        }
      } catch (error) {
        console.error("Fullscreen operation failed:", error)
      }
    })
  }

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
      <header className="App-header element">
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
        <p className="toggle" onClick={() => toggleFullscreen()}>
          Fullscreen
        </p>
        {/*<button onClick={() => setUse24hr(!use24hr)}>
          {use24hr ? "12-hour" : "24-hour"}
        </button>*/}
        {/*<p>{time.toLocaleTimeString()}</p>*/}
        <p
          style={{ fontSize: "4em", fontFamily: "monospace" }}
          onClick={() => setUse24hr(!use24hr)}
        >
          {use24hr
            ? moment.tz(time, timezone).format("HH:mm:ss")
            : moment.tz(time, timezone).format("hh:mm:ss A")}
        </p>
        <p>
          {timezone} {moment.tz(time, timezone).format("z")}
        </p>
        <p>{moment.tz(time, timezone).format("dddd, LL")}</p>
      </header>
    </div>
  )
}

export default App
