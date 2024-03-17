import React, { useState } from "react";
import { ActionBar } from "./components/ActionBar";
import { ListItem } from "./components/ListItem";

export default function App({ context, data }) {
  const [statusRequest, setStatusRequest] = useState({});
  const [durationRequest, setDurationRequest] = useState({});
  const [validateRequest, setValidateRequest] = useState({});
  const [runningState, setRunningState] = useState(false);
  const [validateRun, setValidateRun] = useState(undefined);
  const [loopingValue, setLoopingValue] = useState(1)
  const [requestsMap, setRequestsMap] = useState(new Map());

  const resetStates = () => {
    setRunningState(true);
    setDurationRequest({});
    setValidateRequest({});
    setStatusRequest({});
    setValidateRun(true);
    setRequestsMap(new Map())
  };

  const extractBracketsValue = (str, defaultStatusCode) => {
    const match = str.match(/\[([^\]]+)\]/);
    return match ? match[1] : defaultStatusCode;
  };

  async function runRequests(req, defaultStatusCode){
      const response = await context.network.sendRequest(req);
      const validation =
        extractBracketsValue(req.name, defaultStatusCode) === response.statusCode.toString();
      if (!validation) {
        setValidateRun(false);
      }
      setStatusRequest((status) => ({
        ...status,
        [req._id]: response.statusCode,
      }));
      setDurationRequest((duration) => ({
        ...duration,
        [req._id]: Math.floor(response.elapsedTime),
      }));
      setValidateRequest((validate) => ({
        ...validate,
        [req._id]: validation,
      }));
      updateRequestsMap([req._id])
      return response;
  }

  async function updateRequestsMap(requestIds){
    setRequestsMap((prevMap)=>{
      let newMap = new Map(prevMap)
      requestIds.forEach(requestId=>{
        newMap.set(requestId, newMap.get(requestId)!=undefined? newMap.get(requestId)+1 : 1)

      })
      return newMap;
    })
  }

  async function runAllRequests (parallel, defaultStatusCode){
    const reqs = data.requests;
    resetStates();
    const poolSize = data.requests.length;
    let loop = loopingValue;
    while(loop-- > 0){
      let promiseList = [];
      for (const req of reqs) {
        let element = document.getElementById(req._id);
        if(element === null || !element.checked){
          continue;
        }
        let response = runRequests(req, defaultStatusCode);
        if(!parallel) {
          await response;
        }else{
          promiseList.push(response);
        }
      }
      await Promise.all(promiseList)
    }
    setRunningState(false);
  };

  return (
    <>
      <ActionBar
        onSubmit={runAllRequests}
        runningState={runningState}
        validateRun={validateRun}
        setLoopingValue={setLoopingValue}
      />
      <div style={{ marginTop: "5px" }}>
        <ul>
          {data.requests.map((r) => (
            <ListItem
              key={r._id}
              requestId={r._id}
              method={r.method}
              name={r.name}
              onClick={(_) => handleRequest(r._id)}
              status={statusRequest[r._id]}
              duration={durationRequest[r._id]}
              validate={validateRequest[r._id]}
              finishedCount={requestsMap.get(r._id)!=undefined? requestsMap.get(r._id) : 0}
              loopingValue={loopingValue}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
