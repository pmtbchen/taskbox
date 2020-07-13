// this is the container that we are going to use to build a simple data model for our app

// a simple redux store/actions/reducer implementation
// a true app would be more complex and separated into different files
import { createStore } from 'redux';

// the actions are the "names" of the changes that can happen to the store
export const actions = {
    ARCHIVE_TASK: 'ARCHIVE_TASK',
    PIN_TASK: 'PIN_TASK',
};

// the action creator bundle actions with the data required to execute them
export const archiveTask = id => ({ type: actions.ARCHIVE_TASK, id });
export const pinTask = id => ({ type: actions.PIN_TASK, id });

// all our reducer simply change the state of a single task
function taskStateReducer(taskState) {
    return (state, action) => {
        return {
            ...state,
            tasks: state.tasks.map(task =>
                task.id === action.id ? { ...task, state: taskState } : task 
            ),
        };
    };
};

// the reducer describes how the contents of the store change for each action
export const reducer = (state, action) => {
    switch (action.type) {
        case action.ARCHIVE_TASK:
            return taskStateReducer('TASK_ARCHIVE')(state, action);
        case action.PIN_TASK:
            return taskStateReducer('TASK_PINNED')(state, action);
        default:
            return state;
    };
};

// the initial state of our store when the app loads
// usually we would fetch this from a server
const defaultTasks = [
    { id: '1', title: 'Something', state: 'TASK_INBOX' },
    { id: '2', title: 'Something more', state: 'TASK_INBOX' },
    { id: '3', title: 'Something else', state: 'TASK_INBOX' },
    { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];

// we export the constructed redux store
export default createStore(reducer, { tasks: defaultTasks });




