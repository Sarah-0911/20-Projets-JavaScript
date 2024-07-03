const getRandomNumber = (min, max) => {
  let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
  randomNumber = randomNumber / Math.pow(2, 32);
  //32 bit binary number can have 2³² values => 4294967296;

  return Math.floor(randomNumber * (max - min + 1) + min);
};

console.log(getRandomNumber(5, 10));
// getRandomNumber(5, 10);
