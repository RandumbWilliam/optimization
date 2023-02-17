export const checkNumberString = (value: string) => {
  const re = /^-?\d+(\.\d+)?(\/-?\d+(\.\d+)?)?$/;

  if (value === "" || re.test(value)) {
    return true;
  }

  return false;
};

export const checkPositiveIntegerString = (value: string) => {
  const re = /^[0-9\b]+$/;

  if (value === "" || re.test(value)) {
    return true;
  }

  return false;
};
