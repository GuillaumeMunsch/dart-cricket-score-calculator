import { useState } from "react";
import "./App.css";
import { addPlayer, computeNextGameState, removePlayer } from "./game/DartGame";
import { Button, Flex, TextField } from "@radix-ui/themes";
import Cell from "./components/Cell";
import { Player, ScoreInput, scoreInputArray } from "./game/Player";

// const columnStyle: React.CSSProperties = {
//     width: "150px",
// }

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerNameInput, setPlayerNameInput] = useState("");

  return (
    <Flex align="center" direction="column">
      <TextField.Root
        value={playerNameInput}
        placeholder="Name..."
        onChange={(event) => setPlayerNameInput(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setPlayers(addPlayer(players)(playerNameInput));
            setPlayerNameInput("");
          }
        }}
        style={{ width: 150 }}
        mb="4"
      />
      <Flex>
        <div>
          <Cell>Name</Cell>
          <Cell>Penality</Cell>
          <Cell>20</Cell>
          <Cell>19</Cell>
          <Cell>18</Cell>
          <Cell>17</Cell>
          <Cell>16</Cell>
          <Cell>15</Cell>
          <Cell>C</Cell>
        </div>
        {players.map(({ name, score, penality }) => (
          <div>
            <Cell>
              {name}
              <Button
                ml="2"
                color="red"
                onClick={() => setPlayers(removePlayer(players)(name))}
              >
                -
              </Button>
            </Cell>
            <Cell>{penality}</Cell>
            {scoreInputArray.map((scoreInput: ScoreInput) => (
              <Cell>
                <Button
                  mr="2"
                  color="red"
                  onClick={() =>
                    setPlayers(
                      computeNextGameState(players)(name, scoreInput, false)
                    )
                  }
                >
                  -
                </Button>
                {score[scoreInput]}
                <Button
                  ml="2"
                  color="green"
                  onClick={() =>
                    setPlayers(computeNextGameState(players)(name, scoreInput))
                  }
                >
                  +
                </Button>
              </Cell>
            ))}
          </div>
        ))}
      </Flex>
    </Flex>
  );
}

export default App;
