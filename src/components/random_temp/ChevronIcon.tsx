export const ChevronIcon = ({ up = false }: { up?: boolean }) => (
    <svg
      className={`h-4 w-4 text-gray-500 dark:fill-gray-200 transition-transform duration-200 ${
        up ? "rotate-180" : ""
      }`}
      viewBox="0 0 20 20"
    >
      <path d="M6 8l4 4 4-4" />
    </svg>
  );