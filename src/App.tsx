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
const dateFormatAtom = atomWithStorage("dateFormat", "dddd, LL")

// Replace / with " - " and "_" with " "
const formattedTimezone = (timezone: string) => {
  return timezone.toString().replace(/\//g, " - ").replace(/_/g, " ")
}

const timezoneOptions = moment.tz
  .names()
  .map((name) => ({ value: name, label: formattedTimezone(name) }))

function App() {
  const [use24hr, setUse24hr] = useAtom(use24hrAtom)
  const [time, setTime] = useState(new Date())
  const [timezone, setTimezone] = useAtom(timezoneAtom)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showLabels, setShowLabels] = useAtom(labelsAtom)
  const [dateFormat, setDateFormat] = useAtom(dateFormatAtom)

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

  return (
    <div
      className="App"
    >
      <header className="App-header element">
        <div style={{ height: "80px" }}></div>
        <p
          className="hidden-label"
          style={{
            transition: "opacity 300ms ease-in-out",
            opacity: showLabels ? 1 : 0,
          }}
        >
          {moment.tz(time, timezone).format(`${dateFormat}`)}
        </p>

        <select
          className="controls styled-select"
          value={dateFormat}
          onChange={(e) => setDateFormat(e.target.value)}
        >
          <option key="dddd, LL" value="dddd, LL">
            {moment.tz(time, timezone).format("dddd, LL")}
          </option>
          <option key="LL" value="LL">
            {moment.tz(time, timezone).format("LL")}
          </option>
          <option key="YYYY-MM-DD" value="YYYY-MM-DD">
            {moment.tz(time, timezone).format("YYYY-MM-DD")}
          </option>
          <option key="L" value="L">
            {moment.tz(time, timezone).format("L")}
          </option>
          <option key="ll" value="ll">
            {moment.tz(time, timezone).format("ll")}
          </option>
          <option key="dddd" value="dddd">
            {moment.tz(time, timezone).format("dddd")}
          </option>
        </select>

        <p
          style={{
            fontSize: "4em",
            opacity: 0.85,
            fontWeight: 800,
          }}
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
        <select
          className="controls styled-select"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
        >
          {timezoneOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div
          className="controls"
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
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
