import "./App.css";
import TodoList from "./component/TodoList";
import ThemeProvider from './ThemeProvider';

function App() {
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App">
        <TodoList />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
