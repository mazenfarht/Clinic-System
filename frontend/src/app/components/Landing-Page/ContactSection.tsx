import { MapPin, Phone, Mail, Clock } from "lucide-react";

const CONTACT_ITEMS = [
  {
    icon: <MapPin className="w-6 h-6 text-[#1A6BCC]" />,
    label: "العنوان",
    value: "شارع التحرير، الدقي، الجيزة، مصر",
  },
  {
    icon: <Phone className="w-6 h-6 text-[#1A6BCC]" />,
    label: "الهاتف",
    value: "٠٢ - ٣٣٣٦٠٠١٠",
  },
  {
    icon: <Mail className="w-6 h-6 text-[#1A6BCC]" />,
    label: "البريد الإلكتروني",
    value: "info@clinicq.com",
  },
  {
    icon: <Clock className="w-6 h-6 text-[#1A6BCC]" />,
    label: "ساعات العمل",
    value: "الأحد – الخميس: ٨ص – ٨م",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A2B45] mb-4">
            معلومات التواصل
          </h2>

          <p className="text-[#6B7A92] text-lg max-w-2xl mx-auto leading-relaxed">
            نحن هنا لخدمتك. تواصل معنا عبر أي من القنوات التالية.
          </p>

          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#1A6BCC]" />
        </div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONTACT_ITEMS.map((item) => (
            <div
              key={item.label}
              className="p-6 rounded-3xl bg-[#F8FAFB] border border-[#E2E8EF] text-center hover:border-[#1A6BCC]/30 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#1A6BCC]/10 flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>

              <p className="text-xs text-[#6B7A92] mb-1 font-medium">
                {item.label}
              </p>

              <p className="font-bold text-[#1A2B45] text-sm leading-snug">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
