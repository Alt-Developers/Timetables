import { useEffect, useState } from "react";

const Clock: React.FC<{ options: Intl.DateTimeFormatOptions }> = props => {
  const [time, setTime] = useState(
    new Date().toLocaleString("en-US", props.options ? props.options : {})
  );

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTime(new Date().toLocaleString("en-US", props.options));
    }, 1000);

    return () => clearInterval(clockInterval);
  });

  return <>{time}</>;
};

export default Clock;
