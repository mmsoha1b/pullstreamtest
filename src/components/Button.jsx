import React from "react";

export default function Button({
  type,
  varaint,
  className,
  styles,
  clickHandler,
  children,
}) {
  let color = "";
  switch (varaint) {
    case "primary":
      color = "bg-green-700";
      break;
    case "danger":
      color = "bg-red-500";
      break;
    default:
      color = "bg-blue-500";
  }
  return (
    <button
      onClick={clickHandler}
      type={type || "button"}
      className={`px-4 py-2 table-cell align-middle text-white font-extrabold rounded-md mx-1 ${color} ${className}`}
      style={styles}
    >
      {children}
    </button>
  );
}
