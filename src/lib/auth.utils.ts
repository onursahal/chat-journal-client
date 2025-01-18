export type ProtectedQueryActionMap = {
  testAction: (args: { id: string }) => Promise<{
    data: { firstName: string; lastName: string; email: string }
    error: null
  }>
  emptyAction: () => Promise<void>
}
