import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import BoardList from './components/BoardList';



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
  });
  return (
    <div className="App">
      <BoardList 
      boards={boards}/>
    </div>
  );
};

export default App;
