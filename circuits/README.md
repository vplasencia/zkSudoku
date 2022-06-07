# zkGames circom circuits

This folder contains the `sudoku.circom` [circuit](https://github.com/iden3/circom) used in the zkSudoku application.

## Install dependencies

To install all the dependencies run:

```bash
yarn install
```

## Compile circuits and generate and verify the zk-proof using [snarkjs](https://github.com/iden3/snarkjs)

To know how is everything generated, you can see the `executeGroth16.sh` file inside the `sudoku` folder.

To compile and run the circuit, go inside the sudoku folder and run:

Run the first time:

```bash
chmod u+x executeGroth16.sh
```

And after that, you can always run:

```bash
./executeGroth16.sh
```
