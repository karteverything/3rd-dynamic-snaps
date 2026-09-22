export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium tracking-[0.12em]">
              3RD DYNAMIC SNAPS
            </p>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/50">
              Photography focused on authentic moments,
              meaningful stories and timeless imagery.
            </p>
          </div>

          <div className="text-sm text-white/50">
            <p>South Africa</p>
            <p className="mt-2">© 2026 3rd Dynamic Snaps</p>
          </div>
        </div>
      </div>
    </footer>
  );
}