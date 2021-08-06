import React, { useState, useContext, useReducer, useMemo, useEffect, useLayoutEffect } from 'react';
import { Button, Input } from '@alifd/next';
import './index.module.scss';

import {FlowCanvasEngine, FlowFieldForm} from './lib'

const TestContext = React.createContext({});

const Navbar = () => {
  const { username } = useContext(TestContext)

  return (
    <div className="navbar">
      <p>{username}</p>
    </div>
  )
}

const Messages = () => {
  const { username } = useContext(TestContext)

  return (
    <div className="messages">
      <p>1 message for {username}</p>
    </div>
  )
}

const Test = () => {
  const [num, setNum] = useState(0);

  const [items, dispatch] = useReducer((state,action) => {
    switch(action.type){
        case 'add': return [...state, {id: new Date().getTime(), name: action.name}]
        case 'clear': return []
        case 'remove': return state.filter(item => action.id !== item.id)
      }
  }, [])

  const ex = useMemo(() => {
    return num + 'a'
  }, [num])

  console.log('ex', ex)

  useEffect(() => {
    console.log('useEffect')
  })

  useLayoutEffect(() => {
    console.log('useLayoutEffect')
  })
  
  return (
    <div>
      <FlowCanvasEngine />
      <FlowFieldForm />
      <Input value={num} />
      <Button onClick={() => setNum(num+1)}>按钮</Button>
      <hr/>
      <TestContext.Provider 
        value={{
          username: num,
        }}
      >
        <div className="test">
          <Navbar />
          <Messages />
        </div>
      </TestContext.Provider>
      <hr/>
      <Button onClick={() => 
        dispatch({
          type:'add',
          name: 'Lucas' + new Date().getTime()
        })
      }>add</Button>
      <Button onClick={() => 
        dispatch({
          type:'clear'
        })
      }>clear</Button>
      <ul>
        {
          items.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span>
              <Button size="small" onClick={() => 
                dispatch({
                  type:'remove',
                  id: item.id
                })
              }>remove</Button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Test;
