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

## Deploy on [Harmony Testnet](https://explorer.pops.one/)

Create a `.env` file and add to it:

```text
PRIVATE_KEY=<yourPrivateKey>
```

where `yourPrivateKey` is the private key of your wallet.

To deploy on Harmony Testnet run:

```bash
npx hardhat run scripts/deploy.js --network harmonyTestnet
```

## Deploy on [Harmony Mainnet](https://explorer.harmony.one/)

Create a `.env` file and add to it:

```text
PRIVATE_KEY=<yourPrivateKey>
```

where `yourPrivateKey` is the private key of your wallet.

To deploy on Harmony Mainnet run:

```bash
npx hardhat run scripts/deploy.js --network harmonyMainnet
```

## zkSudoku contracts graph
