const CustomLegend = ({ payload, noBorder }: { payload: any, noBorder?: boolean }) => (
  <div className={`flex flex-wrap gap-2 justify-center space-x-4 ${noBorder ? '' : 'border'} -mt-2 mb-4 rounded-md p-2`}>
    {payload?.map((entry: any, index: number) => (
      <div key={index} className="flex items-center justify-center gap-1 text-xs">
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
        <span
          className="text-xs font-semibold"
          style={{
            color: entry.color,
          }}
        >
          {entry.value}
        </span>
      </div>
    ))}
  </div>
);

export default CustomLegend;
