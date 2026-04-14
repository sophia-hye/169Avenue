import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export function AdminToggle() {
  const { isAdmin, login, logout } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleToggle = () => {
    if (isAdmin) {
      logout()
    } else {
      setShowModal(true)
      setPassword('')
      setError(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(password)) {
      setShowModal(false)
      setPassword('')
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <>
      <button
        onClick={handleToggle}
        className={`p-2 transition-colors duration-300 ${
          isAdmin ? 'text-secondary' : 'text-primary/20 hover:text-primary/40'
        }`}
        aria-label={isAdmin ? 'Disable admin mode' : 'Enable admin mode'}
        title={isAdmin ? 'Admin ON' : 'Admin'}
      >
        <span
          className="material-symbols-outlined text-lg"
          style={isAdmin ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          {isAdmin ? 'lock_open' : 'lock'}
        </span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-surface border border-outline-variant/20 shadow-xl w-full max-w-sm mx-4 p-8"
          >
            <h3 className="font-headline text-xl text-primary mb-6 tracking-tight">Admin Access</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false) }}
              placeholder="Password"
              autoFocus
              className={`w-full border px-4 py-3 font-body text-sm text-primary bg-surface-container-low outline-none transition-colors ${
                error ? 'border-red-400' : 'border-outline-variant/30 focus:border-secondary'
              }`}
            />
            {error && (
              <p className="text-red-500 text-xs font-body mt-2">Incorrect password</p>
            )}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 font-body text-sm text-primary/60 border border-outline-variant/30 hover:bg-surface-container-low transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 font-body text-sm bg-primary text-on-primary hover:bg-secondary transition-colors"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
