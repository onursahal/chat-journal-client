'use client'

import Image from 'next/image'
import { getLocales } from './locales'
import useSWR from 'swr'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useState, useEffect } from 'react'

const fetcher = (url: string) =>
  axios
    .post(url, {
      query: `
        query {
          users {
            name
          }
        }
      `,
    })
    .then(
      (res: AxiosResponse<{ data: { users: { name: string }[] } }>) =>
        res.data.data
    )
    .catch()

const postUser = (url: string, data: { name: string; email: string }) =>
  axios
    .post(url, {
      query: `
        mutation {
            createUser(name: "${data.name}", email: "${data.email}") {
              name
              email
            }
          }
        
        `,
    })
    .then(
      (
        res: AxiosResponse<{
          data: { createUser: { name: string; email: string } }
        }>
      ) => res.data.data
    )
    .catch((err: AxiosError) => err.message)

export default function Home({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const [t, setT] = useState<{ default: Record<string, string> }>()
  const [state, setState] = useState<{ name: string; email: string }>({
    email: '',
    name: '',
  })
  const { data, mutate } = useSWR('/api/graphql', fetcher)

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
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1>{t?.default?.hello}</h1>
        <h1>{data?.users?.map((user) => user.name).join(', ')}</h1>
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
            await postUser('/api/graphql', state)
            mutate()
          }}
        >
          Create user
        </button>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{' '}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  )
}
