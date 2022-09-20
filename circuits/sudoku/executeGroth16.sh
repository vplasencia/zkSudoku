#!/bin/bash

# Variable to store the name of the circuit
CIRCUIT=sudoku

# Variable to store the number of the ptau file
PTAU=14

# In case there is a circuit name as an input
if [ "$1" ]; then
    CIRCUIT=$1
fi

# In case there is a ptau file number as an input
if [ "$2" ]; then
    PTAU=$2
fi

# Check if the necessary ptau file already exists. If it does not exist, it will be downloaded from the data center
if [ -f ./ptau/powersOfTau28_hez_final_${PTAU}.ptau ]; then
    echo "----- powersOfTau28_hez_final_${PTAU}.ptau already exists -----"
else
    echo "----- Download powersOfTau28_hez_final_${PTAU}.ptau -----"
    wget -P ./ptau https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_${PTAU}.ptau
fi

# Compile the circuit
circom ${CIRCUIT}.circom --r1cs --wasm --sym --c

# Generate the witness.wtns
node ${CIRCUIT}_js/generate_witness.js ${CIRCUIT}_js/${CIRCUIT}.wasm input.json ${CIRCUIT}_js/witness.wtns

echo "----- Generate .zkey file -----"
# Generate a .zkey file that will contain the proving and verification keys together with all phase 2 contributions
snarkjs groth16 setup ${CIRCUIT}.r1cs ptau/powersOfTau28_hez_final_${PTAU}.ptau ${CIRCUIT}_0000.zkey

echo "----- Contribute to the phase 2 of the ceremony -----"
# Contribute to the phase 2 of the ceremony
snarkjs zkey contribute ${CIRCUIT}_0000.zkey ${CIRCUIT}_final.zkey --name="1st Contributor Name" -v -e="some random text"

echo "----- Export the verification key -----"
# Export the verification key
snarkjs zkey export verificationkey ${CIRCUIT}_final.zkey verification_key.json

echo "----- Generate zk-proof -----"
# Generate a zk-proof associated to the circuit and the witness. This generates proof.json and public.json
snarkjs groth16 prove ${CIRCUIT}_final.zkey ${CIRCUIT}_js/witness.wtns proof.json public.json

echo "----- Verify the proof -----"
# Verify the proof
snarkjs groth16 verify verification_key.json public.json proof.json

echo "----- Generate Solidity verifier -----"
# Generate a Solidity verifier that allows verifying proofs on Ethereum blockchain
snarkjs zkey export solidityverifier ${CIRCUIT}_final.zkey ${CIRCUIT}Verifier.sol
# Update the solidity version in the Solidity verifier
sed -i 's/0.6.11;/0.8.4;/g' ${CIRCUIT}Verifier.sol
# Update the contract name in the Solidity verifier
sed -i "s/contract Verifier/contract ${CIRCUIT^}Verifier/g" ${CIRCUIT}Verifier.sol

echo "----- Generate and print parameters of call -----"
# Generate and print parameters of call
snarkjs generatecall | tee parameters.txt
