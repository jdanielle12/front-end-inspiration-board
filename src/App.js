import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import BoardList from './components/BoardList';
import NewBoard from './components/NewBoard';
import CardList from './components/CardList';
import NewCard from './components/NewCard';


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

const [cards, setCards] = useState([])

useEffect(() => {
  axios
  .get(`${url}/cards`)
  .then((response) => {
    let cardArray = response.data.map((card) => ({
      id: card.id,
      title: card.title,
      description: card.description
    }));
    setBoards(cardArray);
  })
  .catch((error) => {
    console.log(error);
  })
}, []);

const addNewCard = (formData) => {
  axios
  .post(`${url}/cards`, formData)
  .then((response) => {
    let newCard = {
      id: response.data.card.id,
      title: formData.title,
      description: formData.description
    }
    setBoards([...cards, newCard]);
  })
  .catch((error) => {
    console.log(error);
  })
};

const deleteCard = (cardId) => {
  axios
  .delete(`${url}/cards/${cardId}`)
  .then(() => {
      let newCardArray = cards.filter((card) => card.id !== cardId);
      setCards(newCardArray);
  })
  .catch((error) => {
    console.log(error);
  })
};

const editCard = (cardId, updatedData) => {
  axios
  .put(`${url}/cards/${cardId}`, updatedData)
  .then((response) => {
    console.log(response);
    setCards((prevCards) => {
      return prevCards.map((card) => {
        if (card.id === cardId){
          return {
            ...card, title: updatedData.title, description: updatedData.description
          }
        }
        return card
      }
    )})
  })
  .catch((error) => {
    console.log(error);
  })
};

  return (
    <div className="App">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light+Two&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@300&display=swap" rel="stylesheet"/>
      </head>
      <header>
        <h1 className='mood-board'>Mood Board</h1>
        <nav>
          
        </nav>
      </header>
      <main>
        <BoardList 
        boards={boards}
        deleteBoard={deleteBoard}
        editBoard={editBoard}/>
        <NewBoard 
        addNewBoard={addNewBoard}/>
        <CardList 
        cards={cards}
        deleteCard={deleteCard}
        editCard={editCard}/>
        <NewCard 
        addNewCard={addNewCard}/>
      </main>
    </div>
  );
};

export default App;
