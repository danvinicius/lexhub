import { useState } from "react";

function useLocalStorage(key: string, initialValue?: any) {
  const readValueFromLocalStorage = () => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(`Erro ao ler a chave "${key}" do localStorage`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValueFromLocalStorage);

  const setValue = (value: any) => {
  setStoredValue(value);
  console.log(value);
  
  if (value === null) {
    localStorage.removeItem(key); // Remove item se o valor for null
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
