import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }


  componentDidMount (){
    fetch(process.env.PUBLIC_URL + '/CUNY_Alum.csv').then(
      response =>  response.text()
    ).then(
      text => {
        this.setState({value: text});
        console.log(csv2data(text));
      }
    )
  }
  

  render() {
    return  (
      <div className="App">
        <header className="App-header">
          <h1>Loading a data file</h1>
          <pre>
            {this.state.value}
          </pre>
        </header>
      </div>
    );
  };

}

function csv2data(csv_text){
  let data = csv_text.match(/[^\r\n]+/g);
  let column_names = data[0].split(',');
  column_names[0]='id';
  data = data.slice(1);
  let filtered_data = data.filter(datarow=> datarow.length>1);
  let rows = filtered_data.map( datarow => {
      let row ={};
      column_names.forEach( (key, i) => row[key]=datarow.split(',')[i] )
      return row;
    });
  return rows;
}

export default App;
