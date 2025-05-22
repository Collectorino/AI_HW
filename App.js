import { useState } from "react";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [statistics, setStatistics] = useState(null);

  const handleAddExpense = () => {
    if (!item || isNaN(amount) || amount <= 0) return;
    setExpenses([...expenses, { item, amount: parseFloat(amount) }]);
    setItem("");
    setAmount("");
    setStatistics(null); // reset stats on new input
  };

  const handleCalculate = () => {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const average = expenses.length > 0 ? total / 30 : 0;
    const top3 = [...expenses].sort((a, b) => b.amount - a.amount).slice(0, 3);
    setStatistics({ total, average, top3 });
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "2rem auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        💸 Monthly Expense Tracker
      </h2>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <input
          style={inputStyle}
          placeholder="Item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <input
          style={inputStyle}
          placeholder="Amount ($)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button style={buttonStyle} onClick={handleAddExpense}>
          Add
        </button>
      </div>

      <h3 style={sectionTitle}>📋 Expenses</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Item</th>
            <th style={thStyle}>Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, index) => (
            <tr key={index} style={index % 2 === 0 ? trStyleEven : trStyleOdd}>
              <td style={tdStyle}>{exp.item}</td>
              <td style={tdStyle}>${exp.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        style={{ ...buttonStyle, marginTop: "1rem" }}
        onClick={handleCalculate}
      >
        📊 Calculate
      </button>

      {statistics && (
        <div style={{ marginTop: "2rem" }}>
          <h3 style={sectionTitle}>📈 Statistics</h3>
          <p>
            <strong>Total:</strong> ${statistics.total.toFixed(2)}
          </p>
          <p>
            <strong>Average Daily:</strong> ${statistics.average.toFixed(2)}
          </p>
          <div>
            <strong>Top 3 Expenses:</strong>
            <ul>
              {statistics.top3.map((exp, index) => (
                <li key={index}>
                  {exp.item} (${exp.amount.toFixed(2)})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const inputStyle = {
  padding: "0.5rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  flex: 1,
};

const buttonStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "0.5rem",
};

const thStyle = {
  textAlign: "left",
  padding: "0.75rem",
  backgroundColor: "#f3f4f6",
  borderBottom: "2px solid #ddd",
};

const tdStyle = {
  padding: "0.75rem",
  borderBottom: "1px solid #eee",
};

const trStyleEven = {
  backgroundColor: "#ffffff",
};

const trStyleOdd = {
  backgroundColor: "#f9fafb",
};

const sectionTitle = {
  fontSize: "1.25rem",
  margin: "1.5rem 0 0.5rem",
};
