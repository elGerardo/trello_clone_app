interface IBadgeProps {
  color: string;
  text: string;
}

export default function Badge({ text, color }: IBadgeProps) {
  return (
    <span style={{ backgroundColor: color }} className="px-2 p-0.5 m-0 h-5 rounded">
      {text}
    </span>
  );
}
