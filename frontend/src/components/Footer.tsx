export default function Footer() {
  return (
    <footer className="bg-neutral-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl border-t border-white/10 pt-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} 3rd Dynamic Snaps
          </p>

          <a
            href="https://karteverything.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-white/50"
          >
            Created by KArtEverything
          </a>
        </div>
      </div>
    </footer>
  );
}