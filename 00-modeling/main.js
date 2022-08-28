import '../style.css';

// Create a state machine transition function either using:
// - a switch statement (or nested switch statements)
// - or an object (transition lookup table)

//state - value of the finite state of the machine - {value: 'loading'}
const initialState = {value: 'loading'}
function transition(state = initialState, event){
    switch (state.value) {
        case 'loading':
            if(event.type==='LOADED') {
                return {
                    ...state,
                    value: 'playing'
                }
            }
            break;
        case 'playing':
            if(event.type==='PAUSE') {
                return {
                    ...state,
                    value: 'paused'
                }
            }
            break;
        case 'paused':
            if(event.type==='PLAY') {
                return {
                    ...state,
                    value: 'playing'
                }
            }
            break;
        default:
            break;
    }
    return state;
}

window.transition = transition;


const playerMachineObject = {
    initial: 'loading',
    states: {
        loading: {
            on: {
                LOADED: 'playing'
            }
        },
        playing: {
            on: {
                PAUSE: 'paused'
            }
        },
        paused: {
            on: {
                PLAY: 'paused'
            }
        },
    }
}

function machineTransition(state = {value: playerMachineObject.initial}, event) {
    const nextStateValue = playerMachineObject.states[state.value].on?.[event.type];
    if(!nextStateValue) {
        return state;
    }
    return {
        ...state,
        value: nextStateValue
    };
}

window.machineTransition = machineTransition

// persist state
let currentState = {value: playerMachineObject.initial}

const service = {
    send:(event) => {
        currentState = machineTransition(currentState, event)
        console.log(currentState)
    }
}
window.service = service
// Also, come up with a simple way to "interpret" it, and
// make it an object that you can `.send(...)` events to.
