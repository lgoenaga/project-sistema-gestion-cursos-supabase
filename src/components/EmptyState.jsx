function EmptyState({ message }) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        p-10
        text-center
        text-slate-500
      "
    >
      {message}
    </div>
  );
}

export default EmptyState;