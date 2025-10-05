import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, FileText } from "lucide-react"
import Link from "next/link"

interface Resource {
  title: string
  url: string
  type: "docs" | "github" | "spec"
  description?: string
}

interface OfficialResourcesProps {
  title?: string
  resources: Resource[]
  description?: string
}

export function OfficialResources({
  title = "Official Resources",
  resources,
  description = "Authoritative documentation and source code from the official maintainers."
}: OfficialResourcesProps) {
  const getIcon = (type: Resource["type"]) => {
    switch (type) {
      case "docs":
        return <FileText className="h-4 w-4" />
      case "github":
        return <Github className="h-4 w-4" />
      case "spec":
        return <ExternalLink className="h-4 w-4" />
    }
  }

  const getLabel = (type: Resource["type"]) => {
    switch (type) {
      case "docs":
        return "Documentation"
      case "github":
        return "Source Code"
      case "spec":
        return "Specification"
    }
  }

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {resources.map((resource, index) => (
            <li key={index}>
              <Link
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent hover:border-accent-foreground/20 transition-colors group"
              >
                <div className="mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors">
                  {getIcon(resource.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{resource.title}</span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {resource.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {resource.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {getLabel(resource.type)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
