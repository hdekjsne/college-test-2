#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fileName = process.argv[2];
const content = fs.readFileSync(path.join(
  __dirname,
  fileName
), 'utf-8');

// BEGIN
const i = {
  name: 0,
  force: 1,
  hp: 2,
  amount: 3,
  height: 4,
  weight: 5,
  price: 6,
};

// utils
function sort(arr, criteria) {
  return arr.sort((a, b) => {
    const c1 = Number(a[i[criteria]]);
    const c2 = Number(b[i[criteria]]);
    if (c1 > c2) return -1;
    if (c1 === c2) return 0;
    return 1;  
  });
}
//


const processedData = content
  .split('\r\n')
  .map((line) => line
    .split('|')
    .map((word) => word.trim())
    .filter((word) => !word.includes('-'))
    .filter((word) => word != 0))
  .filter((line) => line.length > 0)
  .filter((line, index) => index !== 0);

const creatureTypes = processedData.reduce((acc) => acc + 1, 0);

const sortedByPower = sort(processedData, 'force');

const sortedByWeight = sort(processedData, 'weight');
const heavyPricePerSquade = sortedByWeight[0][i.price] * sortedByWeight[0][i.amount];
const thinPricePerSquade = sortedByWeight[sortedByWeight.length - 1][i.price] * sortedByWeight[sortedByWeight.length - 1][i.amount];

const result = `Total amount of creature types: ${creatureTypes}\n
\n
To hire 10 most powerful creatures (${sortedByPower[0][i.name]}) would cost you: ${sortedByPower[0][i.price] * 10}\n
To hire 20 second powerful creatures (${sortedByPower[1][i.name]}) would cost you: ${sortedByPower[1][i.price] * 20}\n
\n
The most heavyweight unit is ${sortedByWeight[0][i.name]}\n
To hire a squade of them would cost you: ${heavyPricePerSquade}\n
The thinnest unit is ${sortedByWeight[sortedByWeight.length - 1][i.name]}\n
To hire a squade of them would cost you: ${thinPricePerSquade}`;

console.log(result);
// END