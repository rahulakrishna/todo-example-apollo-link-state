import React from 'react';
import compose from 'recompose/compose';
import withState from 'recompose/withState';

import { Client, withTodo } from './Client';

const TodoListPure = ({ currentTodos, addTodoMutation, clearTodoMutation, todoText, setTodoText }) => (
    <div>
        <h1>Todos</h1>
        {currentTodos.map((todo, index) => <div key={index}>{todo}</div>)}
        <input
            value = {todoText}
            onChange = {(e) => setTodoText(e.target.value)}
            type = 'text'
            placeholder = 'Add a todo'
        />
        <input
            type = 'submit'
            value = 'Add'
            onClick = {(e) => {
                addTodoMutation({variables: {item: todoText}});
                setTodoText("");
            }}
        />
        <input
            type = 'submit'
            value = 'Clear All'
            onClick = {(e) => {
                clearTodoMutation();
            }}
        />
    </div>
);

const TodoList = compose(
    withTodo,
    withState('todoText', 'setTodoText', ''),
)(TodoListPure);

export default TodoList;
