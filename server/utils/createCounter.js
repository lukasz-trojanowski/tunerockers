function createCounter(start = 0) {
  let counter = start;
  const myFunction = function() {
    counter = counter + 1;
    return counter;
  };
  return myFunction;
}

const increment = createCounter();