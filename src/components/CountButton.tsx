import { useState } from 'react';

export const CountButton = () => {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount(count => count + 1)}>
      count is: {count}
    </button>
  );
};
