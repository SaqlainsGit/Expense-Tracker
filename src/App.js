import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Expense from './components/Expense';
import AddExpense from './components/AddExpense';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import EditExpense from './components/EditExpense';
const App = () => {

   
  return (
    <div>
    <Router>

      <Routes>

        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/expenses' element={<Expense/>}/>
        <Route path='/add' element={<AddExpense/>}/>
        <Route path='/edit/:id' element={<EditExpense/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/admin' element={<Admin/>}/>

      </Routes>

    </Router>
    </div>
  )
}

export default App
