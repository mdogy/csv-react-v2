import React from 'react';

function DataTable (props){
    const data = props.data;
    let output = <div><strong>No Data</strong></div>;
    if (props.data && props.data.length>1) {
      const columns = Object.keys(data[0]);
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
  
  export default DataTable;