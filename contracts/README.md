# zkSudoku smart contracts

This folder was generated using [Hardhat](https://github.com/NomicFoundation/hardhat) and contains all the smart contracts used in the zkSudoku application.

There are two smart contracts:

- `Sudoku`: for game logic (generate boards, verify boards).
- `sudokuVerifier`: to verify the zk proof (this contract was generated using snarkjs).

## Install dependencies

```bash
yarn install
```

## Run tests

```bash
npx hardhat test
```

When you run tests you will see something like this:

![RunTestsImage](https://user-images.githubusercontent.com/52170174/172546375-432bb341-2d4a-4d8f-8ecb-eef7854f7486.png)

## Deploy on [Sepolia](https://sepolia.etherscan.io/)

Create a `.env` file and add to it:

```text
PRIVATE_KEY=<yourPrivateKey>
```

where `yourPrivateKey` is the private key of your wallet.

To deploy on Sepolia run:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## zkSudoku contracts graph

![zkSudoku](https://user-images.githubusercontent.com/52170174/234149678-f5669809-3506-42df-b8df-90d72cd93cc3.svg)
