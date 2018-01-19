/**
 * Created by oyhanyu on 2018/1/17.
 */
import { types, flow, applySnapshot } from "mobx-state-tree";
import User from './user';
import Todo from './todo';
import http from '../utils/request';

/*
* 定义model时，最好通过types.optional给属性设置一个默认值
* 如果不设置，则需要在调用TodosStore.create()的时候传入默认值
* */
const TodosStore = types
    .model({
        users: types.optional(types.array(User), []),
        list: types.optional(types.map(Todo), {})
    })
    // views中为一些计算属性computed
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
    // 导出的可供外部调用的action函数
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

export default TodosStore.create();
