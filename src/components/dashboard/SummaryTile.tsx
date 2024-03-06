type Props = {
  summaryTitle: string;
  icon: React.ReactNode;
  summaryValue: string;
};

function SummaryTile({
  summaryTitle,

  icon,
  summaryValue,
}: Readonly<Props>) {
  return (
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
      {icon}
      <div className="p-4 text-right">
        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
          {summaryTitle}
        </p>
        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
          {summaryValue}
        </h4>
      </div>
      {/* <div className="border-t border-blue-gray-50 p-4">
        <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
          <strong
            style={{
              color: marginColor,
            }}
          >
            {marginColor === "green" ? "+" : marginColor === "red" ? "-" : ""}
            {percentChange}%
          </strong>
          &nbsp;
          {`than ${lastPeriod}`}
        </p>
      </div> */}
    </div>
  );
}

export default SummaryTile;
