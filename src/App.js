import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ToDos from './components/ToDos';
import AddToDo from './components/AddToDo';
import About from './components/pages/About';
import Header from './components/layout/Header';
import axios from 'axios';

import './App.css';

class App extends Component{
  state = {
    toDos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({ toDos: res.data}))
  }

  //Toggle Complete
  markComplete = (id) => {
    this.setState({ toDos: this.state.toDos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    })})}

    //Delete ToDo
    delToDo = (id) => {
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ toDos: [...this.state.toDos.filter(todo => todo.id !== id)] }))}

    //Add ToDo
    addToDo = (title) => {
      axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false
      }).then(res => this.setState({ toDos: [...this.state.toDos, res.data]}))}

  render() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Header/>
          <Route exact path="/" render={props => (
            <React.Fragment>
              <AddToDo addToDo={this.addToDo}/>
              <ToDos 
                toDos={this.state.toDos} 
                markComplete={this.markComplete} 
                delToDo={this.delToDo}
                />
            </React.Fragment>
          )} />
          <Route path="/about" component={About}/>
        </div>
      </div>
    </Router>
  );
  }
}

export default App;
