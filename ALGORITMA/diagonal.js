const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

let sumFirstDiagonal = 0;
let sumSecondDiagonal = 0;

for (let i = 0; i < matrix.length; i++) {
  sumFirstDiagonal += matrix[i][i];
  sumSecondDiagonal += matrix[i][matrix.length - 1 - i];
}

const result = Math.abs(sumFirstDiagonal - sumSecondDiagonal);

console.log(result); // Output: 3
