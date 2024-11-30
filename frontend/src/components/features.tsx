import { Calendar, Users, TrendingUp, Shield } from 'lucide-react'

const features = [
  {
    name: 'Easy Scheduling',
    description: 'Effortlessly plan and organize your events with our intuitive calendar interface.',
    icon: Calendar,
  },
  {
    name: 'Attendee Management',
    description: 'Manage your guest list, send invitations, and track RSVPs all in one place.',
    icon: Users,
  },
  {
    name: 'Analytics',
    description: 'Gain valuable insights into your events with comprehensive analytics and reporting.',
    icon: TrendingUp,
  },
  {
    name: 'Secure Platform',
    description: 'Rest easy knowing your event data is protected with our state-of-the-art security measures.',
    icon: Shield,
  },
]

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Powerful Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to manage successful events
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform provides all the tools you need to plan, organize, and execute flawless events of any size.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}


