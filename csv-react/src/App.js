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
        console.log(this.state.value);
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


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
