import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import BoardList from './components/BoardList';
import NewBoard from './components/NewBoard';


const url = "http://localhost:5000";


function App() {
  const [boards, setBoards] = useState([])

  useEffect(() => {
    axios
    .get(`${url}/boards`)
    .then((response) => {
      let boardArray = response.data.map((board) => ({
        id: board.id,
        title: board.title,
        description: board.description
      }));
      setBoards(boardArray);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

const addNewBoard = (formData) => {
  axios
  .post(`${url}/boards`, formData)
  .then((response) => {
    let newBoard = {
      id: response.data.board.id,
      title: formData.title,
      description: formData.description
    }
    setBoards([...boards, newBoard]);
  })
  .catch((error) => {
    console.log(error);
  })
};

const deleteBoard = (boardId) => {
  axios
  .delete(`${url}/boards/${boardId}`)
  .then(() => {
      let newBoardArray = boards.filter((board) => board.id !== boardId);
      setBoards(newBoardArray);
  })
  .catch((error) => {
    console.log(error);
  })
};

const editBoard = (boardId, updatedData) => {
  axios
  .put(`${url}/boards/${boardId}`, updatedData)
  .then((response) => {
    console.log(response);
    setBoards((prevBoards) => {
      return prevBoards.map((board) => {
        if (board.id === boardId){
          return {
            ...board, title: updatedData.title, description: updatedData.description
          }
        }
        return board
      }
    )})
  })
  .catch((error) => {
    console.log(error);
  })
};

  return (
    <div className="App">
      <BoardList 
      boards={boards}
      deleteBoard={deleteBoard}
      editBoard={editBoard}/>
      <NewBoard 
      addNewBoard={addNewBoard}/>
    </div>
  );
};

export default App;
