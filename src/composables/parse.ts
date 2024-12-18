import {IStates} from "~/stores/states";


export const parseMsg = (msg: string, store: any): boolean => {
  // Define parsing functions here.
  // All functions should take two parameters: message(string) and store, and return a boolean.
  // Order of functions in the array matters, the first function that returns true will be used to parse the message.
  const logics = [parseJSONState, parseCounterString];

  for (const logic of logics) {
    const result = logic(msg, store);
    if (result) {
      return true;
    }
  }
  return false;  // no logic matched, return false
}

interface JSONState {
  state: string;
  value: any;
}

const parseJSONState = (msg: string, store: IStates): boolean => {
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


