import React, {Component} from 'react';
import './App.css';
import DataTable from './DataTable';
import csv2data from '../utils/csv2data';

const DATAURL="https://gist.githubusercontent.com/mdogy/e4e4fa38e11c3315a9ecf93149c793ee/raw/672640aa4c0292b985c00f10dc39348ff404545f/CUNY_Alum.csv"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }


  componentDidMount (){
    // This is where we get the data
    fetch(DATAURL).then(
      response =>  response.text()
    ).then(
      text => {
        this.setState({value: csv2data(text)});
      }
    )
  }
  

  render() {
    // This renders the whole page
    return  (
      <div className="App">
        <header className="App-header">
          <h1>React Loading Data Example</h1>
          <h2>Famous CUNY Alums</h2>
        </header>
          <DataTable data={this.state.value}></DataTable>
      </div>
    );
  };

}


export default App;
