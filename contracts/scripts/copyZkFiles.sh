#!/bin/bash

# Copy the verifier
cp ../circuits/sudoku/sudokuVerifier.sol contracts

# Create the zkproof folder if it does not exist
mkdir -p zkproof

# Copy the wasm file to test smart contracts
cp ../circuits/sudoku/sudoku_js/sudoku.wasm zkproof

# Copy the final zkey file to test smart contracts
cp ../circuits/sudoku/sudoku_final.zkey zkproof
