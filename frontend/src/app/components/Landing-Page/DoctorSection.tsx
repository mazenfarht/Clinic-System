import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DOCTOR_STATS = [
  { label: "التخصص", value: "جراحة القلب" },
  { label: "الخبرة", value: "٢٠+ سنة" },
  { label: "العمليات", value: "+٣٠٠٠ عملية" },
  { label: "اللغات", value: "عربي - إنجليزي" },
];

export default function DoctorSection() {
  return (
    <section id="doctor" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A2B45] mb-4">
            نبذة عن الطبيب
          </h2>

          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#1A6BCC]" />
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Doctor Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-72 h-80 rounded-3xl bg-gradient-to-br from-[#1A6BCC]/15 to-[#1A6BCC]/5 border-4 border-white shadow-2xl flex items-center justify-center">
                <Image
                  src="/doctor.png"
                  alt="Doctor"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Experience badge */}
              <div className="absolute -top-4 -left-4 bg-[#1A6BCC] text-white rounded-2xl px-4 py-2 text-center shadow-lg">
                <p className="text-2xl font-black">٢٠+</p>
                <p className="text-xs">سنة خبرة</p>
              </div>
            </div>
          </div>

          {/* Doctor Info */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#1A6BCC]/10 text-[#1A6BCC] text-sm font-semibold mb-4">
              استشاري أول
            </span>

            <h3 className="text-3xl font-extrabold text-[#1A2B45] mb-2">
              د. أحمد محمد السيد
            </h3>

            <p className="text-[#1A6BCC] font-semibold text-lg mb-5">
              استشاري جراحة القلب والأوعية الدموية
            </p>

            <p className="text-[#6B7A92] leading-relaxed mb-8">
              حاصل على درجة الدكتوراه في طب القلب من جامعة القاهرة، وزميل الكلية
              الأمريكية لجراحة القلب. يتمتع بخبرة تزيد على ٢٠ عاماً في تشخيص
              وعلاج أمراض القلب والشرايين، وقد أجرى أكثر من ٣٠٠٠ عملية قلب مفتوح
              بنسبة نجاح تتجاوز ٩٨٪.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {DOCTOR_STATS.map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-2xl bg-[#F8FAFB] border border-[#E2E8EF]"
                >
                  <p className="text-xs text-[#6B7A92] mb-1">{item.label}</p>
                  <p className="font-bold text-[#1A2B45]">{item.value}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1A6BCC] text-white font-semibold hover:bg-[#155bb5] transition-all shadow-md shadow-[#1A6BCC]/30"
            >
              <Calendar className="w-5 h-5" /> احجز مع الدكتور
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
