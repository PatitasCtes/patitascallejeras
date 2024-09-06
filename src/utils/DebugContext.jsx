import React from "react";

const DebugContext = () => {
  const savedItemIds = JSON.parse(localStorage.getItem("savedItemIds")) || [];

  return (
    <div style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
      <h3>Context Debug</h3>
      <p>
        <strong>Saved Item IDs:</strong>
        {savedItemIds.length > 0 ? (
          <ul>
            {savedItemIds.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        ) : (
          "None"
        )}
      </p>
      <button
        onClick={() => {
          localStorage.setItem("savedItemIds", JSON.stringify([]));
          window.location.reload();
        }}
      >
        Refrescar
      </button>
    </div>
  );
};

export default DebugContext;
