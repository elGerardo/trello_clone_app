import Input from "../input";
import Button from "../button";

export default function Header({ className }: { className: string }) {
  return (
    <div className={`${className}`}>
      <Input defaultValue="AAA1223040" className="py-2 pl-2 text-sm" />
      <Button kind="primary" className="py-2 px-1.5 text-sm">Download ID</Button>
      <span className="block text-xs text-c-gray-300">Download your ID to never lose your data</span>
    </div>
  );
}
