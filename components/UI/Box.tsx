type Props = {
  size?: "small" | "large",
  className?: string,
  children: any,
};

const Box = ({ size, className = '', children }: Props) => {
  return (
    <div
      className={`flex flex-col rounded bg-white w-full ${size === 'small' ? 'max-w-[450px]' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Box;
