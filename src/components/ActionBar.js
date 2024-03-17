import React, { useState } from "react";
import { css } from "@emotion/css";
import { clsx } from "clsx";
import RunState from "./RunState";

const buttonStyles = (disabled) => css`
  margin-left: 0px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: green;
  border-radius: 3px;
  ${disabled === false &&
  `
    &:hover {
      background-color: darkgreen;
      color: darkgrey;
    }
  `}
`;


export function ActionBar({ onSubmit, runningState, validateRun, setLoopingValue }) {
  const handleSubmit = function(parallel = false){
    let statusCode = "200";
    statusCode = document.getElementById('statusCode').value;

    if(statusCode == null || statusCode == undefined || statusCode == ''){
      statusCode = "200"
    }
    onSubmit(parallel, statusCode);
  }
  let order = clsx(
    "flex flex-row",
    css`
      margin-bottom: 12px;
      align-items: baseline;
      margin-right: 2px;
      gap: 4px
    `
  )
  function changeLoopingValue(event){
    setLoopingValue((preVal)=>{
      let newVal = Number(event.target.value);
      if(Number.isInteger(newVal)){
        if(newVal <= 0) newVal = 1
      }
      return newVal
    })
    
  }


  return (
    <>
    <div className={order}>
      <span className={buttonStyles(true)}>
        Default status code: <input id="statusCode" type="text" defaultValue={200} 
        style={{width:"30px", outline:"2px solid #039103", borderRadius:"4px"}}
        ></input>
      </span>
      <span className={buttonStyles(true)}>
        Loop for: <input id="loopingValue" type="text" defaultValue={1}  onChange={changeLoopingValue}
        style={{width:"30px", outline:"2px solid #039103", borderRadius:"4px"}}
        ></input> times
      </span>
      </div>
      <div className={order}>
      <button
        className={buttonStyles(runningState)}
        onClick={()=>handleSubmit(false)}
        disabled={runningState}
      >
        Run
        <i className="fa fa-play space-left"></i>
      </button>
      <button
        className={buttonStyles(runningState)}
        onClick={()=>handleSubmit(true)}
        disabled={runningState}
      >
        Run in Parallel
        <i className="fa fa-fast-forward space-left"></i>
      </button>
      <span className="flex-1"></span>
      <RunState runningState={runningState} validateRun={validateRun} />
      </div>
      </>
  );
}

export default ActionBar;
