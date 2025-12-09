export default function ExpenseList({ expenses, deleteExpense }) {
  return (
    <ul className="expense-list">
      {expenses.map((exp) => (
        <li key={exp.id} className="expense-item">
          {exp.title} - ₹{exp.amount} ({exp.category})
          <button onClick={() => deleteExpense(exp.id)}>X</button>
        </li>
      ))}
    </ul>
  );
}
