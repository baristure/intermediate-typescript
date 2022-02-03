// *************** The basics ***************
type Fruit = {
  name: string;
  color: string;
  mass: number;
};

type Dict<T> = { [k: string]: T }; // index signature
const fruitCatalogDict: Dict<Fruit> = {};
fruitCatalogDict.apple; // Fruit

// We could this with a map type. We will use arbitrary keys instead of dict
// mapped type
type MyRecord1 = { [FruitKey in "apple" | "cherry"]: Fruit };

function fruitCatalog(fruitCatalog: MyRecord1) {
  fruitCatalog.apple;
  fruitCatalog.cherry;
  fruitCatalog.pineapple; //! Property 'pineapple' does not exist on type 'MyRecord'.
}

// *************** Record ***************
// - type MyRecord = { [FruitKey in "apple" | "cherry"]: Fruit }
// + type MyRecord<KeyType, ValueType> = { [Key in KeyType]: ValueType }

type MyRecord<KeyType extends string, ValueType> = {
  [Key in KeyType]: ValueType;
};

/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
let anyKey: keyof any; // let anyKey: string | number | symbol

// *************** Use with indexed access types ***************
type PartOfWindow1 = {
  [Key in "document" | "navigator" | "setTimeout"]: Window[Key];
};
/**
type PartOfWindow = {
    document: Document;
    navigator: Navigator;
    setTimeout: (handler: TimerHandler, timeout?: number, ...arguments: any[]) => number;
}
 */

type PickWindowProperties<Keys extends keyof Window> = {
  [Key in Keys]: Window[Key];
};
type PartOfWindow2 = PickWindowProperties<
  "document" | "navigator" | "setTimeout"
>;
/**
type PartOfWindow2 = {
    document: Document;
    navigator: Navigator;
    setTimeout: (handler: TimerHandler, timeout?: number, ...arguments: any[]) => number;
}
*/
type PickProperties<ValueType, Keys extends keyof ValueType> = {
  [Key in Keys]: ValueType[Key];
};
type PartOfWindow = PickProperties<
  Window,
  "document" | "navigator" | "setTimeout"
>;

// *************** Pick ***************
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type PickProperties<ValueType, Keys extends keyof ValueType> = {
  [Key in Keys]: ValueType[Key];
};

// *************** Mapping Modifiers ***************

/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};
/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
};
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type NotReadonly<T> = {
  -readonly [P in keyof T]: T[P];
};

// *************** Mapping Modifiers ***************

type ArtFeatures = "cabin" | "tree" | "sunset";
type Colors = "darkSienna" | "sapGreen" | "titaniumWhite" | "prussianBlue";
type ArtMethodNames = `paint_${Colors}_${ArtFeatures}`;
/**
 * type ArtMethodNames = "paint_darkSienna_cabin" | "paint_darkSienna_tree" | "paint_darkSienna_sunset" | "paint_sapGreen_cabin" | "paint_sapGreen_tree" | "paint_sapGreen_sunset" | "paint_titaniumWhite_cabin" | ... 4 more ... | "paint_prussianBlue_sunset"
 */

/**
 *
 * TypeScript provides a few special types you can use within these template literal types
 * UpperCase
 * LowerCase
 * Capitalize
 * Uncapitalize
 */

type ArtMethodNames2 = `paint${Capitalize<Colors>}${Capitalize<ArtFeatures>}`;

// use of the *** as *** keyword in the index signature
interface DataState {
  digits: number[];
  names: string[];
  flags: Record<"darkMode" | "mobile", boolean>;
}

type DataSDK = {
  // The mapped type
  [K in keyof DataState as `set${Capitalize<K>}`]: (arg: DataState[K]) => void;
};

function load(dataSDK: DataSDK) {
  dataSDK.setDigits([14]);
  dataSDK.setFlags({ darkMode: true, mobil: false });
  /**
   * (property) mobil: boolean
Argument of type '{ darkMode: true; mobil: boolean; }' is not assignable to parameter of type 'Record<"darkMode" | "mobile", boolean>'.
  Object literal may only specify known properties, but 'mobil' does not exist in type 'Record<"darkMode" | "mobile", boolean>'. Did you mean to write 'mobile'?ts(2345)
   */
}

// *************** Filtering properties out ***************
// Get keys of type T whose values are assignable to type U
type FilteredKeys<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T] &
  keyof T;

type RelevantDocumentKeys = FilteredKeys<
  Document,
  (...args: any[]) => Element | Element[]
>;

type ValueFilteredDoc = Pick<Document, RelevantDocumentKeys>;

function load2(doc: ValueFilteredDoc) {
  doc.querySelector("input");
}
