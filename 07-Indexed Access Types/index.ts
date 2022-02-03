/**
 *! Indexed Access types provide a mechanism for retrieving part(s) of an array or object type via indices.
 */

interface Car {
  make: string;
  model: string;
  year: number;
  color: {
    red: string;
    green: string;
    blue: string;
  };
}

let carColor: Car["color"];
/**
let carColor: {
  red: string;
  green: string;
  blue: string;
}
 */

let carColorRedComponent: Car["color"]["red"]; // string

let carProperty: Car["color" | "year"];
/**
let carProperty: number | {
    red: string;
    green: string;
    blue: string;
}
 */
