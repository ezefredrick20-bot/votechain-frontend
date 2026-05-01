export default function GlassCard({ children }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl w-full max-w-md">
      {children}
    </div>  
  );
}