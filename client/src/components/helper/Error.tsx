interface ErrorProps {
    error?: string | null;
}

const Error = ({ error }: ErrorProps) => {
  if (!error) return null;
  return <p className="error">{error}</p>;
};


export default Error;