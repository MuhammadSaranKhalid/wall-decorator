import type { CheckoutStep } from "./checkout-flow"
import { Check } from "lucide-react"

interface CheckoutStepperProps {
  currentStep: CheckoutStep
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const steps = [
    { id: "shipping", title: "Shipping", description: "Delivery information" },
    { id: "payment", title: "Payment", description: "Payment method" },
    { id: "review", title: "Review", description: "Review your order" },
  ]

  const getStepStatus = (stepId: string) => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep)
    const stepIndex = steps.findIndex((step) => step.id === stepId)

    if (stepIndex < currentIndex) return "completed"
    if (stepIndex === currentIndex) return "current"
    return "upcoming"
  }

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const status = getStepStatus(step.id)

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  status === "completed"
                    ? "bg-[#9A7B4F] text-white"
                    : status === "current"
                      ? "bg-[#4A3F35] text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {status === "completed" ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              <div className="mt-2 text-center">
                <p className={`text-sm font-medium ${status === "current" ? "text-[#2E2C2A]" : "text-gray-500"}`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-400">{step.description}</p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-4 ${status === "completed" ? "bg-[#9A7B4F]" : "bg-gray-200"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
