'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import './AuthPage.css'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const endpoint = isLogin ? '/api/login' : '/api/signup'
    const body = isLogin ? { email, password } : { name, email, password }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        router.push('/dashboard')
      } else {
        const data = await response.json()
        alert(data.message)
      }
    } catch (error) {
      console.error('An error occurred:', error)
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <div className="auth-container">
      <div className={`auth-form-container ${isLogin ? 'login' : 'signup'}`}>
        <div className="form-slider">
          <form onSubmit={handleSubmit} className="login-form">
            <h2>Welcome Back</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
          </form>
          <form onSubmit={handleSubmit} className="signup-form">
            <h2>Create Account</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="switch-form">
          <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  )
}

