const positions = {
  down: "-ml-8 mt-12",
  up: "-ml-10 -mt-10",
  left: "ml-11",
  rigth: "-ml-36",
};

export default function Tooltip({
  text,
  position,
  children,
  className = ""
}: {
  text: string;
  position: "up" | "down" | "left" | "rigth";
  children?: React.ReactNode;
  className?: string
}) {
  return (
    <span className={`tooltip-parent ${className}`}>
      <span
        className={`tooltip invisible absolute w-fit rounded shadow-lg text-sm bg-c-gray-100 -ml- text-c-dark mx-auto p-1 ${positions[position]}`}
      >
        {text}
      </span>
      {children}
    </span>
  );
}
