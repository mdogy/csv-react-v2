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
    // This is where we get the data
    fetch(process.env.PUBLIC_URL + '/CUNY_Alum.csv').then(
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

function DataTable (props){
  let data = props.data;
  let output = <div><strong>No Data</strong></div>;
  if (props.data && props.data.length>1) {
    let columns = Object.keys(data[0]);
    console.log(columns);
    let head = columns.map(col => <th key={"head"+col}>{col}</th>);
    let body = data.map( (row,ind) => (
      <tr key={"row"+ind}>{columns.map( col =>(
          <td key={col+ind}>{row[col]}</td>
          ))}</tr>
        )
      );
    output = (
      <table>
      <thead>
      <tr key="headrow">{head}</tr>
      </thead>
      <tbody>
      {body}
      </tbody>
      </table>)
  }
  return (
    <div>
      {output}
    </div>
  )
}

function csv2data(csv_text){
  let data = csv_text.match(/[^\r\n]+/g);
  let column_names = data[0].split(',');
  column_names[0]='id';
  data = data.slice(1);
  let filtered_data = data.filter(
    datarow=> (datarow.length>1)
    );
  let rows = filtered_data.map( datarow => {
      let row ={};
      column_names.forEach( 
          (key, i) => {
            let item = datarow.split(',')[i];
            item=item.replace('"','');
            row[key]=item;
          }
        )

      return row;
    });
  return rows;
}

export default App;
