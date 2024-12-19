import {IStates} from "~/stores/states";
import {Router} from "vue-router";



export const parseMsg = (msg: string, store: IStates, router: Router): boolean => {
  // Define parsing functions here.
  // All functions should take two parameters: message(string) and store/router, and return a boolean.
  // Order of functions in the array matters, the first function that returns true will be used to parse the message.
  const stateLogics = [parseStateJSON, parseCounterString, ];
  const routeLogics = [parseRouteJSON, parseRouteString, ];

  let flag = false;
  for (const logic of stateLogics) {
    const result = logic(msg, store);
    if (result) {
      flag = true;
    }
  }
  for (const logic of routeLogics) {
    const result = logic(msg, router);
    if (result) {
      flag = true;
    }
  }
  return flag;
}

interface JSONState {
  state: string;
  value: any;
}

interface JSONRoute {
  route: string;
}

/**
 * Sample JSON message:
 * { "state": "counter", "value": 10 }
 */
const parseStateJSON = (msg: string, store: IStates): boolean => {
  let json: object | null = null;
  try {
    json = JSON.parse(msg);
  } catch (e) {
    return false; // fall to another parsing logic
  }
  if (json && typeof json === "object" && "state" in json && "value" in json) {
    const state = (json as JSONState).state;
    const value = (json as JSONState).value;
    store.modify(state, value)
    return true;
  }
  return false; // fall to another parsing logic
}

/**
 * Sample string message:
 * cnt=10
 */
const parseCounterString = (msg: string, store: IStates): boolean => {
  if (msg.startsWith("cnt=")) {
    const count = parseInt(msg.slice(4));
    if (count) {
      store.modify("counter", count);
      return true;
    }
  }
  return false; // fall to another parsing logic
}

/**
 * Sample JSON message:
 * { "route": "about" }
 */
const parseRouteJSON = (msg: string, router: Router): boolean => {
  let json: object | null = null;
  try {
    json = JSON.parse(msg);
    } catch (e) {
      return false; // fall to another parsing logic
  }
  if (json && typeof json === "object" && "route" in json) {
    const path = (json as JSONRoute).route;
    router.push(path);
    return true;
  }
  return false; // fall to another parsing logic
}

/**
 * Sample string message:
 * $about
 */
const parseRouteString = (msg: string, router: Router): boolean => {
  if (msg.startsWith("$")) {
    const newPath = msg.slice(1);
    if (newPath) {
      router.push(newPath);
    }
    return true;
  }
  return false; // fall to another parsing logic
}


