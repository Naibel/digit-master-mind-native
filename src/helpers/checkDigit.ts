const checkDigit = (
  newValue: string,
  prevValue: string,
  callback: (text: string) => void
) => {
  const lastEnteredValue = newValue[newValue.length - 1];
  //This test will only launches if you add a new number, not when you remove one
  const isThereAlreadyThisValue =
    newValue.length > prevValue.length &&
    prevValue.indexOf(lastEnteredValue) > -1;

  if (
    (prevValue.length === 0 && newValue === "0") ||
    isThereAlreadyThisValue ||
    newValue.match(/[^0-9]/g)
  ) {
    return false;
  }
  callback(newValue);
};

export default checkDigit;
