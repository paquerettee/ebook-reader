export function EbookButton({ onClick, children }) {
  return (
    <button className="btn-primary" onClick={onClick}>
      {children}
    </button>
  );
}
