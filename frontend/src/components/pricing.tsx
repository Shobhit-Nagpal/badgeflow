import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"

const tiers = [
  {
    name: 'Basic',
    id: 'tier-basic',
    href: '#',
    priceMonthly: '$29',
    description: 'Perfect for small to medium-sized events',
    features: [
      'Up to 100 attendees',
      'Basic event customization',
      'Email support',
      'Analytics dashboard',
    ],
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '#',
    priceMonthly: '$99',
    description: 'For large-scale events and power users',
    features: [
      'Unlimited attendees',
      'Advanced event customization',
      'Priority support',
      'Advanced analytics',
      'Custom branding',
      'API access',
    ],
  },
]

export function Pricing() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Choose the perfect plan for your needs
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Whether you're planning a small gathering or a large conference, we have a plan that fits your requirements.
        </p>
        <div className="mt-16 flex justify-center">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="rounded-3xl bg-white/5 p-8 ring-1 ring-inset ring-white/10 xl:p-10"
              >
                <h3 id={tier.id} className="text-2xl font-bold leading-7 text-white">
                  {tier.name}
                </h3>
                <p className="mt-4 text-sm leading-6 text-gray-300">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">{tier.priceMonthly}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-300">/month</span>
                </p>
                <Button asChild className="mt-6 w-full">
                  <a href={tier.href}>Get started</a>
                </Button>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


