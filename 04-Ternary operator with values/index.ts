// JavaScript provides a ternary1 operator that allows us to express this kind of logic concisely
const x = 16;
const isXEven = x % 2 === 0 ? "even" : "odd"; // const isXEven: "even" | "odd"
// The general format of this expression in the regular JS/TS world, when used with values is:
// condition ? exprIfTrue : exprIfFalse

// *************** Conditional Types ***************
// Conditional types allow for types to be expressed using a very similar (basically, the same) syntax
class Grill {
  startGas() {}
  stopGas() {}
}
class Oven {
  setTemperature(degress: number) {}
}

type CookingDevice<T> = T extends "grill" ? Grill : Oven;

let device1: CookingDevice<"grill">; // let device1: Grill
let device2: CookingDevice<"oven">; // let device2: Oven

// Excercises
type answer_1 = 64 extends number ? true : false; // type answer_1 = true
type answer_2 = number extends 64 ? true : false; // type answer_2 = false
type answer_3 = string[] extends any ? true : false; // type answer_3 = true
type answer_4 = string[] extends any[] ? true : false; // type answer_4 = true
type answer_5 = never extends any ? true : false; // type answer_5 = true
type answer_6 = any extends any ? true : false; // type answer_6 = true
type answer_7 = Date extends { new (...args: any[]): any } ? true : false; //type answer_7 = false
type answer_8 = typeof Date extends { new (...args: any[]): any }
  ? true
  : false;
// type answer_8 = true
