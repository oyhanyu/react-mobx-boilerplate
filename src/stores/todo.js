/**
 * Created by oyhanyu on 2018/1/16.
 */
import { types, applySnapshot } from "mobx-state-tree";
import User from './user';

const Todo = types
    .model({
        name: types.optional(types.string, ""),
        done: types.optional(types.boolean, false),
        user: types.maybe(types.reference(types.late(() => User)))
    })
    .actions(self => {
        function setName(newName) {
            self.name = newName;
        }

        function toggle() {
            self.done = !self.done;
        }

        function setUser(user) {
            if (user === "") { // When selected value is empty, set as null
                self.user = null
            } else {
                self.user = user
            }
        }

        return { setName, toggle, setUser };
    });



export default Todo;

