#!/bin/bash

# Variable to store the name of the circuit
CIRCUIT=sudoku

# In case there is a circuit name as input
if [ "$1" ]; then
    CIRCUIT=$1
fi

# Compile the circuit
circom ${CIRCUIT}.circom --r1cs --wasm --sym --c
