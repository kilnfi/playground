type Props = {
  children: any,
  className?: string,
}

const Card = ({ children, className = '' }: Props) => {
  return (
    <div className={`bg-white shadow rounded-lg p-6 transition ease-in duration-150 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
