import logo from './logo.svg';
import './App.css';
import Greet from './components/Greet'
import Welcome from './components/Welcome'
import Hello from './components/Hello'
import Message from './components/Message';
import Counter from './components/Counter';
import FunctionClick from './components/FunctionClick'
import ClassClick from './components/ClassClick';
import EventBind from './components/EventBind';

function App() {
  return (
    <div className="App">
      {/* <Counter />
      <Welcome name="John" heroName="One">
      </Welcome>
      <Greet name="second" heroName="NONONO">
        <button>This is a button</button>
      </Greet>
      <Greet name="third" heroName="Duh"></Greet> 
       <Welcome></Welcome>
      <Hello /> 
      <Message></Message>
      <FunctionClick />
      <ClassClick />  */}
      <EventBind />
      <Message />
    </div>
  );
}

export default App;
