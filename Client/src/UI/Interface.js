import React from "react";

function Interface({ handleInterface, status }) {
  return (
    <div className="interface">
      <div className="info-interface">
        <input readOnly type="text" value={status} />
      </div>

      <div className="action-interface">
        <button
          className="generate-btn btn"
          onclick={() => handleInterface("create")}
        >
          Create
        </button>
        <button
          className="validate-btn btn"
          onclick={() => handleInterface("validate")}
        >
          Validate
        </button>
        <button
          className="solve-btn btn"
          onclick={() => handleInterface("solve")}
        >
          Solve
        </button>
        <button
          className="clear-btn btn"
          onclick={() => handleInterface("clear")}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default Interface;
