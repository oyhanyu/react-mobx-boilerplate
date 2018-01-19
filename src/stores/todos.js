/**
 * Created by oyhanyu on 2018/1/17.
 */
import { types, flow, applySnapshot } from "mobx-state-tree";
import User from './user';
import Todo from './todo';
import http from '../utils/request';

const TodosStore = types
    .model({
        users: types.array(User),
        list: types.optional(types.map(Todo), {})
    })
    .views(self => ({
        get pendingCount() {
            return self.list.values().filter(todo => !todo.done).length
        },
        get completedCount() {
            return self.getTodosWhereDoneIs(true).length
        },
        getTodosWhereDoneIs(done) {
            return self.list.values().filter(todo => todo.done === done)
        }
    }))
    .actions(self => ({
        addTodo(id, name) {
            self.list.set(id, Todo.create({ name }));
        },

        fetchUsers: flow(function* fetchUsers() { // <- note the star, this a generator function!
            try {
                const users = yield http('/mock/2877/getUser');
                self.users = users.result;
            } catch (e) {
                // ... including try/catch error handling
                console.error("Failed to fetch users", e)
            }
        }),
    }));

export default TodosStore;
