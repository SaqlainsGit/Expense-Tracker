import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getExpenseById, editExpense } from '../api'

const EditExpense = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getExpenseById(id)
        setTitle(res.data.title)
        setAmount(res.data.amount)
        setDate(res.data.date.slice(0, 10)) 
      } catch (err) {
        console.log('Error fetching expense:', err)
      }
    }

    fetchData()
  }, [id])

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      await editExpense(id, { title, amount, date })
      navigate('/admin')  
    } catch (err) {
      console.log('Error editing expense:', err)
    }
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h3 className="text-center mb-4">Edit Expense</h3>
        <form onSubmit={handleEdit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
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

          <button type="submit" className="btn btn-primary w-100">Update Expense</button>
        </form>
      </div>
    </div>
  )
}

export default EditExpense
