import { Star } from "lucide-react";
import { TESTIMONIALS } from "./constants";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A2B45] mb-4">
            ماذا يقول مرضانا
          </h2>

          <p className="text-[#6B7A92] text-lg max-w-2xl mx-auto leading-relaxed">
            آراء حقيقية من مرضى حقيقيين وثقوا بنا وحصلوا على أفضل رعاية صحية.
          </p>

          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#1A6BCC]" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="p-7 rounded-3xl bg-white border border-[#E2E8EF] shadow-sm hover:shadow-lg transition-all"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#6B7A92] leading-relaxed mb-6 text-sm">
                "{t.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1A6BCC]/10 flex items-center justify-center">
                  <span className="text-[#1A6BCC] font-bold text-sm">
                    {t.name[0]}
                  </span>
                </div>

                <div>
                  <p className="font-bold text-[#1A2B45] text-sm">{t.name}</p>
                  <p className="text-xs text-[#6B7A92]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
