import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addExpense } from '../api'

const AddExpense = () => {
  const [amount, setAmount] = useState('')
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const navigate = useNavigate()

  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      await addExpense({ amount, title, date })
      alert('Expense Added')
      navigate('/expenses')
    } catch (err) {
      console.log('Error adding expense', err)
    }
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h3 className="text-center mb-4">Add Expense</h3>
        <form onSubmit={handleAdd}>

            <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            
          </div>
          <div className="mb-3">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Add Expense</button>
        </form>
      </div>
    </div>
  )
}

export default AddExpense
