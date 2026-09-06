import React from "react"
import collapse from "./images/collapse.svg"
import expand from "./images/expand.svg"
import "./App.css"
import { useState, useEffect } from "react"
import moment from "moment-timezone"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

const use24hrAtom = atomWithStorage("use24hr", true)
const timezoneAtom = atomWithStorage("timezone", moment.tz.guess())
const labelsAtom = atomWithStorage("labels", true)

function App() {
  const [use24hr, setUse24hr] = useAtom(use24hrAtom)
  const [time, setTime] = useState(new Date())
  const [timezone, setTimezone] = useAtom(timezoneAtom)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showLabels, setShowLabels] = useAtom(labelsAtom)

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
      setIsFullscreen(false)
      throw new Error("Toggle button or element not found in the DOM")
    }

    toggleButton.addEventListener("click", async (event: MouseEvent) => {
      event.preventDefault()

      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen()
          setIsFullscreen(false)
        } else {
          await element.requestFullscreen()
          setIsFullscreen(true)
        }
      } catch (error) {
        console.error("Fullscreen operation failed:", error)
      }
    })
  }

  // Replace / with " - " and "_" with " "
  const formattedTimezone = (timezone: string) => {
    return timezone.toString().replace(/\//g, " - ").replace(/_/g, " ")
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
        <div style={{ height: "80px" }}></div>
        <p
          className="hidden-label"
          style={{
            transition: "opacity 300ms ease-in-out",
            opacity: showLabels ? 1 : 0,
          }}
        >
          {moment.tz(time, timezone).format("dddd, LL")}
        </p>

        <p
          style={{
            fontSize: "4em",
            // fontFamily: "Doto, monospace",
            fontWeight: 900,
          }}
          onClick={() => setUse24hr(!use24hr)}
        >
          {use24hr
            ? moment.tz(time, timezone).format("HH:mm:ss")
            : moment.tz(time, timezone).format("hh:mm:ss A")}
        </p>
        <p
          className="hidden-label"
          style={{
            transition: "opacity 300ms ease-in-out",
            opacity: showLabels ? 1 : 0,
          }}
        >
          {formattedTimezone(timezone)}
          {" - "}
          {moment.tz(time, timezone).format("z")}
        </p>
        <div
          className="controls"
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
          {/*<p>24hr</p>*/}
          <label className="switch">
            <input
              checked={!use24hr}
              type="checkbox"
              onChange={() => setUse24hr(!use24hr)}
            />
            <span className="slider round"></span>
          </label>
          <p>AM/PM</p>
          <div style={{ width: "24px" }}></div>
          {/*<p>Show labels</p>*/}
          <label className="switch">
            <input
              checked={showLabels}
              type="checkbox"
              onChange={() => setShowLabels(!showLabels)}
            />
            <span className="slider round"></span>
          </label>
          <p>Labels</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginLeft: "40px",
              cursor: "pointer",
            }}
            onClick={() => toggleFullscreen()}
            className="toggle"
          >
            <img
              src={isFullscreen ? collapse : expand}
              alt="full screen"
              style={{ height: "40px", width: "40px" }}
            />
            <p>Fullscreen</p>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
