/*
* @flow
*/
import React
     , { Component } from 'react';
import { createStore
       , applyMiddleware
       , combineReducers
       , bindActionCreators
       } from 'redux';
import { Provider
       , connect
       } from 'react-redux';
import thunk from 'redux-thunk';
import { StyleSheet
       , Text
       , View
       , TouchableOpacity
       } from 'react-native';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function increment() { return { type: INCREMENT }; }
function decrement() { return { type: DECREMENT }; }

const initialState = { count: 0 };

function counter(state = initialState, action = {}) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}

const styles = StyleSheet.create({
    mainView: {
      flex: 1
    , alignItems: 'center'
    , justifyContent: 'center'
    }
  , button: {
      width: 200
    , height: 40
    , margin: 10
    , padding: 10
    , backgroundColor: 'lightblue'
    , alignItems: 'center'
    , justifyContent: 'center'
    }
});

class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { counter, increment, decrement } = this.props;

    return (
      <View style={styles.mainView}>
        <TouchableOpacity onPress={increment} style={styles.button}>
          <Text>Increment</Text>
        </TouchableOpacity>

        <Text>{counter}</Text>

        <TouchableOpacity onPress={decrement} style={styles.button}>
          <Text>Decrement</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class CounterApp extends Component {
  constructor(props) { super(props); }

  render() {
    const { state, actions } = this.props;
    return (
      <Counter
      counter={state.count}
      {...actions} />
    );
  }
}


const CounterAppConnect = connect(
    (state) => ({ state: state.counter })
  , (dispatch) => ({
      actions: bindActionCreators(counterActions, dispatch)
    })
)(CounterApp);

const counterActions = { increment, decrement }
const reducers = { counter }
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CounterAppConnect />
      </Provider>
    );
  }
}
