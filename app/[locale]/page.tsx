'use client'

import { getLocales } from './locales'
// import useSWR from 'swr'
import { useState, useEffect } from 'react'
import {
  // getAllUsersFetcher,
  createUserFetcher,
  // getUserByIdFetcher,
} from '../services/user/fetcher'

export default function Home({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const [t, setT] = useState<{ default: Record<string, string> }>()
  const [state, setState] = useState<{
    name: string
    email: string
    id: string
  }>({
    email: '',
    name: '',
    id: '',
  })
  // const { data } = useSWR('/api/graphql', getAllUsersFetcher)
  // const { data: userByIdData } = useSWR(state.id, getUserByIdFetcher)

  useEffect(() => {
    const translationResponse = async () => {
      const res = await getLocales(locale)
      setT(res)
    }
    translationResponse().catch((error) => console.error(error))
  }, [locale])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>{t?.default?.hello}</h1>
        <ol>
          {/* {data?.users?.map((user) => (
            <li key={user.id}>{user.name + ' - ' + user.email}</li>
          ))} */}
        </ol>
        <input
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
        <input
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        <button
          onClick={async () => {
            await createUserFetcher(state.email, state.name)
          }}
        >
          Create user
        </button>
        {/* {userByIdData && (
          <p>{userByIdData?.user?.name + ' - ' + userByIdData?.user?.email}</p>
        )} */}
        <input
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              id: e.target.value,
            }))
          }
        />
        <button>Search user with id</button>
      </main>
    </div>
  )
}
