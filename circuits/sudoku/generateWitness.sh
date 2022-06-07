#!/bin/bash

# Variable to store the name of the circuit
CIRCUIT=sudoku

# In case there is a circuit name as input
if [ "$1" ]; then
    CIRCUIT=$1
fi

# Compile the circuit
circom ${CIRCUIT}.circom --r1cs --wasm --sym --c

# Generate the witness.wtns
node ${CIRCUIT}_js/generate_witness.js ${CIRCUIT}_js/${CIRCUIT}.wasm input.json ${CIRCUIT}_js/witness.wtns
