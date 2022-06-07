const { assert } = require("chai");
const wasm_tester = require("circom_tester").wasm;

describe("Sudoku circuit", function () {
  let sudokuCircuit;

  before(async function () {
    sudokuCircuit = await wasm_tester("sudoku/sudoku.circom");
  });

  it("Should generate the witness successfully", async function () {
    let input = {
      unsolved: [
        [0, 0, 0, 0, 0, 6, 0, 0, 0],
        [0, 0, 7, 2, 0, 0, 8, 0, 0],
        [9, 0, 6, 8, 0, 0, 0, 1, 0],
        [3, 0, 0, 7, 0, 0, 0, 2, 9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [4, 0, 0, 5, 0, 0, 0, 7, 0],
        [6, 5, 0, 1, 0, 0, 0, 0, 0],
        [8, 0, 1, 0, 5, 0, 3, 0, 0],
        [7, 9, 2, 0, 0, 0, 0, 0, 4],
      ],
      solved: [
        [1, 8, 4, 3, 7, 6, 2, 9, 5],
        [5, 3, 7, 2, 9, 1, 8, 4, 6],
        [9, 2, 6, 8, 4, 5, 7, 1, 3],
        [3, 6, 5, 7, 1, 8, 4, 2, 9],
        [2, 7, 8, 4, 6, 9, 5, 3, 1],
        [4, 1, 9, 5, 3, 2, 6, 7, 8],
        [6, 5, 3, 1, 2, 4, 9, 8, 7],
        [8, 4, 1, 9, 5, 7, 3, 6, 2],
        [7, 9, 2, 6, 8, 3, 1, 5, 4],
      ],
    };
    const witness = await sudokuCircuit.calculateWitness(input);
    await sudokuCircuit.assertOut(witness, {});
  });
  it("Should fail because there is a number out of bounds", async function () {
    // The number 10 in the first row of solved is > 9
    let input = {
      unsolved: [
        [0, 0, 0, 0, 0, 6, 0, 0, 0],
        [0, 0, 7, 2, 0, 0, 8, 0, 0],
        [9, 0, 6, 8, 0, 0, 0, 1, 0],
        [3, 0, 0, 7, 0, 0, 0, 2, 9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [4, 0, 0, 5, 0, 0, 0, 7, 0],
        [6, 5, 0, 1, 0, 0, 0, 0, 0],
        [8, 0, 1, 0, 5, 0, 3, 0, 0],
        [7, 9, 2, 0, 0, 0, 0, 0, 4],
      ],
      solved: [
        [1, 8, 4, 3, 7, 6, 2, 9, 10],
        [5, 3, 7, 2, 9, 1, 8, 4, 6],
        [9, 2, 6, 8, 4, 5, 7, 1, 3],
        [3, 6, 5, 7, 1, 8, 4, 2, 9],
        [2, 7, 8, 4, 6, 9, 5, 3, 1],
        [4, 1, 9, 5, 3, 2, 6, 7, 8],
        [6, 5, 3, 1, 2, 4, 9, 8, 7],
        [8, 4, 1, 9, 5, 7, 3, 6, 2],
        [7, 9, 2, 6, 8, 3, 1, 5, 4],
      ],
    };
    try {
      await sudokuCircuit.calculateWitness(input);
    } catch (err) {
      // console.log(err);
      assert(err.message.includes("Assert Failed"));
    }
  });
  it("Should fail because unsolved is not the initial state of solved", async function () {
    // unsolved is not the initial state of solved
    let input = {
      unsolved: [
        [0, 0, 0, 0, 0, 6, 0, 0, 0],
        [0, 0, 7, 2, 0, 0, 8, 0, 0],
        [9, 0, 6, 8, 0, 0, 0, 1, 0],
        [3, 0, 0, 7, 0, 0, 0, 2, 9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [4, 0, 0, 5, 0, 0, 0, 7, 0],
        [6, 5, 0, 1, 0, 0, 0, 0, 0],
        [8, 0, 1, 0, 5, 0, 3, 0, 0],
        [7, 9, 2, 0, 0, 0, 0, 0, 4],
      ],
      solved: [
        [1, 2, 7, 5, 8, 4, 6, 9, 3],
        [8, 5, 6, 3, 7, 9, 1, 2, 4],
        [3, 4, 9, 6, 2, 1, 8, 7, 5],
        [4, 7, 1, 9, 5, 8, 2, 3, 6],
        [2, 6, 8, 7, 1, 3, 5, 4, 9],
        [9, 3, 5, 4, 6, 2, 7, 1, 8],
        [5, 8, 3, 2, 9, 7, 4, 6, 1],
        [7, 1, 4, 8, 3, 6, 9, 5, 2],
        [6, 9, 2, 1, 4, 5, 3, 8, 7],
      ],
    };
    try {
      await sudokuCircuit.calculateWitness(input);
    } catch (err) {
      // console.log(err);
      assert(err.message.includes("Assert Failed"));
    }
  });
  it("Should fail due to repeated numbers in a row", async function () {
    // The number 1 in the first row of solved is twice
    let input = {
      unsolved: [
        [0, 0, 0, 0, 0, 6, 0, 0, 0],
        [0, 0, 7, 2, 0, 0, 8, 0, 0],
        [9, 0, 6, 8, 0, 0, 0, 1, 0],
        [3, 0, 0, 7, 0, 0, 0, 2, 9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [4, 0, 0, 5, 0, 0, 0, 7, 0],
        [6, 5, 0, 1, 0, 0, 0, 0, 0],
        [8, 0, 1, 0, 5, 0, 3, 0, 0],
        [7, 9, 2, 0, 0, 0, 0, 0, 4],
      ],
      solved: [
        [1, 8, 4, 3, 7, 6, 2, 9, 1],
        [5, 3, 7, 2, 9, 1, 8, 4, 6],
        [9, 2, 6, 8, 4, 5, 7, 1, 3],
        [3, 6, 5, 7, 1, 8, 4, 2, 9],
        [2, 7, 8, 4, 6, 9, 5, 3, 1],
        [4, 1, 9, 5, 3, 2, 6, 7, 8],
        [6, 5, 3, 1, 2, 4, 9, 8, 7],
        [8, 4, 1, 9, 5, 7, 3, 6, 2],
        [7, 9, 2, 6, 8, 3, 1, 5, 4],
      ],
    };
    try {
      await sudokuCircuit.calculateWitness(input);
    } catch (err) {
      // console.log(err);
      assert(err.message.includes("Assert Failed"));
    }
  });
  it("Should fail due to repeated numbers in a column", async function () {
    // The number 4 in the first column of solved is twice and the number 7 in the last column of solved is twice too
    let input = {
      unsolved: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      solved: [
        [1, 8, 4, 3, 7, 6, 2, 9, 5],
        [5, 3, 7, 2, 9, 1, 8, 4, 6],
        [9, 2, 6, 8, 4, 5, 7, 1, 3],
        [3, 6, 5, 7, 1, 8, 4, 2, 9],
        [2, 7, 8, 4, 6, 9, 5, 3, 1],
        [4, 1, 9, 5, 3, 2, 6, 7, 8],
        [6, 5, 3, 1, 2, 4, 9, 8, 7],
        [8, 4, 1, 9, 5, 7, 3, 6, 2],
        [4, 9, 2, 6, 8, 3, 1, 5, 7],
      ],
    };
    try {
      await sudokuCircuit.calculateWitness(input);
    } catch (err) {
      // console.log(err);
      assert(err.message.includes("Assert Failed"));
    }
  });
  it("Should fail due to repeated numbers in a square", async function () {
    // The number 1 in the first square (top-left) of solved is twice
    let input = {
      unsolved: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      solved: [
        [1, 8, 4, 3, 7, 6, 2, 9, 5],
        [5, 3, 7, 2, 9, 1, 8, 4, 6],
        [9, 2, 1, 8, 4, 5, 7, 6, 3],
        [3, 6, 5, 7, 1, 8, 4, 2, 9],
        [2, 7, 8, 4, 6, 9, 5, 3, 1],
        [4, 1, 9, 5, 3, 2, 6, 7, 8],
        [6, 5, 3, 1, 2, 4, 9, 8, 7],
        [8, 4, 6, 9, 5, 7, 3, 1, 2],
        [7, 9, 2, 6, 8, 3, 1, 5, 4],
      ],
    };
    try {
      await sudokuCircuit.calculateWitness(input);
    } catch (err) {
      // console.log(err);
      assert(err.message.includes("Assert Failed"));
    }
  });
});
