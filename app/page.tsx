import MintForm from "../components/MintForm"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-xl mx-auto mt-12">
        <h1 className="text-3xl font-bold mb-4">Proof of Build NFT 🧾</h1>
        <p className="mb-6 text-gray-400">
          Mint an NFT to prove you completed a build! Add project title,
          description, GitHub link & image URL.
        </p>
        <MintForm />
      </div>
    </main>
  )
}
