import { SERVICES } from "./constants";

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A2B45] mb-4">
            خدماتنا الطبية
          </h2>

          <p className="text-[#6B7A92] text-lg max-w-2xl mx-auto leading-relaxed">
            نقدم مجموعة شاملة من الخدمات الطبية المتخصصة تحت سقف واحد لراحتك
            وسهولة وصولك إلى الرعاية التي تحتاجها.
          </p>

          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#1A6BCC]" />
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="p-7 rounded-3xl bg-white border border-[#E2E8EF] hover:border-[#1A6BCC]/40 hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#1A6BCC]/10 flex items-center justify-center mb-5 text-[#1A6BCC] group-hover:bg-[#1A6BCC] group-hover:text-white transition-all">
                {s.icon}
              </div>

              <h3 className="text-lg font-bold text-[#1A2B45] mb-2">
                {s.title}
              </h3>

              <p className="text-[#6B7A92] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
