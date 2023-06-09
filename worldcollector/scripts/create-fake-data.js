import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  randAirline,
  randCompanyName,
  randFood,
  randParagraph,
  randProductName,
  randVehicle,
  randVehicleManufacturer,
  randVehicleModel,
  randVehicleType,
} from '@ngneat/falso'

const N = 512

const nameGenerators = [
  randAirline,
  randCompanyName,
  randFood,
  randProductName,
  randVehicle,
  randVehicleManufacturer,
  randVehicleModel,
  randVehicleType,
]

function createFakeData() {
  const names = new Set()
  const descriptions = new Set()

  for (let i = 0; i < N; i++) {
    names.add(nameGenerators[Math.random() * nameGenerators.length | 0]())
    descriptions.add(randParagraph())
  }

  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const data = JSON.stringify({
    names: [...names],
    descriptions: [...descriptions],
  }, null, 2)

  fs.writeFileSync(path.join(__dirname, 'output/fake-data.json'), data)
}

createFakeData()
