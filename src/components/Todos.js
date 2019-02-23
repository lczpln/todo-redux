import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../actions/todos';

class Todos extends Component {

  emptyList = (props) => {
    const { todos, showDones } = this.props;

    const todoTxt = "Você não tem nenhuma to-do!";
    const donesTxt = "Suas to-do concluidas aparecerão aqui!";

    let text = '';

    if (todos <= 0) {
      if (!showDones) {
        text = todoTxt
      } else {
        text = donesTxt
      }
    } else if (todos.filter(todo => todo.done).length <= 0 && showDones) {
      text = donesTxt;
    } else if (todos.filter(todo => !todo.done).length <= 0 && !showDones) {
      text = todoTxt;
    }

    if (text) {
      return (
        <li className="rounded-tl-none shadow-lg bg-white text-grey flex justify-between items-center mb-2 px-2 py-1 rounded">
          <span>{text}</span>
        </li>
      );
    }
  }

  render() {
    const { todos, showDones } = this.props;
    return (
      <ul className="rounded-sm shadow-lg bg-grey h-48 w-4/5 mx-auto mt-5 mb-5 p-2 list-reset overflow-x-hidden overflow-y-scroll">
        {todos.map(todo => todo.done === showDones ? (
          <li className="rounded-tl-none shadow-lg bg-white flex justify-between items-center mb-2 px-2 py-1 rounded"
            key={todo.id}>
            <p className="">{todo.text}</p>
            <div>
              <button className="mr-2 focus:outline-none"
                onClick={() => this.props.toggleChecked(todo.id)}>
                {showDones 
                ? <img src={require("../images/back.svg")} height={20} width={20} alt="back.svg" />
                : <img src={require("../images/checked.svg")} height={20} width={20} alt="cancel.svg" />
                }
              </button>
              <button className="focus:outline-none"
                onClick={() => this.props.removeTodo(todo.id)}>
                <img src={require("../images/cancel.svg")} height={20} width={20} alt="cancel.svg" />
              </button>
            </div>
          </li>
        ) : null
        )
        }
        {this.emptyList()}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(todoActions, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Todos)
