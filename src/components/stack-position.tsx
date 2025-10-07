import Link from "next/link";

interface StackPositionProps {
  requires?: Array<{ name: string; url: string }>;
  integratesWith?: Array<{ name: string; url: string }>;
  usedIn?: Array<{ name: string; url: string }>;
  related?: Array<{ name: string; url: string; description?: string }>;
}

export function StackPosition({
  requires = [],
  integratesWith = [],
  usedIn = [],
  related = []
}: StackPositionProps) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 border-l-4 border-zinc-600 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">🔗 Stack Position</h3>
      <p className="text-sm text-muted-foreground mb-4">
        How this integrates within the modern web stack:
      </p>

      <div className="space-y-4">
        {requires.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-2">Requires:</h4>
            <div className="flex flex-wrap gap-2">
              {requires.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.url}
                  className="inline-flex items-center px-3 py-1 bg-white border border-border/40 rounded-md text-sm hover:bg-muted/50 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {integratesWith.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-2">Integrates With:</h4>
            <div className="flex flex-wrap gap-2">
              {integratesWith.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.url}
                  className="inline-flex items-center px-3 py-1 bg-white border border-border/40 rounded-md text-sm hover:bg-muted/50 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {usedIn.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-2">Used In:</h4>
            <div className="flex flex-wrap gap-2">
              {usedIn.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.url}
                  className="inline-flex items-center px-3 py-1 bg-white border border-border/40 rounded-md text-sm hover:bg-muted/50 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm mb-2">Related:</h4>
            <ul className="space-y-1">
              {related.map((item, idx) => (
                <li key={idx}>
                  • <Link href={item.url} className="text-zinc-700 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 hover:underline">
                    {item.name}
                  </Link>
                  {item.description && <span className="text-sm text-muted-foreground ml-2">- {item.description}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground mt-4 border-t border-zinc-200 dark:border-zinc-700 pt-3">
        💡 Understanding dependencies and integrations helps you see the complete system, not isolated tools.
      </p>
    </div>
  );
}
