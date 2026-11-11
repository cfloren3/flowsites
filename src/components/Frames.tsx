import Image from "next/image";
import clsx from "clsx";

export function BrowserFrame({
  src,
  alt,
  url,
  className,
  priority,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  dark = false,
  imgClassName,
}: {
  src: string;
  alt: string;
  url: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  dark?: boolean;
  imgClassName?: string;
}) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-[14px] border shadow-[0_40px_80px_-30px_rgba(13,14,12,.45),0_0_0_1px_rgba(13,14,12,.04)]",
        dark ? "border-paper/10 bg-ink-2" : "border-ink/10 bg-[#fbfaf6]",
        className,
      )}
    >
      <div className={clsx("flex items-center gap-3 px-3.5 py-2.5 border-b", dark ? "border-paper/10" : "border-ink/[0.07]")}>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div
          className={clsx(
            "mx-auto flex max-w-[60%] flex-1 items-center justify-center gap-1.5 truncate rounded-md px-3 py-1 font-mono text-[11px]",
            dark ? "bg-paper/5 text-paper/50" : "bg-ink/[0.04] text-ink/50",
          )}
        >
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 shrink-0" aria-hidden="true">
            <path d="M3 5V4a3 3 0 016 0v1h.5a.5.5 0 01.5.5v5a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5H3zm1 0h4V4a2 2 0 00-4 0v1z" fill="currentColor" />
          </svg>
          <span className="truncate">{url}</span>
        </div>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={clsx("object-cover object-top", imgClassName)} />
      </div>
    </div>
  );
}

export function PhoneFrame({
  src,
  alt,
  className,
  priority,
  sizes = "(min-width: 1024px) 18vw, 40vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={clsx(
        "relative rounded-[2.2rem] bg-[#0b0b0b] p-[7px] shadow-[0_40px_80px_-25px_rgba(13,14,12,.55)] ring-1 ring-white/10",
        className,
      )}
    >
      <div className="relative aspect-[390/844] overflow-hidden rounded-[1.75rem] bg-black">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        <span aria-hidden="true" className="absolute left-1/2 top-2 h-[18px] w-[30%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
