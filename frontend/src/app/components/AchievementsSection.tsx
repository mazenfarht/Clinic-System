import { ACHIEVEMENTS } from "./constants";

export default function AchievementsSection() {
  return (
    <section className="py-20 bg-[#1A6BCC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.map((item) => (
            <div
              key={item.label}
              className="text-center p-6 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4 text-white">
                {item.icon}
              </div>

              <p className="text-4xl font-black text-white mb-2">
                {item.value}
              </p>

              <p className="text-white/80 text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
