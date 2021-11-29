import React, { useState, createContext } from 'react';
import "@fontsource/stardos-stencil"

import Title from './components/Title'
import Graph from './components/Graph'
import Modal from './components/Modal'

import './styles/App.css'

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');
  const modalControls = { open, setOpen: (bool) => setOpen(bool), keyword, setKeyword: (word) => setKeyword(word) }


  console.log('open', open, keyword)
  return (
    <div className="app-container">
      <Title />
      {/* <Title /> */}
      <Graph {...modalControls} />
      <Modal {...modalControls} />
    </div>
  );
}
