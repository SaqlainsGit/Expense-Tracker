import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const role = localStorage.getItem('role')
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('role')
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">Welcome to Dashboard</h2>

      {role === 'USER' && (
        <div className="mb-3">
          <button className="btn btn-primary mx-2" onClick={() => navigate('/expenses')}>
            View My Expenses
          </button>
          <button className="btn btn-success mx-2" onClick={() => navigate('/add')}>
            Add Expense
          </button>
        </div>
      )}

      {role === 'ADMIN' && (
        <div className="mb-3">
          <button className="btn btn-warning" onClick={() => navigate('/admin')}>
            View All Expenses
          </button>
        </div>
      )}

      <button className="btn btn-danger mt-3" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard
