import React, { useEffect, useMemo, useState } from "react";

const prefix = "todoapp-jest-";

/**
 * A function that has similar use as useState, but with localstorage saving functionality.
 * This hook will create a localstorage item and updates it everytime the state changes
 * @param name - the name of localstorage item (must be unique for each useLocalStorage use)
 * @param initialState - the initialstate of the item if there is no item in localstorage
 * @returns state and setstate for user
 */
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
