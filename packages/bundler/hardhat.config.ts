import '@nomiclabs/hardhat-ethers'
import '@nomicfoundation/hardhat-toolbox'
import 'hardhat-deploy'

import fs from 'fs'

import { HardhatUserConfig } from 'hardhat/config'
import { NetworkUserConfig } from 'hardhat/src/types/config'

import env from './localconfig/env.json'
const mnemonic = env.MNEMONIC

const infuraUrl = (name: string): string => `https://${name}.infura.io/v3/${env.INFURA_ID}`

function getNetwork (url: string): NetworkUserConfig {
  return {
    url,
    accounts: {
      mnemonic
    }
  }
}

function getInfuraNetwork (name: string): NetworkUserConfig {
  return getNetwork(infuraUrl(name))
}

const config: HardhatUserConfig = {
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5'
  },
  networks: {
    localhost: {
      url: 'http://localhost:8545/',
      saveDeployments: false
    },
    goerli: getInfuraNetwork('goerli'),
    bsctest: getNetwork(`https://bsc.getblock.io/${env.GETBLOCK_ID}/testnet/`),
    mumbai: getNetwork(`https://matic.getblock.io/${env.GETBLOCK_ID}/testnet/`)
  },
  solidity: {
    version: '0.8.15',
    settings: {
      optimizer: { enabled: true }
    }
  }
}

export default config
