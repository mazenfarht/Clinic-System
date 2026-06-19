import { Calendar, Shield, Clock, Star, Check, ArrowLeft } from "lucide-react";
import Image from "next/image";
const MINI_FEATURES = [
  {
    icon: <Shield className="w-5 h-5 text-[#1A6BCC]" />,
    text: "معتمدون دولياً",
  },
  { icon: <Clock className="w-5 h-5 text-[#1A6BCC]" />, text: "٢٤/٧ متاحون" },
  { icon: <Star className="w-5 h-5 text-[#1A6BCC]" />, text: "٩٨٪ رضا المرضى" },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="py-20 !pt-24 !pb-28 bg-gradient-to-bl from-[#EBF3FF] via-[#F8FAFB] to-[#F8FAFB]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A6BCC]/10 text-[#1A6BCC] text-sm font-semibold mb-6">
              <Shield className="w-4 h-4" /> رعاية صحية بمعايير عالمية
            </span>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-[#1A2B45] leading-tight mb-6">
              صحتك أمانة
              <span className="text-[#1A6BCC] block">في أيدٍ أمينة</span>
            </h1>

            <p className="text-[#6B7A92] text-lg leading-relaxed mb-8 max-w-lg">
              عيادة كلينيك كيو توفر لك رعاية طبية متكاملة بأحدث التقنيات وأمهر
              الأطباء المتخصصين. صحتك ورفاهيتك هي أولويتنا القصوى.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="/book"
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#1A6BCC] text-white font-bold text-base hover:bg-[#155bb5] transition-all shadow-lg shadow-[#1A6BCC]/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" /> احجز موعدك الآن
              </a>

              <a
                href="#doctor"
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-[#E2E8EF] text-[#1A2B45] font-bold text-base hover:border-[#1A6BCC] hover:text-[#1A6BCC] transition-all"
              >
                اكتشف خدماتنا <ArrowLeft className="w-4 h-4 rotate-180" />
              </a>
            </div>

            {/* Mini Features */}
            <div className="grid grid-cols-3 gap-4">
              {MINI_FEATURES.map((f) => (
                <div
                  key={f.text}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white border border-[#E2E8EF] text-center shadow-sm"
                >
                  {f.icon}
                  <span className="text-xs font-semibold text-[#1A2B45] leading-tight">
                    {f.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 rounded-3xl bg-[#1A6BCC]/10 blur-3xl scale-110" />

              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl aspect-[4/5]">
                <Image
                  src="/doctor1.jpg"
                  alt="Doctor"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-[#E2E8EF]">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-[#6B7A92]">مرضى راضون</p>
                  <p className="font-bold text-[#1A2B45]">+١٥,٠٠٠ مريض</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
