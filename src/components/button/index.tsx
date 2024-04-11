const formatTypes = {
    primary: "btn-primary",
    secondary: "btn-secondary",
  };
  
  export default function Button({
    children,
    kind,
    onClick,
    className = ''
  }: {
    children?: React.ReactNode;
    kind?: "primary" | "secondary";
    onClick?: (event: any) => void;
    className?: string;
  }) {
    const handleOnClick = (event: any) => {
      if (onClick) {
        onClick(event); // Asegúrate de que onClick exista antes de llamarlo
      }
    };
    return (
      <button
        className={`${kind === undefined ? "btn-primary" : formatTypes[kind]} ${className} `}
        onClick={(event) => handleOnClick(event)}
      >
        {children}
      </button>
    );
  }
  