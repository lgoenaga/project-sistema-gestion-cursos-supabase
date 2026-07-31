function PrimaryButton({
  children,
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-4
        py-2
        rounded-lg
        font-medium
        transition
      "
    >
      {children}
    </button>
  );
}

export default PrimaryButton;