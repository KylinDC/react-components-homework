import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
    this.handleChatSend = this.handleChatSend.bind(this);
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  // eslint-disable-next-line class-methods-use-this
  getResponseFromRobot(message) {
    const response = [];
    answersData.forEach((answer) =>
      answer.tags.forEach((tag) => {
        if (message.indexOf(tag) !== -1) {
          response.push(answer);
        }
      })
    );
    return response;
  }

  handleChatSend(message) {
    const { messages } = this.state;
    if (message) {
      messages.push({ role: ROLE.CUSTOMER, text: message });

      const response = this.getResponseFromRobot(message);

      this.setState({
        messages: messages.concat(response),
      });
    }
  }

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput handleSend={this.handleChatSend} />
      </main>
    );
  }
}

export default Chat;
