import React, { useEffect, useMemo, useState } from "react";

const prefix = "todoapp-jest-";

function useLocalStorage<T = any>(
  name: string,
  initialState: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const key = useMemo(() => prefix + name, [name]);
  const [state, setState] = useState<T>(() => {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    } else {
      if (typeof initialState == "function") {
        return initialState();
      } else {
        return initialState;
      }
    }
  });

  useEffect(() => {
    if (state == null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state, key]);

  return [state, setState];
}

export default useLocalStorage;
