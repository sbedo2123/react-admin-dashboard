import { Edit2, Trash2 } from "lucide-react";

function Table({ columns, data, isLoading = false, onEdit, onDelete }) {
  if (isLoading) {
    return (
      <div className="table-container">
        <div className="loading">Loading data...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="table-container">
        <div className="empty-state">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
            {(onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col}>{item[col]}</td>
              ))}
              {(onEdit || onDelete) && (
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#3498db",
                          padding: "0.25rem 0.5rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          fontSize: "0.875rem",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#2980b9")}
                        onMouseLeave={(e) => (e.target.style.color = "#3498db")}
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#e74c3c",
                          padding: "0.25rem 0.5rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          fontSize: "0.875rem",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#c0392b")}
                        onMouseLeave={(e) => (e.target.style.color = "#e74c3c")}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
