export function EbookButton({ onClick, children }) {
  return (
    <button
      className="w-24 px-6 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
