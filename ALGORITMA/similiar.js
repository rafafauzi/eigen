const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];

let result = [];
for (let i = 0; i < QUERY.length; i++) {
  let count = 0;
  for (let j = 0; j < INPUT.length; j++) {
    if (QUERY[i] === INPUT[j]) {
      count++;
    }
  }
  result.push(count);
}

console.log(result); // Output: [1, 0, 2]
