import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as todoActions from './actions/todos';

import Todos from './components/Todos';

class App extends Component {
  state = {
    todoText: '',
    showDones: false,
  }

  addTodo = async () => {
    if (this.state.todoText === '') return false;

    const input = document.querySelector('#todo-input');

    await this.props.addTodo(this.state.todoText);

    this.setState({ todoText: '' })

    input.value = '';
  }

  handlerAddTodo = (e) => {
    if (e.keyCode !== 13) return false;

    e.preventDefault();

    this.addTodo();
  }

  doneTodos = () => {
    const { todos } = this.props;

    return todos.filter(todo => todo.done === true).length;
  }

  undoneTodos = () => {
    const { todos } = this.props;

    return todos.filter(todo => todo.done === false).length;
  }

  render() {
    const { showDones } = this.state;
    return (
      <div className="bg-black flex flex-col w-full h-screen">
        <div className="shadow-lg mb-5 bg-blue text-white font-bold flex justify-between items-center p-3">
          <div>
            <img className="mr-2"
              src={require('./images/list.svg')}
              height={30} width={30}
              alt="list.svg" />
            {showDones
              ? <h1 className="uppercase inline">Concluidas</h1>
              : <h1 className="uppercase inline">To-do List</h1>
            }
          </div>
          <div className="bg-blue-darker rounded-full px-2 py-1">
            <span>
              {!showDones
                ? this.undoneTodos()
                : this.doneTodos()
              }
            </span>
          </div>
        </div>
        <Todos showDones={this.state.showDones} />
        <button className="px-2 py-1 bg-orange mx-auto rounded border-b-4 border-orange-dark text-white focus:outline-none font-bold hover:bg-orange-light"
          onClick={() => this.setState({ showDones: !showDones })}>
          {showDones
            ? <span>VER TO-DO LIST<div className="ml-1 text-center inline bg-orange-dark rounded-full px-1">{this.undoneTodos()}</div></span>
            : <span>VER CONCLUIDAS<div className="ml-1 text-center inline bg-orange-dark rounded-full px-1">{this.doneTodos()}</div></span>
          }

        </button>
        <div className="mx-auto flex w-full justify-around items-center mb-3 fixed pin-b">
          <input className="px-2 py-1 border-2 focus:outline-none focus:border-green-dark w-3/5"
            id="todo-input"
            autoComplete="off"
            placeholder="Digite sua nova to-do..."
            onKeyDown={(e) => this.handlerAddTodo(e)}
            onChange={(e) => this.setState({ todoText: e.target.value })} />
          <button className="bg-green px-2 py-1 rounded text-white border-b-4 border-green-dark focus:outline-none hover:bg-green-light font-bold"
            onClick={this.addTodo}>ADD TO-DO</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(todoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
