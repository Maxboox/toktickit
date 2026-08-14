import React, { useState } from 'react'

function App() {
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  const checkSystem = async () => {
    setLoading(true)
    setError(null)
    setStatus(null)
    setCategories([])

    try {
      const healthRes = await fetch('http://localhost:3001/api/health')
      const healthData = await healthRes.json()
      setStatus(healthData.status || 'Online')

      const catRes = await fetch('http://localhost:3001/api/categories')
      const catData = await catRes.json()
      if (Array.isArray(catData)) {
        setCategories(catData)
      }
    } catch (err) {
      setError('Impossible de contacter le serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>TokTickIT IT Service Desk</h1>
      <button onClick={checkSystem}>🔍 Check System</button>

      {loading && <p>⏳ Chargement...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      {status && <p>✅ Système : {status}</p>}

      {categories.length > 0 && (
        <div>
          <h3>Catégories supportées :</h3>
          <ul>
            {categories.map((cat) => (
              <li key={cat.id}>{cat.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App