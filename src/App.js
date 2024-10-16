import "./App.css";
import TodoList from "./component/TodoList";
import ThemeProvider from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <TodoList />
      </div>
    </ThemeProvider>
  );
}

export default App;
