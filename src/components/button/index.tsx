const formatTypes = {
    primary: "btn-primary",
    secondary: "btn-secondary",
  };
  
  export default function Button({
    children,
    kind,
    onClick,
    className = '',
    disabled = false
  }: {
    children?: React.ReactNode;
    kind?: "primary" | "secondary";
    onClick?: (event: any) => void;
    className?: string;
    disabled?: boolean
  }) {
    const handleOnClick = (event: any) => {
      if (onClick) {
        onClick(event); // Asegúrate de que onClick exista antes de llamarlo
      }
    };
    return (
      <button
        className={`${disabled ? "btn-disabled" :  kind === undefined ? "btn-primary" : formatTypes[kind]} ${className} `}
        onClick={(event) => handleOnClick(event)}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  