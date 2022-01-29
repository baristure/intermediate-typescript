// *************** Stacking multiple things on an identifier ***************
interface Fruit {
  name: string;
  mass: number;
  color: string;
}

const Fruit = {
  name: "Banana",
  color: "yellow",
  mass: 125,
};
export { Fruit };
/**
(alias) interface Fruit
(alias) const Fruit: {
    name: string;
    color: string;
    mass: number;
}
 */
//? there’s a third kind of thing we can stack on this called a *** namespace ***
class Car {
  static createCar(): Car {
    return { name: "Volkswagen", color: "Black", year: 2022 };
  }
}
// the namespace
namespace Car {
  // class Car namespace Car
  function createCar(): Car {
    return Car.createCar(); // the class
  }
}

interface Car {
  name: string;
  color: string;
  year: number;
}
export { Car };
/** 
 * Aliases->
class Car
interface Car
namespace Car

 * We have one identifier that’s three things in one:
 * - a value (class)
 * - a type
 * - a namespace
*/

// ***************  How to tell what's on an identifier ***************

const is_a_value = 4;
type is_a_type = {};
namespace is_a_namespace {
  const foo = 4;
}
const x = is_a_value; // const x: is a value
const y: is_a_type = {}; // const y: is_a_type
is_a_namespace; // namespace is_a_namespace

const a = is_a_type; //! 'is_a_type' only refers to a type, but is being used as a value here.ts(2693)
const b: is_a_value = {}; //! 'is_a_value' only refers to a value, but is being used as a type here.ts(2693)

// ***************  What's the point namespace ***************

$.ajax({
  url:"/api/getweather",
  data:{
    zipcode:06830,
  },
  success: function(result){
    $("#weather-temp")[0].innerHTML = "h1" + result + "° </h1>";
  },
})
$("h1.title").forEach((node)=>{
  node.tagName // (property) Element.tagName: string
})

/**
 * We could define a function and a namespace that “stack” like this, so that $ could simultaneously be invoked directly,
 * and serve as a namespace for things like $.ajax, $.getJSON and so on…
 */

function $(selector:string):NodeListOf<Element>{
  return document.querySelectorAll(selector);
}
namespace $ {
  export function ajax(arg:{
    url:string,
    data:any,
    success:(response:any)=> void,
  }) :Promise<any>{
    return Promise.resolve();
  }
}

// ***************  A look back on *** class *** ***************
class Car2 {
  name?:string
  color?:string
  year?:number
  static createCar(): Car2 {
    return { name: "Volkswagen", color: "Black", year: 2022 };
  }
}
// test to our type and value test to this Car2 identifier
// how to test for a value
const valueTest = Car2
valueTest.createCar // call // caller // createCar
// how to test for a type
let typeTest:Fruit={} as any // typeTest:Fruit
typeTest.name // (property) Fruit.name: string

// So it seems that classes are both a type and a value.

