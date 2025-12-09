import { useEffect, useState } from "react";
import "./App.css";
import { API } from "./api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses on load
  const loadExpenses = async () => {
    const res = await fetch(`${API}/expenses`);
    const data = await res.json();
    setExpenses(data);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // Add expense
  const addExpense = async (expense) => {
    await fetch(`${API}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
    loadExpenses();
  };

  // Delete expense
  const deleteExpense = async (id) => {
    await fetch(`${API}/expenses/${id}`, {
      method: "DELETE",
    });
    loadExpenses();
  };

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="container">
      <h2>Expense Tracker</h2>

      <ExpenseForm addExpense={addExpense} />

      <h3>Expenses</h3>
      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />

      <div className="total">Total: ₹{total}</div>
    </div>
  );
}

export default App;
