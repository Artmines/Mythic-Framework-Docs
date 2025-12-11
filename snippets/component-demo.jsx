export const ComponentDemo = () => {
  const [activeTab, setActiveTab] = useState('register')
  const [componentName, setComponentName] = useState('MyComponent')
  const [methodName, setMethodName] = useState('DoSomething')
  const [fetchComponent, setFetchComponent] = useState('Inventory')
  const [extendComponent, setExtendComponent] = useState('Jobs')
  const [extendMethod, setExtendMethod] = useState('NewMethod')
  const [components] = useState({
    Inventory: { methods: ['AddItem', 'RemoveItem', 'GetInventory'] },
    Jobs: { methods: ['SetJob', 'ClockIn', 'ClockOut'] },
    Vehicles: { methods: ['Spawn', 'Delete', 'GetKeys'] }
  })

  const generateRegisterCode = () => {
    return `-- Register a new component
exports('RegisterComponent', function(component, data)
    COMPONENTS['${componentName}'] = data
end)

-- Example registration:
exports['mythic-base']:RegisterComponent('${componentName}', {
    ${methodName} = function(self, param)
        print('${methodName} called with:', param)
        return true
    end,
})`
  }

  const generateFetchCode = () => {
    return `-- Fetch an existing component
local component = exports['mythic-base']:FetchComponent('${fetchComponent}')

-- Use the component:
if component then
    ${components[fetchComponent]?.methods[0] ? `component:${components[fetchComponent].methods[0]}(...)` : 'component:SomeMethod(...)'}
end`
  }

  const generateExtendCode = () => {
    return `-- Extend an existing component
exports['mythic-base']:ExtendComponent('${extendComponent}', {
    ${extendMethod} = function(self, param)
        print('New method ${extendMethod} added to ${extendComponent}')
        -- Your custom logic here
        return param * 2
    end,
})

-- Now you can use the new method:
local ${extendComponent.toLowerCase()} = COMPONENTS.${extendComponent}
${extendComponent.toLowerCase()}:${extendMethod}(10) -- Returns 20`
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'register':
        return (
          <div className="space-y-4">
            <p className="text-sm text-zinc-950/70 dark:text-white/70">
              <strong>RegisterComponent</strong> creates a new component or overrides an existing one.
              Use this when creating a new resource with its own component.
            </p>
            <div>
              <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
                Component Name:
              </label>
              <input
                type="text"
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
                Method Name:
              </label>
              <input
                type="text"
                value={methodName}
                onChange={(e) => setMethodName(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
              />
            </div>
            <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded border border-zinc-300 dark:border-zinc-700 overflow-auto text-xs font-mono">
              {generateRegisterCode()}
            </pre>
          </div>
        )
      case 'fetch':
        return (
          <div className="space-y-4">
            <p className="text-sm text-zinc-950/70 dark:text-white/70">
              <strong>FetchComponent</strong> retrieves an existing component from COMPONENTS table.
              Use this to access functionality from other resources.
            </p>
            <div>
              <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
                Component to Fetch:
              </label>
              <select
                value={fetchComponent}
                onChange={(e) => setFetchComponent(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
              >
                {Object.keys(components).map(comp => (
                  <option key={comp} value={comp}>{comp}</option>
                ))}
              </select>
            </div>
            <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded border border-zinc-300 dark:border-zinc-700">
              <div className="text-green-600 dark:text-green-400 text-sm font-semibold mb-2">
                Available Methods:
              </div>
              {components[fetchComponent]?.methods.map((method, idx) => (
                <div key={idx} className="text-xs font-mono text-zinc-950/70 dark:text-white/70 py-1">
                  • {method}()
                </div>
              ))}
            </div>
            <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded border border-zinc-300 dark:border-zinc-700 overflow-auto text-xs font-mono">
              {generateFetchCode()}
            </pre>
          </div>
        )
      case 'extend':
        return (
          <div className="space-y-4">
            <p className="text-sm text-zinc-950/70 dark:text-white/70">
              <strong>ExtendComponent</strong> adds new methods to an existing component without overriding it.
              Perfect for adding custom functionality to core systems.
            </p>
            <div>
              <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
                Component to Extend:
              </label>
              <select
                value={extendComponent}
                onChange={(e) => setExtendComponent(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
              >
                {Object.keys(components).map(comp => (
                  <option key={comp} value={comp}>{comp}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
                New Method Name:
              </label>
              <input
                type="text"
                value={extendMethod}
                onChange={(e) => setExtendMethod(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
              />
            </div>
            <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded border border-zinc-300 dark:border-zinc-700 overflow-auto text-xs font-mono">
              {generateExtendCode()}
            </pre>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-6 border dark:border-zinc-950/80 rounded-xl not-prose">
      <h3 className="text-xl font-bold text-blue-500 mb-4">
        Component System Interactive Demo
      </h3>

      <div className="flex gap-2 mb-6 border-b border-zinc-300 dark:border-zinc-700">
        <button
          onClick={() => setActiveTab('register')}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'register'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-zinc-950/70 dark:text-white/70 hover:text-blue-500'
          }`}
        >
          RegisterComponent
        </button>
        <button
          onClick={() => setActiveTab('fetch')}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'fetch'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-zinc-950/70 dark:text-white/70 hover:text-blue-500'
          }`}
        >
          FetchComponent
        </button>
        <button
          onClick={() => setActiveTab('extend')}
          className={`px-4 py-2 text-sm font-semibold transition-colors ${
            activeTab === 'extend'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-zinc-950/70 dark:text-white/70 hover:text-blue-500'
          }`}
        >
          ExtendComponent
        </button>
      </div>

      {renderTab()}

      <div className="mt-6 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">
        <div className="text-amber-800 dark:text-amber-400 text-sm font-semibold mb-2">
          Key Differences:
        </div>
        <ul className="text-xs text-amber-900/80 dark:text-amber-300/80 space-y-1 pl-4">
          <li><strong>Register:</strong> Creates new component or completely replaces existing</li>
          <li><strong>Fetch:</strong> Gets reference to existing component for use</li>
          <li><strong>Extend:</strong> Adds methods to existing component without replacing it</li>
        </ul>
      </div>
    </div>
  )
}
