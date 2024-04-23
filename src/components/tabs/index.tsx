import { Tab } from '@headlessui/react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs({ components }: { components: Array<{component : React.ReactNode, title: string}> }) {
  return (
    <div className="w-full px-2 xl:px-56">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-secondary p-1">
          {components.map(({ title }) => (
            <Tab
              key={title}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-dark shadow'
                    : 'text-dark hover:text-c-gray-300'
                )
              }
            >
              {title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(components).map(({ component }, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2  focus:outline-none focus:ring-2'
              )}
            >
              {component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
