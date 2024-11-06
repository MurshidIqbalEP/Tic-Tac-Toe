import { useEffect, useRef, useState } from "react";
import circle from "../assets/circle.png";
import cross from "../assets/cross.png";
import Celebration from "./celebration";
import gsap from "gsap";

function Tictactoe() {
  let initialData = ["", "", "", "", "", "", "", "", ""];
  let [data, setData] = useState(initialData);
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [winner, setWinner] = useState("");

  const winnerTextRef = useRef(null);

  useEffect(() => {
    if (winner) {
      gsap.fromTo(
        winnerTextRef.current,
        { opacity: 0, scale: 10 },
        { opacity: 1, scale: 1, duration: 1, ease: "bounce.out" }
      );
    }
  }, [winner]);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (updatedData) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        updatedData[a] &&
        updatedData[a] === updatedData[b] &&
        updatedData[a] === updatedData[c]
      ) {
        setWinner(updatedData[a] === "x" ? "Player X" : "Player O");
        setLock(true);
        return;
      }
    }

    if (!updatedData.includes("") && !winner) {
      setWinner("It's a draw!");
      setLock(true);
    }
  };

  const toggle = (e, num) => {
    if (lock || data[num]) return;

    let newData = [...data];
    newData[num] = count % 2 === 0 ? "x" : "o";
    setData(newData);
    setCount(count + 1);
    checkWinner(newData);

    e.target.innerHTML =
      count % 2 === 0
        ? `<img src='${cross}' alt="X">`
        : `<img src='${circle}' alt="O">`;
  };

  const resetGame = () => {
    setData(initialData);
    setCount(0);
    setLock(false);
    setWinner("");
    document.querySelectorAll(".boxes").forEach((box) => (box.innerHTML = ""));
  };

  return (
    <div className="bg-slate-900 flex flex-col items-center w-screen h-screen space-y-8">
      {winner && <Celebration />}

      <h1
        className={
          winner
            ? "text-red-400 font-extrabold text-5xl mt-9"
            : "text-white font-extrabold text-4xl mt-9"
        }
        ref={winnerTextRef}
      >
        {winner ? `${winner} wins!` : "Let the challenge begin!"}
      </h1>

      <div className="flex flex-col  items-center ">
        <div className="flex h-[550px] w-[564px] m-auto">
          <div className="row1">
            <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
          </div>
          <div className="row2">
            <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
          </div>
          <div className="row3">
            <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
          </div>
        </div>

        <button
          onClick={resetGame}
          className="rounded-xl bg-slate-100 px-6 py-2 text-slate-900 font-semibold hover:bg-slate-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Tictactoe;
