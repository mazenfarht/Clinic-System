import { Stethoscope, MapPin, Phone, Mail, Clock } from "lucide-react";
import { NAV_LINKS, SERVICES } from "./constants";

const FOOTER_CONTACT = [
  { icon: <MapPin className="w-4 h-4" />, text: "شارع التحرير، الدقي، الجيزة" },
  { icon: <Phone className="w-4 h-4" />, text: "٠٢ - ٣٣٣٦٠٠١٠" },
  { icon: <Mail className="w-4 h-4" />, text: "info@clinicq.com" },
  { icon: <Clock className="w-4 h-4" />, text: "الأحد – الخميس: ٨ص – ٨م" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A2B45] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#1A6BCC] flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold">
                Clinic<span className="text-[#1A6BCC]">Q</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              عيادة متخصصة تقدم رعاية صحية متكاملة بمعايير عالمية وأسعار في
              متناول الجميع.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">روابط سريعة</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 text-sm hover:text-[#1A6BCC] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">خدماتنا</h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="text-white/60 text-sm hover:text-[#1A6BCC] transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4 text-white">تواصل معنا</h4>
            <ul className="space-y-3">
              {FOOTER_CONTACT.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-2 text-white/60 text-sm"
                >
                  <span className="text-[#1A6BCC] mt-0.5 flex-shrink-0">
                    {item.icon}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} ClinicQ. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-5">
            <a
              href="#"
              className="text-white/50 text-xs hover:text-white/80 transition-colors"
            >
              سياسة الخصوصية
            </a>
            <a
              href="#"
              className="text-white/50 text-xs hover:text-white/80 transition-colors"
            >
              الشروط والأحكام
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
