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

export function ActionBar({ onSubmit, runningState, validateRun }) {
  const handleSubmit = function(parallel = false){
    let ele = document.getElementById('statusCode')
    let statusCode = ele.value
    if(statusCode == null || statusCode == undefined || statusCode == ''){
      statusCode = "200"
    }
    onSubmit(parallel, statusCode);
  }


  return (
    <div
      className={clsx(
        "flex flex-row",
        css`
          margin-bottom: 12px;
          align-items: baseline;
          margin-right: 2px;
          gap: 4px
        `
      )}
    >
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
      <span className={buttonStyles(true)}>
        Default status code: <input id="statusCode" type="text" defaultValue={200} 
        style={{width:"35px", outline:"2px solid #039103", borderRadius:"4px"}}
        ></input>
      </span>
      <span className="flex-1"></span>
      <RunState runningState={runningState} validateRun={validateRun} />
    </div>
  );
}

export default ActionBar;
