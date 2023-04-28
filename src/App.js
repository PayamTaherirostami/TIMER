import React from "react";
import './App.css';
import { CSVLink } from "react-csv";


const csvData = [
  ["Name", "Po#", "Time","Colors","Total","Rotation"],
];

const App = () => {
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);
  const [value1, setValue1] = React.useState("")
  const [value2, setValue2] = React.useState("")

  React.useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);
const m1 = ("0" + Math.floor((time / 60000) % 60)).slice(-2)
const m2= ("0" + Math.floor((time / 1000) % 60)).slice(-2)
const m3 = ("0" + ((time / 10) % 100)).slice(-2)

const myArr= []

const myTime =(new Date(time).toISOString().slice(11, 19))
function reset () {
 
  alert(`your time is: ${myTime}`)

  // inja bayad az form etelaat ro begire
  myArr.push(value1,value2,myTime.toString())
  csvData.push(myArr)

  console.log(csvData)
  setTime(0)
  // setValue1("")
  setValue2("")
}

  return (
    <>
    <div>
    <form>
      <p>your name</p>
      
      <input type="text" value={value1}  onChange={e => setValue1(e.target.value)}/>
      <p>PO#</p>
      <input type="text" value={value2}  onChange={e => setValue2(e.target.value)}/>
      <p>
        Your total time:
      </p>
      <input type="text" value={myTime}/>

    </form>

  </div>
    <div className="Timers">
      <h2>Start timing your tasks</h2>
      <div id="display">
        
        <span>{m1}:</span>
        <span>{m2}:</span>
        <span>{m3}</span>

      </div>
    
      <div id="buttons">
        {!timerOn && time === 0 && (
          <button onClick={() => setTimerOn(true)}>Start</button>
        )}
        {timerOn && <button onClick={() => setTimerOn(false)}>Stop</button>}
        {!timerOn && time > 0 && (
          <button onClick={reset}>Reset</button>
        )}
        {!timerOn && time > 0 && (
          <button onClick={() => setTimerOn(true)}>Resume</button>
        )}
      </div>
      <div>
      {/* <span>{myTime}</span> */}
      <p></p>
      <CSVLink data={csvData}><button id = "finish" onClick={e => setValue1("")}>My shift is finished</button></CSVLink>

      {/* <CSVDownload data={csvData} target="_blank" /> */}
      </div>
    </div>
    </>
  );
};

export default App;