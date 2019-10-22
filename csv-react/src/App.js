import React, {Component} from 'react';
import './App.css';

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

function DataTable (props){
  const data = props.data;
  let output = <div><strong>No Data</strong></div>;
  if (props.data && props.data.length>1) {
    const columns = Object.keys(data[0]);
    console.log(columns);
    output = (
      <table>
      <thead>
      <DataTableHeadRow columns={columns}></DataTableHeadRow>
      </thead>
      <tbody>
        {data.map( (row,ind) => (
          <DataTableRow key={"row"+ind} row={row} ind={ind} columns={columns}>
          </DataTableRow>))}
      </tbody>
      </table>)
  }
  return (
    <div>
      {output}
    </div>
  )
}

function DataTableHeadRow(props){
  const columns = props.columns;
  return (<tr key="headrow">{
    columns.map(col => <DataTableHeadItem key={"head"+col} col={props.col}>
    </DataTableHeadItem>)
  }</tr>)
}

function DataTableHeadItem(props){
  return <th>{props.col}</th>;
}

function DataTableRow (props){
  return (<tr>{props.columns.map( col =>(
    <DataTableItem key={col+props.ind} col={col} row={props.row} ind={props.ind}>
    </DataTableItem>
          ))}</tr>);
}

function DataTableItem(props){
  return <td>{props.row[props.col]}</td>;
}

function csv2data(csv_text){
  let data = csv_text.match(/[^\r\n]+/g);
  let column_names = data[0].split(',');
  column_names[0]='id';
  data = data.slice(1);
  const filtered_data = data.filter(
    datarow=> (datarow.length>1)
    );
   const rows = filtered_data.map( datarow => {
      let row ={};
      column_names.forEach( 
          (key, i) => {
            let item = datarow.split(',')[i];
            // Get rid of extra " mark
            item=item.replace(/"/g,'');
            row[key]=item;
          }
        )

      return row;
    });
  return rows;
}

export default App;
