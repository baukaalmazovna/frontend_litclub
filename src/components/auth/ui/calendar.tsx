import { useState } from "react";

export function Calendar() {
  const [date, setDate] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div style={{ padding: "10px" }}>
      <h3>Выбери дату</h3>

      <input
        type="date"
        value={date}
        onChange={handleChange}
        style={{
          padding: "8px",
          border: "1px solid gray",
          borderRadius: "8px",
        }}
      />

      <p style={{ marginTop: "10px" }}>
        Выбрана дата: {date ? date : "не выбрана"}
      </p>
    </div>
  );
}