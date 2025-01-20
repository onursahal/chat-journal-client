const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-rows-[20px_1fr_20px] bg-background items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <main className="flex flex-col gap-4 row-start-2 items-center content-center w-full ">
      {children}
    </main>
  </div>
)

export default AuthLayout
