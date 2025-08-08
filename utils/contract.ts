export const contractAddress = 'Y0xA549873499B3E8cBAc4D5d1BfD7d131EbaFFd4eF'

export const contractABI = [
  // Only the ABI needed for frontend interaction
  {
    inputs: [
      { internalType: 'string', name: '_title', type: 'string' },
      { internalType: 'string', name: '_description', type: 'string' },
      { internalType: 'string', name: '_githubURL', type: 'string' },
      { internalType: 'string', name: '_imageURL', type: 'string' },
    ],
    name: 'mintBuildNFT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
