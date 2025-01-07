'use client'

import { useEffect, useState } from 'react'
import { authQueries } from '../services/auth/auth.service'
import { useQuery } from '@apollo/client'

export default function Home() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })
  const { loading, error, data } = useQuery<{
    login: { accessToken: string; refreshToken: string }
  }>(authQueries.login(), {
    variables: {
      email: user.email,
      password: user.password,
    },
  })

  useEffect(() => {
    console.log({ data, error, loading })
  }, [data, error, loading])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <input
          type="text"
          placeholder="Email"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, firstName: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, lastName: e.target.value }))
          }
        />
        <button onClick={() => {}}>Login</button>
        <button
          onClick={() => {
            console.log('create user')
          }}
        >
          Create User
        </button>
      </main>
    </div>
  )
}
