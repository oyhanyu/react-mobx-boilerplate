/**
 * Created by oyhanyu on 2018/1/17.
 */
import { types, applySnapshot } from "mobx-state-tree";
import User from './user';
import Todo from './todo';


const TodosStore = types
    .model({
        users: types.map(User),
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
    .actions(self => {
        function addTodo(id, name) {
            self.list.set(id, Todo.create({ name }));
        }

        return { addTodo };
    });

const store = TodosStore.create({
    users: {
        "1": {
            id: "1",
            name: "mweststrate"
        },
        "2": {
            id: "2",
            name: "mattiamanzati"
        },
        "3": {
            id: "3",
            name: "johndoe"
        }
    },
    list: {
        "1": {
            name: "Eat a cake",
            done: true
        }
    }
});


export default store;
