import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import GameCard from "../components/gameCard";
import sudokuImage from "../assets/sudoku.png";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <span className="mb-10 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500 ">
          Solve zkSudoku Games
        </span>
      </div>
      <div className="flex justify-center items-center">
        <GameCard nameGame="Sudoku" imageGame={sudokuImage} urlGame="/sudoku" />
      </div>
    </div>
  );
}
