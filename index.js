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

const result = `Total amount of creature types: ${creatureTypes}\n
To hire 10 most powerful creatures () would cost you: \n
To hire 20 second powerful creatures () would cost you: `;

console.log(result);
// END