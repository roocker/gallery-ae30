import "../styles/tooltip.css";
export default function Tooltip({ children, dir }) {
  return (
    <div
      className={`tooltip ${
        dir == "top"
          ? "t"
          : dir == "right"
            ? "r"
            : dir == "bottom"
              ? "b"
              : dir == "left"
                ? "l"
                : dir == "bottom-left"
                  ? "bl"
                  : ""
      }`}
    >
      {" "}
      <span>{children}</span>
    </div>
  );
}
