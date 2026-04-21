import React from "react";

export function Button({ children, onClick }: any) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}