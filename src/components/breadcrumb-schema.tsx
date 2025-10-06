// Reusable BreadcrumbList schema component
// Usage:
//   Standalone: <BreadcrumbSchema items={[{name: "Systems", url: "/systems"}, ...]} />
//   In @graph: <BreadcrumbSchema items={[...]} asGraphNode />

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  asGraphNode?: boolean; // If true, returns object for embedding in @graph, not standalone script
  id?: string; // Optional @id for the breadcrumb list
}

export function BreadcrumbSchema({ items, asGraphNode = false, id }: BreadcrumbSchemaProps) {
  const breadcrumbData = {
    "@type": "BreadcrumbList",
    ...(id && { "@id": id }),
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://avolve.io${item.url}`
    }))
  };

  // If asGraphNode, return null (component is used for data only, embedded in parent @graph)
  if (asGraphNode) {
    return null;
  }

  // Standalone schema with @context
  const schemaData = {
    "@context": "https://schema.org",
    ...breadcrumbData
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

// Helper function to get breadcrumb data for embedding in @graph
export function getBreadcrumbData(items: BreadcrumbItem[], id?: string) {
  return {
    "@type": "BreadcrumbList",
    ...(id && { "@id": id }),
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://avolve.io${item.url}`
    }))
  };
}
