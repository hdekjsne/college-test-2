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

const sortedByPower = processedData.sort((creature1, creature2) => {
  const force1 = Number(creature1[i.force]);
  const force2 = Number(creature2[i.force]);
  if (force1 > force2) return -1;
  if (force1 === force2) return 0;
  return 1;
});

const sortedByWeight = processedData.sort((creature1, creature2) => {
  const weight1 = Number(creature1[i.weight]);
  const weight2 = Number(creature2[i.weight]);
  if (weight1 > weight2) return -1;
  if (weight1 === weight2) return 0;
  return 1;
});
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