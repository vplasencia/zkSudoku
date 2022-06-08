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

## Run tests

```bash
yarn test
```

When you run tests you will see something like this:

![CircuitsTestsImage](https://user-images.githubusercontent.com/52170174/172546954-b90c6441-a63e-46a8-ad82-650475c2a35b.png)
