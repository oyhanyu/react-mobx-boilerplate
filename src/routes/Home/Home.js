/**
 * Created by oyhanyu on 2018/1/17.
 */
import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import logo from '../../assets/logo.svg';
import './Home.css';

const randomId = () => Math.floor(Math.random() * 1000).toString(36);

const TodoCounterView = observer(props =>
    <div>
        {props.todos.pendingCount} pending, {props.todos.completedCount} completed
    </div>
);

const UserPickerView = observer(props =>
    <select value={props.user ? props.user.id : ""} onChange={e => props.onChange(e.target.value)}>
        <option value="">-none-</option>
        {props.todos.users.map((user, index) => <option value={user.id} key={index}>{user.name}</option>)}
    </select>
);

class Home extends Component {

    constructor(props) {
        super(props);
        this. state = {
            todos: props.todos
        }
    }

    componentDidMount() {
        console.log('mount');
        this.state.todos.fetchUsers();
    }

    render() {
        const { todos } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to powered React-Mobx</h1>
                </header>
                <p className="App-intro">
                    This boilerplate is based react, mobx, mobx-state-tree(Opinionated, transactional, MobX powered state container)
                </p>
                <div className="todo-list">
                    <TodoCounterView  todos={todos}/>
                    <button onClick={e => todos.addTodo(randomId(), "New Task")}>
                        Add Task
                    </button>
                    {todos.list.values().map((todo, index) =>
                        <div key={index}>
                            <input
                                type="checkbox"
                                checked={todo.done}
                                onChange={e => todo.toggle()}
                            />
                            <input
                                type="text"
                                value={`${todo.name}-${todo.done}`}
                                onChange={e => todo.setName(e.target.value)}
                            />
                            <UserPickerView user={todo.user} todos={todos} onChange={userId => todo.setUser(userId)} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default inject('todos')(observer(Home));
