import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      inputText: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      inputText: event.target.value,
    });
  }

  handleInputSubmit() {
    const { handleSend } = this.props;
    handleSend(this.state.inputText);
    this.setState({
      inputText: '',
    });
  }

  render() {
    return (
      <footer className="ChatInput">
        <input type="text" onChange={this.handleInputChange} value={this.state.inputText} />
        <button type="button" onClick={this.handleInputSubmit}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
