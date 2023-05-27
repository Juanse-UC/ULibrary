import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [formValues, setFormValues] = useState(initialState);

  const reset = (newFormState = initialState) => {
    setFormValues(newFormState);
  };

  const handleInputChange = ({ target }) => {
    //setea a al estado los valores anteriores y los nuevos
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  //devuelve los valores del estado y la funcion de cambio
  return [formValues, handleInputChange, reset];
};