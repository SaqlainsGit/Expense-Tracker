import React, { useEffect, useState } from 'react'
import { deleteExpense, getMyExpense } from '../api'
import { useNavigate } from 'react-router-dom'

const Expense = () => {
  const [expenses, setExpenses] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      const res = await getMyExpense()
      setExpenses(res.data)
    } catch (err) {
      alert('Error fetching expenses')
    }
  }

  const handleDelete = async (id) => {
    await deleteExpense(id)
    fetchExpenses()
  }

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0)


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Expenses</h2>
    {expenses.length > 0 && (
  <h3 className="text-center mb-3">Username: {expenses[0].username}</h3>
)}

    
      <h4>Total Expense : ₹ {totalAmount}</h4>

      {expenses.length === 0 ? (
        <div className="alert alert-info text-center">
          No expenses found.
        </div>
      ) : (
        <table className="table table-bordered table-hover shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, index) => (
              <tr key={exp.id}>
                <td>{index + 1}</td>
                <td>{exp.title}</td>
                <td>₹ {exp.amount}</td>
                <td>{new Date(exp.date).toLocaleDateString()}</td>
                <td><button className='btn btn-danger' onClick={() => handleDelete(exp.id)}>Delete</button></td>
              </tr>
            ))}
            
          </tbody>
        </table>
      )}
      <button className='btn btn-primary form-control' onClick={() => navigate('/add')}>Add Expense</button>
    </div>
  )
}

export default Expense
