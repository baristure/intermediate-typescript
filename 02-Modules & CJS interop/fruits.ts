function createBanana() {
  return { name: "banana", color: "yellow", mass: 183 }
}

// equivalent to CJS `module.exports = createBanana`
export = createBanana