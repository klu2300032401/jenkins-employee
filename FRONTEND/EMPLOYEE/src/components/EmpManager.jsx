import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const EmpManager = () => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    gender: '',
    department: '',
    designation: '',
    email: '',
    password: '',
    contact: '',
    salary: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedEmployee, setFetchedEmployee] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/employeeapi`;

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  // ✅ Safe Fetch All Employees
  const fetchAllEmployees = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      console.log("API response:", res.data);

      if (Array.isArray(res.data)) {
        setEmployees(res.data);
      } else if (res.data) {
        setEmployees([res.data]);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("Failed to fetch employees.");
      setEmployees([]);
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in employee) {
      if (!employee[key] || employee[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addEmployee = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, employee);
      setMessage('Employee added successfully.');
      fetchAllEmployees();
      resetForm();
    } catch (error) {
      setMessage('Error adding employee.');
    }
  };

  const updateEmployee = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, employee);
      setMessage('Employee updated successfully.');
      fetchAllEmployees();
      resetForm();
    } catch (error) {
      setMessage('Error updating employee.');
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllEmployees();
    } catch (error) {
      setMessage('Error deleting employee.');
    }
  };

  // ✅ Safe Get Employee By ID
  const getEmployeeById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      console.log("Get by ID response:", res.data);

      if (res.data && typeof res.data === "object") {
        setFetchedEmployee(res.data);
        setMessage('');
      } else {
        setFetchedEmployee(null);
        setMessage('Employee not found.');
      }
    } catch (error) {
      console.error("Fetch by ID error:", error);
      setFetchedEmployee(null);
      setMessage('Employee not found.');
    }
  };

  const handleEdit = (emp) => {
    setEmployee(emp);
    setEditMode(true);
    setMessage(`Editing employee with ID ${emp.id}`);
  };

  const resetForm = () => {
    setEmployee({
      id: '',
      name: '',
      gender: '',
      department: '',
      designation: '',
      email: '',
      password: '',
      contact: '',
      salary: ''
    });
    setEditMode(false);
  };

  return (
    <div className="main-container">
    <div className="employee-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Employee Management System</h2>

      <div>
        <h3>{editMode ? 'Edit Employee' : 'Add Employee'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={employee.id} onChange={handleChange} />
          <input type="text" name="name" placeholder="Name" value={employee.name} onChange={handleChange} />
          <select name="gender" value={employee.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
          <select name="department" value={employee.department} onChange={handleChange}>
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="FINANCE">FINANCE</option>
            <option value="SALES">SALES</option>
          </select>
          <input type="text" name="designation" placeholder="Designation" value={employee.designation} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={employee.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={employee.password} onChange={handleChange} />
          <input type="text" name="contact" placeholder="Contact" value={employee.contact} onChange={handleChange} />
          <input type="number" name="salary" placeholder="Salary" value={employee.salary} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addEmployee}>Add Employee</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateEmployee}>Update Employee</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Employee By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getEmployeeById}>Fetch</button>

        {fetchedEmployee && (
          <div>
            <h4>Employee Found:</h4>
            <pre>{JSON.stringify(fetchedEmployee, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Employees</h3>
        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(employee).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    {Object.keys(employee).map((key) => (
                      <td key={key}>{emp[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(emp)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteEmployee(emp.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
    </div>
  );
};

export default EmpManager;
