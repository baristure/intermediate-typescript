// *************** keyof ***************

// The keyof type query allows us to obtain type representing all property keys on a given interface
type DatePropertyNames = keyof Date;

type DateSringPropertNames = DatePropertyNames & string // type DateSringPropertNames = "toString" | "toDateString" | "toTimeString" | "toLocaleString" | "toLocaleDateString" | "toLocaleTimeString" | "valueOf" | "getTime" | "getFullYear" | "getUTCFullYear" | ... 33 more ... | "getVarDate"

type DateSymbolPropertyNames = DatePropertyNames & symbol // type DateSymbolPropertyNames = typeof Symbol.toPrimitive

// *************** typeof ***************
// The typeof type query allows you to extract a type from a value.

async function main(){
  const apiResponse = await Promise.all([
    fetch("https://api.github.com/users/octocat"),
    Promise.resolve("Typescript is awesome!")
  ])
  type apiResponse = typeof apiResponse // type apiResponse = [Response, string]

}

// A common use of typeof is to obtain a type representing the “static site” of a class (meaning: constructor, static properties, and other things not present on an instance of the class)

class Fruit{
  constructor(
    public readonly name:string,
    public readonly mass:number,
    public readonly color:string
  ){}
    static createBanana(){
      return new Fruit("Banana", 125, "yellow");
    }
}

const myFruit = Fruit  // type myFruit = typeof Fruit
const banana = Fruit.createBanana() // const banana: Fruit
// MyFruit, the class (constructor) is of type typeof Fruit, where instances are of type Fruit