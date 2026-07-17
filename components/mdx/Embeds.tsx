/** Lazy-loaded iframe embeds for rich media inside MDX case studies. */

interface EmbedFrameProps {
  src: string;
  title: string;
  aspect?: string;
}

function EmbedFrame({ src, title, aspect = "aspect-video" }: EmbedFrameProps) {
  return (
    <div className={`my-8 overflow-hidden rounded-xl border border-line ${aspect}`}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allowFullScreen
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}

export function YouTube({ id, title = "YouTube video" }: { id: string; title?: string }) {
  return <EmbedFrame src={`https://www.youtube-nocookie.com/embed/${id}`} title={title} />;
}

export function Loom({ id, title = "Loom recording" }: { id: string; title?: string }) {
  return <EmbedFrame src={`https://www.loom.com/embed/${id}`} title={title} />;
}

export function Figma({ url, title = "Figma file" }: { url: string; title?: string }) {
  const src = `https://www.figma.com/embed?embed_host=portfolio&url=${encodeURIComponent(url)}`;
  return <EmbedFrame src={src} title={title} aspect="aspect-[4/3]" />;
}

export function PDF({ src, title = "PDF document" }: { src: string; title?: string }) {
  return (
    <div className="my-8">
      <EmbedFrame src={src} title={title} aspect="aspect-[3/4] sm:aspect-[4/3]" />
      <p className="mt-2 text-center text-sm">
        <a href={src} className="text-accent underline decoration-accent/40 underline-offset-[3px] hover:decoration-accent" download>
          Download {title}
        </a>
      </p>
    </div>
  );
}

export function Video({ src, caption }: { src: string; caption?: string }) {
  return (
    <figure className="my-8">
      <video
        src={src}
        controls
        preload="metadata"
        className="w-full rounded-xl border border-line"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-ink-faint">{caption}</figcaption>
      )}
    </figure>
  );
}
