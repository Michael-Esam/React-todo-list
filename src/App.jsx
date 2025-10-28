import './App.css'
import TodoList from './TodoList';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import { ToastProvider } from './cotexts/ToastCotext';
import { TodosProvider } from './cotexts/TodoContext';

let theme = createTheme({
  typography:{
    fontFamily:["alx","cairo"]
  },
  palette: {
    primary: {
      main: deepPurple[500]
    }}
});

function App() {

  return (
    <div style={{direction:"rtl",minWidth: "600px",fontFamily:"alx"}}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <TodosProvider>
              <TodoList />
          </TodosProvider>
      </ToastProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
