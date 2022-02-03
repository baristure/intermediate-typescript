// a set of four specific things
type FavoriteColors =
  | "dark sienna"
  | "van dyke brown"
  | "yellow ochre"
  | "sap green"
  | "titanium white"
  | "phthalo green"
  | "prussian blue"
  | "cadium yellow"
  | [number, number, number]
  | { red: number; green: number; blue: number };

// *************** Extract ***************
// Extract is useful for obtaining some sub-part of a type that is assignable to some other type.

type StringColors = Extract<FavoriteColors, string>;

type ObjectColors = Extract<FavoriteColors, { red: number }>;

type TupleColors = Extract<FavoriteColors, [number, number, number]>;

// *************** Exclude ***************
// Exclude is the opposite of Extract, in that it’s useful for obtaining the part of a type that’s not assignable to some other type

type NonStringColors = Exclude<FavoriteColors, string>;

//! Source code of Exclude and Extract
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;
