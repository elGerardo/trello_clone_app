interface IBadgeProps {
  color: string;
  text: string;
  className?: string
}

export default function Badge({ text, color, className = '' }: IBadgeProps) {
  return (
    <span style={{ backgroundColor: color }} className={`px-2 p-0.5 m-0 h-5 rounded ${className}`}>
      {text}
    </span>
  );
}
