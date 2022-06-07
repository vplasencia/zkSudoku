const main = async () => {
  const SudokuVerifier = await hre.ethers.getContractFactory("SudokuVerifier");
  const sudokuVerifier = await SudokuVerifier.deploy();
  await sudokuVerifier.deployed();
  console.log("SudokuVerifier Contract deployed to:", sudokuVerifier.address);

  const Sudoku = await hre.ethers.getContractFactory("Sudoku");
  const sudoku = await Sudoku.deploy(sudokuVerifier.address);
  await sudoku.deployed();
  console.log("Sudoku Contract deployed to:", sudoku.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
