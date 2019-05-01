import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Keyboard from './Keyboard';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preText: "",
      postText: "",
      caretPosition: 0,
    };
  }

  handleCaretMove = () => {
    let sel = window.getSelection();
    if (!sel.isCollapsed) {
      return;
    }

    let node = sel.anchorNode;
    let offset = sel.anchorOffset;
    while (node.previousSibling) {
      node = node.previousSibling;
      if (node.nodeType === 3) {
        offset += node.nodeValue.length;
      }
    }

    let text = this.state.preText + this.state.postText;
    this.setState({
      preText: text.slice(0, offset),
      postText: text.slice(offset),
    })
  }

  bufferChange = buffer => {
    this.setState({
      preText: buffer
    })
  }

  render() {
    return (
      <div className="App">
        <div>{window.entryImageUrl}</div>
        <div className="text" onClick={this.handleCaretMove}>
          {this.state.preText}
          <span id="caret"></span>
          {this.state.postText}
        </div>
        {[...Array(50).keys()].map((_, i) => (
          <div>blep{i}</div>
        ))}
        <Keyboard
          script="bali"
          onBufferChange={this.bufferChange}
          buffer={this.state.preText}
        />
      </div>
    );
  }
}
