import { Eye, Heart, Shield } from "lucide-react";

const ABOUT_CARDS = [
  {
    icon: <Eye className="w-8 h-8 text-[#1A6BCC]" />,
    title: "رؤيتنا",
    desc: "أن نكون المرجع الطبي الأول والأكثر ثقة في المنطقة، نقدم رعاية صحية متكاملة تجمع بين التقنية الحديثة والإنسانية.",
  },
  {
    icon: <Heart className="w-8 h-8 text-[#1A6BCC]" />,
    title: "رسالتنا",
    desc: "تقديم خدمات طبية متميزة بأسعار في متناول الجميع، مع الحرص على كرامة المريض وراحته في بيئة آمنة ومريحة.",
  },
  {
    icon: <Shield className="w-8 h-8 text-[#1A6BCC]" />,
    title: "قيمنا",
    desc: "الأمانة والنزاهة والابتكار والتميز في تقديم الرعاية الصحية مع احترام خصوصية كل مريض وحقوقه كاملة.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A2B45] mb-4">
            عن عيادة كلينيك كيو
          </h2>

          <p className="text-[#6B7A92] text-lg max-w-2xl mx-auto leading-relaxed">
            نؤمن بأن الرعاية الصحية الجيدة هي حق لكل إنسان. نسعى دائماً لتقديم
            أفضل الخدمات الطبية بأعلى معايير الجودة والسلامة.
          </p>

          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#1A6BCC]" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {ABOUT_CARDS.map((card) => (
            <div
              key={card.title}
              className="p-8 rounded-3xl bg-[#F8FAFB] border border-[#E2E8EF] hover:border-[#1A6BCC]/30 hover:shadow-lg transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#1A6BCC]/10 flex items-center justify-center mb-5 group-hover:bg-[#1A6BCC]/20 transition-colors">
                {card.icon}
              </div>

              <h3 className="text-xl font-bold text-[#1A2B45] mb-3">
                {card.title}
              </h3>

              <p className="text-[#6B7A92] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
