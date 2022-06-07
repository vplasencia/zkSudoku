#!/bin/bash

# Create the zkproof folder inside the public folder if it does not exist
mkdir -p public/zkproof

# Copy the wasm file
cp ../circuits/sudoku/sudoku_js/sudoku.wasm public/zkproof

# Copy the final zkey
cp ../circuits/sudoku/sudoku_final.zkey public/zkproof

# Create the abiFiles folder inside the utils folder if it does not exist
mkdir -p utils/abiFiles

# Copy the abi file
cp ../contracts/artifacts/contracts/Sudoku.sol/Sudoku.json utils/abiFiles
