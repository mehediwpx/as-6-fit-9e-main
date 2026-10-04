export function Spinner({ label }: { label: string }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-16">
      <span className="size-10 animate-spin rounded-full border-4 border-border border-t-primary" />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}
