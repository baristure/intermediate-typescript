// *************** ES Module imports and exports ***************
// named imports
import { strawberry, raspberry } from "./berries";
import kiwi from "./kiwi"; // default import
export function makeFruitSalad() {} // named export
export default class FruitBasket {} // default export
export { lemon, lime } from "./citrus";

// import an entire workspace

import * as allBerries from "./berries"; // namespace import
allBerries.strawberry; // using the namespace
allBerries.raspberry;
allBerries.blueberry;
export * from "./berries"; // namespace re-export

// TypeScript also allows something that was recently added (2021) to the JS language

export * as berries from "./berries"; // namespace re-export

// *************** CommonJS Interop ***************
const fs = require("fs");

// namespace import
import * as fs from "fs";

// but sometimes,we’ll run into a rare situation where the CJS module we’re importing from, exports a single thing that’s incompatible with this namespace import technique.
////////////////////////////////////////////////////////
// @filename: fruits.ts
function createBanana() {
  return { name: "Banana", color: "yellow", mass: 125 };
}
// This module can only be referenced with ECMAScript imports/exports by turning on the 'esModuleInterop' flag and referencing its default export.
// equivalent to CJS `module.exports = createBanana`

// The compiled output of our files will be in the CJS world
////////////////////////////////////////////////////////
// @filename: fruits.js
("use strict");
function createBanana() {
  return { name: "banana", color: "yellow", mass: 183 };
}
module.exports = createBanana;

////////////////////////////////////////////////////////
// @filename: smoothie.js
("use strict");
Object.defineProperty(exports, "__esModule", { value: true });
var createBanana = require("./fruits");
var banana = createBanana();

// *************** Importing non-TS things ***************

//  Particularly if we use a bundler like webpack, parcel or snowpack, we may end up importhing things that aren't .js or .ts files.
// For example we need import a .png file
import image from "./file.png"; // Cannot find module './file.png' or its corresponding type declarations.ts(2307)

/**
 * file.png is obviously not a TypeScript file — we just need to tell TypeScript that whenever we import a .png file,
 * it should be treated as if it’s a JS module with a string value as its default export
 */
// @filename: global.d.ts
declare module "*.png" {
  const imgUrl: string;
  export default imgUrl;
}
// @filename: component.ts
import img from "./file.png";

// Like an interface, this is purely type information that will “compile away” as part of our build process. 