import { Palette, Hammer, Heart } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: Palette,
      title: "Artistic Vision",
      description: "Each piece is designed with artistic flair, combining modern aesthetics with timeless appeal.",
    },
    {
      icon: Hammer,
      title: "Expert Craftsmanship",
      description: "Our skilled artisans use traditional techniques with premium glass and wood materials.",
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every item is crafted with passion and attention to detail, ensuring unique character.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#2E2C2A] mb-4">Why Choose ArtisanWall?</h2>
          <p className="text-lg text-[#777] max-w-2xl mx-auto">
            We believe that your walls deserve more than ordinary decoration. Our commitment to quality and artistry
            sets us apart.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-[#F8F6F3] hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#9A7B4F] rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#2E2C2A] mb-3">{feature.title}</h3>
              <p className="text-[#777]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
