let str = "NEGIE1";
let reversedStr =
  str
    .substring(0, str.length - 1)
    .split("")
    .reverse()
    .join("") + str.charAt(str.length - 1);

console.log(reversedStr); // Output: ENOHP1
