import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "The glass art piece I ordered exceeded my expectations. The quality is outstanding and it's become the centerpiece of my living room.",
      location: "New York, NY",
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment:
        "Custom wooden panel was exactly what I envisioned. The craftsmanship is incredible and the team was so helpful throughout the process.",
      location: "San Francisco, CA",
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      comment:
        "I've ordered multiple pieces and each one is unique and beautiful. The attention to detail is remarkable.",
      location: "Austin, TX",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#2E2C2A] mb-4">What Our Customers Say</h2>
          <p className="text-lg text-[#777] max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg bg-[#F8F6F3]">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#9A7B4F] text-[#9A7B4F]" />
                  ))}
                </div>
                <p className="text-[#2E2C2A] mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold text-[#2E2C2A]">{testimonial.name}</p>
                  <p className="text-sm text-[#777]">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
