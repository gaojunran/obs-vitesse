import {defineStore} from 'pinia';

export interface IStates {
  modify(attr: string, value: any): void;
  counter: number;
  // implement more states here
}

export const useStateStore = defineStore('states', {
  state: () => {
    return {
      counter: 0,
      // implement more states here
    }
  },
  actions: {
    modify(attr: string, value: any){
      if (!this.hasOwnProperty(attr)) {
        throw new Error(`Attribute ${attr} does not exist`);
      }
      console.log(`Modifying ${attr} to ${value}`)
      this[attr as keyof IStates] = value;
    }
  }
});
