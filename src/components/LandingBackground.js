export default function LandingBackground({ children }) {
  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-green-950
      to-black
      relative
      overflow-hidden
      "
    >
      {/* Green Glow */}
      <div className="absolute w-96 h-96 bg-green-500/20 rounded-full blur-3xl -top-20 -left-20"></div>

      <div className="absolute w-96 h-96 bg-green-400/10 rounded-full blur-3xl bottom-0 right-0"></div>

      {/* Grid Overlay */}
      <div
        className="
        absolute
        inset-0
        opacity-10
        bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]
        bg-[size:40px_40px]
        "
      />

      {children}
    </div>
  );
}