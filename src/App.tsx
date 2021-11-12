// import logo from './logo.svg'
import './App.css'
import ExpenseContainer from './ui/ExpenseContainer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './crypto_spin_2.gif'

function App() {
 
  return (
    <div className="App">
        
      <header className="App-header">
        
        <img src={logo} className="App-logo" alt="logo" />
        <p>Expense Tracker</p>
        <br/>
        <ExpenseContainer/>
        <ToastContainer />
      </header>
    </div>
  )
}

export default App
