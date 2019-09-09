import React, { useState } from 'react';
import produce from 'immer'
import Boardcontext from './context'
import { loadLists } from '../../Services/api'
import List from '../List'
import { Container } from './styles';

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);
  function move(fromList, from, to){
    setLists(produce(lists,draft => {
      const dragged = draft[fromList].cards[from]; 
      draft[fromList].cards.splice(from, 1);
      draft[fromList].cards.splice(to, 0, dragged);
    }))
  }
  return (
    <Boardcontext.Provider value={{lists, move}}>
      <Container>
        {lists.map((list, index) => <List key={list.title} index={index} data={list}/>)}
      </Container>
    </Boardcontext.Provider>
  );
}
