import { useState } from "react";
import "./App.css";
import { addPlayer, computeNextGameState, removePlayer } from "./game/DartGame";
import { Button, Flex, TextField } from "@radix-ui/themes";
import Cell from "./components/Cell";
import { Player, ScoreInput, scoreInputArray } from "./game/Player";

function useHistory<T>(defaultValue: T) {
  const [elems, setElems] = useState<T[]>(defaultValue ? [defaultValue] : []);

  const push = (value: T) => setElems([value, ...elems]);

  const pop = () => {
    const [, ...remainingElems] = elems;
    setElems(remainingElems);
  };
  const [selectedElem] = elems;

  return { push, pop, selectedElem };
}

function App() {
  const [playerNameInput, setPlayerNameInput] = useState("");
  const { pop, push, selectedElem: players } = useHistory<Player[]>([]);

  return (
    <Flex align="center" direction="column">
      <Flex direction="row" gapX="2">
        <TextField.Root
          value={playerNameInput}
          placeholder="Name..."
          onChange={(event) => setPlayerNameInput(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              push(addPlayer(players)(playerNameInput));
              setPlayerNameInput("");
            }
          }}
          style={{ width: 150 }}
          mb="4"
        />
        {players.length > 0 && <Button onClick={pop}>Cancel</Button>}
      </Flex>
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
                onClick={() => push(removePlayer(players)(name))}
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
                    push(computeNextGameState(players)(name, scoreInput, false))
                  }
                >
                  -
                </Button>
                {score[scoreInput]}
                <Button
                  ml="2"
                  color="green"
                  onClick={() =>
                    push(computeNextGameState(players)(name, scoreInput))
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
