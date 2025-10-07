import { ExternalLink, FileText, Github, Package, Wrench } from "lucide-react";

interface OfficialSourcesProps {
  docs?: string;
  changelog?: string;
  github?: string;
  packageRegistry?: string;
  migration?: string;
  additional?: Array<{ label: string; url: string }>;
}

export function OfficialSources({
  docs,
  changelog,
  github,
  packageRegistry,
  migration,
  additional
}: OfficialSourcesProps) {
  return (
    <div className="bg-muted/30 border-l-4 border-slate-600/30 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">📚 Official Sources</h3>
      <p className="text-sm text-muted-foreground mb-4">
        For authoritative information, always refer to official documentation:
      </p>
      <div className="space-y-2">
        {docs && (
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 mt-1 text-slate-600" />
            <div>
              <span className="font-semibold">Documentation:</span>{" "}
              <a href={docs} className="text-slate-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {docs.replace(/^https?:\/\//, '')}
              </a>
            </div>
          </div>
        )}
        {changelog && (
          <div className="flex items-start gap-2">
            <ExternalLink className="w-4 h-4 mt-1 text-slate-600" />
            <div>
              <span className="font-semibold">Changelog/Releases:</span>{" "}
              <a href={changelog} className="text-slate-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {changelog.replace(/^https?:\/\//, '')}
              </a>
            </div>
          </div>
        )}
        {github && (
          <div className="flex items-start gap-2">
            <Github className="w-4 h-4 mt-1 text-slate-600" />
            <div>
              <span className="font-semibold">GitHub Repository:</span>{" "}
              <a href={github} className="text-slate-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
              </a>
            </div>
          </div>
        )}
        {packageRegistry && (
          <div className="flex items-start gap-2">
            <Package className="w-4 h-4 mt-1 text-slate-600" />
            <div>
              <span className="font-semibold">Package Registry:</span>{" "}
              <a href={packageRegistry} className="text-slate-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {packageRegistry.replace(/^https?:\/\/(www\.)?npmjs\.com\/package\//, 'npm: ')}
              </a>
            </div>
          </div>
        )}
        {migration && (
          <div className="flex items-start gap-2">
            <Wrench className="w-4 h-4 mt-1 text-slate-600" />
            <div>
              <span className="font-semibold">Migration Guide:</span>{" "}
              <a href={migration} className="text-slate-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {migration.replace(/^https?:\/\//, '')}
              </a>
            </div>
          </div>
        )}
        {additional?.map((link, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <ExternalLink className="w-4 h-4 mt-1 text-slate-600" />
            <div>
              <span className="font-semibold">{link.label}:</span>{" "}
              <a href={link.url} className="text-slate-600 hover:underline" target="_blank" rel="noopener noreferrer">
                {link.url.replace(/^https?:\/\//, '')}
              </a>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4 border-t border-border/30 pt-3">
        💡 <strong>Avolve.io curates and integrates.</strong> We link to official sources and focus on how tools work together, not duplicating vendor documentation.
      </p>
    </div>
  );
}
