"use client";

export default function SummaryCard({ title, value }) {
  return (
    <div className="
        bg-nubank-card 
        p-5 
        rounded-xl 
        shadow-lg 
        shadow-black/20 
        border border-purple-900/40
        backdrop-blur-sm
      ">
      <p className="text-purple-300 text-sm">{title}</p>
      <h2 className="text-2xl font-semibold tracking-tight text-white mt-1">{value}</h2>
    </div>
  );
}
