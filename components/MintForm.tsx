'use client'

import { useState } from 'react'
import { ethers } from 'ethers'
import { contractAddress, contractABI } from '../utils/contract'

export default function MintForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubURL: '',
    imageURL: '',
  })

  const [loading, setLoading] = useState(false)
  const [txHash, setTxHash] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const mintNFT = async () => {
    if (!window.ethereum) return alert('Install MetaMask!')
    setLoading(true)
    setTxHash('')

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)

      const tx = await contract.mintBuildNFT(
        formData.title,
        formData.description,
        formData.githubURL,
        formData.imageURL
      )
      await tx.wait()
      setTxHash(tx.hash)
    } catch (err) {
      console.error(err)
      alert('Transaction failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <input
        name="title"
        placeholder="Project Title"
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
      />
      <textarea
        name="description"
        placeholder="Project Description"
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
      />
      <input
        name="githubURL"
        placeholder="GitHub Repository URL"
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
      />
      <input
        name="imageURL"
        placeholder="Image URL"
        onChange={handleChange}
        className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
      />
      <button
        onClick={mintNFT}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-white"
      >
        {loading ? 'Minting...' : 'Mint NFT'}
      </button>

      {txHash && (
        <p className="text-green-400 text-sm mt-2">
          Success! View on explorer:{' '}
          <a
            href={`https://sepolia.basescan.org/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {txHash.slice(0, 10)}...
          </a>
        </p>
      )}
    </div>
  )
}
