import { apiRoot } from '@api/apiClient'
import { useState } from 'react'

export const TestRequestButton = () => {
  const [result, setResult] = useState<string | null>(null)

  const handleClick = async () => {
    try {
      const response = await apiRoot
        .products()
        .get({ queryArgs: { limit: 5 } })
        .execute()
      console.log('✅ Request successful:', response.body)
      setResult(`Received ${response.body.count} product(s)`)
    } catch (error) {
      console.error('❌ Request error:', error)
      setResult('API request error')
    }
  }

  return (
    <div className="test">
      <button onClick={handleClick}>🔍 Test request</button>
      {result && <p>{result}</p>}
    </div>
  )
}
