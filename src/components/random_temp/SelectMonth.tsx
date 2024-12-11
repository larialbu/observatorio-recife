export const SelectMonth = ({
  months,
  setMonths,
  monthsAvaible,
}: {
  months: string;
  setMonths: (val: string) => void;
  monthsAvaible: string[];
}) => {
  const handleMonthChange = (muni: string) => {
    setMonths(muni);
  };

  //   const filteredMunicipalities = monthsAvaible.filter((muni) =>
  //     muni.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  return (
    <div className="relative w-[50%] mb-6">
      <select
        onChange={(e) => handleMonthChange(e.target.value)}
        className="w-full p-2 border border-gray-400 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {monthsAvaible.map((muni) => (
          <option
            value={muni}
            key={muni}
            className="p-2 cursor-pointer hover:bg-blue-100"
          >
            {muni}
          </option>
        ))}
      </select>
    </div>
  );
};
