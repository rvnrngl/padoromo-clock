import { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  FaCaretSquareDown,
  FaCaretSquareUp,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import { MdOutlineRepeatOn } from "react-icons/md";
import alarm from "./audio/break.mp3";

function App() {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [text, setText] = useState("session");
  const intervalRef = useRef(null); // Ref to store interval ID

  const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    return (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
  };

  const changeTime = (amount, type) => {
    if (timerOn === false) {
      if (type === "break") {
        if (breakTime <= 60 && amount < 0) {
          return;
        }
        if (breakTime >= 3600) {
          return;
        }
        setBreakTime((prev) => prev + amount);
      } else {
        if (sessionTime <= 60 && amount < 0) {
          return;
        }
        if (sessionTime >= 3600) {
          return;
        }
        setSessionTime((prev) => prev + amount);
        setDisplayTime(sessionTime + amount);
      }
    }
  };

  const playAlarm = () => {
    const audio = document.getElementById("beep");
    audio.currentTime = 0;
    audio.play();
  };

  useEffect(() => {
    if (displayTime <= -1) {
      if (onBreak === false) {
        setText("break");
        playAlarm();
        setOnBreak(true);
        console.log("break");
        setDisplayTime(breakTime);
      } else {
        setText("session");
        playAlarm();
        setOnBreak(false);
        console.log("session");
        setDisplayTime(sessionTime);
      }
    }
  }, [displayTime, breakTime, sessionTime, onBreak]);

  const controlTime = () => {
    if (!timerOn) {
      intervalRef.current = setInterval(() => {
        setDisplayTime((prev) => prev - 1);
      }, 1000);
    } else if (timerOn) {
      clearInterval(intervalRef.current);
    }
    setTimerOn((prevTimerOn) => !prevTimerOn);
  };

  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setText("session");
    setTimerOn(false);
    setOnBreak(false);
    clearInterval(intervalRef.current);
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <>
      <div className="w-screen h-screen bg-[url('./img/bg.jpg')] bg-cover bg-center bg-no-repeat flex justify-center items-center font-orbiton overflow-hidden">
        <div
          id="clockWrapper"
          className="text-center w-[300px] sm:w-[500px] rounded-xl bg-[rgba(204,204,204,0.3)] shadow-[1px_1px_2px_#000000]"
        >
          <h1 className="text-2xl sm:text-3xl sm:py-3 py-2 font-bold">
            25 + 5 Clock
          </h1>
          <div className=" flex justify-between px-5">
            <div>
              <p id="break-label" className="sm:text-xl">
                Break Length
              </p>
              <div className="flex justify-center items-center gap-2 text-xl sm:py-2 sm:text-4xl">
                <button
                  id="break-decrement"
                  onClick={() => changeTime(-60, "break")}
                >
                  <FaCaretSquareDown />
                </button>
                <p id="break-length" className="sm:text-2xl">
                  {breakTime / 60}
                </p>
                <button
                  id="break-increment"
                  onClick={() => changeTime(60, "break")}
                >
                  <FaCaretSquareUp />
                </button>
              </div>
            </div>
            <div>
              <p id="session-label" className="sm:text-xl">
                Session Length
              </p>
              <div className="flex justify-center items-center gap-2 text-xl sm:py-2 sm:text-4xl">
                <button
                  id="session-decrement"
                  onClick={() => changeTime(-60, "session")}
                >
                  <FaCaretSquareDown />
                </button>
                <p id="session-length" className="sm:text-2xl">
                  {sessionTime / 60}
                </p>
                <button
                  id="session-increment"
                  onClick={() => changeTime(60, "session")}
                >
                  <FaCaretSquareUp />
                </button>
              </div>
            </div>
          </div>
          <div className="w-[200px] my-2 py-2 bg-[rgba(204,204,204,0.5)] mx-auto flex flex-col items-center justify-center rounded-xl">
            <h1 id="timer-label" className="text-xl font-bold uppercase">
              {text}
            </h1>
            <h1 id="time-left" className="text-4xl font-bold">
              {formatTime(displayTime)}
            </h1>
          </div>
          <div className="flex justify-center items-center text-xl py-2 sm:text-3xl gap-4">
            <audio id="beep" src={alarm}></audio>
            <button
              id="start_stop"
              className="flex items-center"
              onClick={controlTime}
            >
              {timerOn ? <FaPause /> : <FaPlay />}
            </button>
            <button id="reset" onClick={resetTime}>
              <MdOutlineRepeatOn />
            </button>
          </div>
          <p className="text-xs pt-2">Designed and Developed by</p>
          <a href="https://github.com/rvnrngl" target="_blank">
            <p className="pb-1 font-bold uppercase text-sm hover:underline">
              Raven Ringel
            </p>
          </a>
        </div>

        <a
          className="absolute right-1 bottom-1 text-xs underline"
          href="https://www.freepik.com/free-photo/majestic-mountain-range-tranquil-meadow-backlit-sunset-generated-by-ai_43151734.htm#query=landscape&position=25&from_view=keyword&track=sph"
          target="_blank"
        >
          Image by vecstock
        </a>
      </div>
    </>
  );
}

export default App;
