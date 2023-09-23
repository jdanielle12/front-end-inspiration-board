import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import BoardList from './components/BoardList';
import NewBoard from './components/NewBoard';
import CardList from './components/CardList';


const url = process.env.REACT_APP_BACKEND_URL;


function App() {
  const [boards, setBoards] = useState([]);
  const [addBoardButton, setBoardButton] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedBoardId, setBoardId] = useState(0);
  const [displayNav, setDisplayNav] = useState(true);

  let navHomePageButtonsClass = displayNav? "display-nav-buttons": "hide-display-nav-buttons";

  const addBoardBool = () => {
    setBoardButton(!addBoardButton);
  };

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

const getAllBoards = () => {
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
};

const getOneBoard = (boardId) => {
  axios
  .get(`${url}/boards/${boardId}`)
  .then((response) => {
    const oneBoard = [response.data.board];
    setBoards(oneBoard);
  })
  .catch((error) => {
    console.log(error);
  })
};

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
    setBoardButton(false);
  })
  .catch((error) => {
    console.log(error);
  })
};

const deleteBoard = (boardId) => {
  axios
  .delete(`${url}/boards/${boardId}`)
  .then(() => {
    if (boards.length > 1) {
      let newBoardArray = boards.filter((board) => board.id !== boardId);
      setBoards(newBoardArray);
    } else {
      getAllBoards();
    }
  })
  .catch((error) => {
    console.log(error);
  })
};

const editBoard = (boardId, updatedData) => {
  axios
  .put(`${url}/boards/${boardId}`, updatedData)
  .then((response) => {
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

const sortBoards = (sort) => {
  axios
  .get(`${url}/boards?sort=${sort}`)
  .then((response) => {
    let newBoardArray = response.data;
    setBoards(newBoardArray);
  })
  .catch((error) => {
    console.log(error);
  })
};

const getAllCards = (boardId) => {
  axios
  .get(`${url}/boards/${boardId}/cards`)
  .then((response) => {
    let cardArray = response.data.map((card) => ({
      card_id: card.card_id,
      title: card.title,
      description: card.description,
      like_count: card.like_count,
      board_id: card.board_id
    }));
    setCards(cardArray);
    setDisplayNav(false);
    getOneBoard(boardId);
    setBoardId(boardId);
  })
  .catch((error) => {
    console.log(error);
  })
};

const disappearCards = (boardId) => {
  setCards([]);
  setBoardId(boardId);
  getAllBoards();
  setDisplayNav(true);
};

const addNewCard = (formData) => {
  axios
  .post(`${url}/boards/${selectedBoardId}`, formData)
  .then((response) => {
    let newCard = {
      card_id: response.data.card.card_id,
      title: response.data.card.title,
      description: response.data.card.description,
      like_count: response.data.card.like_count,
      board_id: response.data.card.board_id
    }
    setCards([...cards, newCard]);
  })
  .catch((error) => {
    console.log(error);
  })
};

const deleteCard = (cardId) => {
  axios
  .delete(`${url}/cards/${cardId}`)
  .then(() => {
      let newCardArray = cards.filter((card) => card.card_id !== cardId);
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
    setCards((prevCards) => {
      return prevCards.map((card) => {
        if (card.card_id === cardId){
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

const likeCard = (cardId, endpoint) => {
  axios
  .patch(`${url}/cards/${cardId}/${endpoint}`)
  .then((response) => {
    setCards((prevCards) => {
      return prevCards.map((card) => {
        if (card.card_id === cardId){
          return {
            ...card, like_count: response.data.card.like_count
          }
        }
      return card
      })
    })
  })
  .catch((error) => {
    console.log(error);
  })
};

const sortCards = (sort) => {
  axios
  .get(`${url}/cards?sort=${sort}`)
  .then((response) => {
    const newCardArray = response.data.filter((card) => card.board_id === selectedBoardId);
    setCards(newCardArray);
  })
  .catch((error) => {
    console.log(error);
  })
};

  return (
    <div className="App">
      <header>
        <h1 className='mood-board'>Mood Board</h1>
        <nav className={`${navHomePageButtonsClass}`}>
          <button className={`add-new-board-button-${navHomePageButtonsClass}`} onClick={addBoardBool}></button>
          <select className={`board-sort-button-${navHomePageButtonsClass}`} name="boards" id="board-select" onChange={(event) => {sortBoards(event.target.value)}}>
                        <option className='sort-option-button' value={"asc"}>Title A-Z</option>
                        <option className='sort-option-button' value={"desc"}>Title Z-A</option>
          </select>
        </nav>
      </header>
      <main>
        {addBoardButton && <NewBoard 
        addNewBoard={addNewBoard}/>}
        <BoardList 
        boards={boards}
        deleteBoard={deleteBoard}
        editBoard={editBoard}
        getAllCards={getAllCards}
        addNewCard={addNewCard}
        sortCards={sortCards}
        disappearCards={disappearCards}/>
        <CardList 
        cards={cards}
        deleteCard={deleteCard}
        editCard={editCard}
        likeCard={likeCard}/>
      </main>
      <footer>
        <span className='copy-right'>&copy; Jamie McGraner 2023</span>
      </footer>
    </div>
  );
};

export default App;
