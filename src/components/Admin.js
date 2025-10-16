import React, { useEffect, useState } from 'react'
import { deleteExpense,  getAllExpense } from '../api'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
    const [expenses, setExpenses] = useState([])
    const navigate = useNavigate()
    const role = localStorage.getItem('role')

    useEffect(() => {
        if(role !=='ADMIN') {
            navigate('/')
        } else {
        fetchAllExpense()
        }
    },[role,navigate])

    const fetchAllExpense = async () => {
        try {
            const res = await getAllExpense()
            setExpenses(res.data)
        } catch (err) {
            console.log('Error fetching expense', err)
        }
    }

    const handleDelete = async (id) => {
       await deleteExpense(id)
        fetchAllExpense();
    }

    const handleEdit = (id) => {
        navigate(`/edit/${id}`)
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">All Expenses</h2>
            {expenses.length === 0 ? (
                <div className="alert alert-info text-center">No expenses found.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>User</th>
                                <th>Amount (₹)</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((exp) => (
                                <tr key={exp.id}>
                                    <td>{exp.id}</td>
                                    <td>{exp.username}</td>
                                    <td>{exp.amount}</td>
                                    <td>{exp.title}</td>
                                    <td>{new Date(exp.date).toLocaleDateString()}</td>
                                    <td className='text-center'>
                                    <button onClick={()=>handleDelete(exp.id)} className='btn btn-danger '>Delete</button>
                                    <button onClick={() => handleEdit(exp.id,exp)} className='btn btn-warning mx-3 px-4'>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Admin
