export const ItemGenerator = () => {
  const [itemName, setItemName] = useState('custom_item')
  const [label, setLabel] = useState('Custom Item')
  const [weight, setWeight] = useState(1.0)
  const [price, setPrice] = useState(100)
  const [isStackable, setIsStackable] = useState(true)
  const [isCloset, setIsCloset] = useState(false)
  const [hasDurability, setHasDurability] = useState(false)
  const [maxDurability, setMaxDurability] = useState(100)
  const [isMetallic, setIsMetallic] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateLuaCode = () => {
    let code = `['${itemName}'] = {\n`
    code += `\tlabel = '${label}',\n`
    code += `\tweight = ${weight},\n`
    code += `\tprice = ${price},\n`
    code += `\tisStackable = ${isStackable ? 'true' : 'false'},\n`
    code += `\tisCloset = ${isCloset ? 'true' : 'false'},\n`

    if (hasDurability) {
      code += `\tdurability = {\n`
      code += `\t\tmax = ${maxDurability},\n`
      code += `\t\tdegradeOnUse = true,\n`
      code += `\t},\n`
    }

    code += `\tmetalic = ${isMetallic ? 'true' : 'false'},\n`
    code += `},`

    return code
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateLuaCode())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 border dark:border-zinc-950/80 rounded-xl not-prose space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
            Item Name
          </label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
            Label
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
            Weight: {weight}
          </label>
          <input
            type="range"
            min="0.1"
            max="50"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            className="w-full h-2 bg-zinc-950/20 rounded-lg appearance-none cursor-pointer dark:bg-white/20"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
            Price: ${price}
          </label>
          <input
            type="range"
            min="1"
            max="10000"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-950/20 rounded-lg appearance-none cursor-pointer dark:bg-white/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center space-x-2 text-sm text-zinc-950/70 dark:text-white/70">
          <input
            type="checkbox"
            checked={isStackable}
            onChange={(e) => setIsStackable(e.target.checked)}
            className="rounded"
          />
          <span>Stackable</span>
        </label>

        <label className="flex items-center space-x-2 text-sm text-zinc-950/70 dark:text-white/70">
          <input
            type="checkbox"
            checked={isCloset}
            onChange={(e) => setIsCloset(e.target.checked)}
            className="rounded"
          />
          <span>Closet Item</span>
        </label>

        <label className="flex items-center space-x-2 text-sm text-zinc-950/70 dark:text-white/70">
          <input
            type="checkbox"
            checked={hasDurability}
            onChange={(e) => setHasDurability(e.target.checked)}
            className="rounded"
          />
          <span>Has Durability</span>
        </label>

        <label className="flex items-center space-x-2 text-sm text-zinc-950/70 dark:text-white/70">
          <input
            type="checkbox"
            checked={isMetallic}
            onChange={(e) => setIsMetallic(e.target.checked)}
            className="rounded"
          />
          <span>Metallic</span>
        </label>
      </div>

      {hasDurability && (
        <div>
          <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
            Max Durability: {maxDurability}
          </label>
          <input
            type="range"
            min="10"
            max="1000"
            value={maxDurability}
            onChange={(e) => setMaxDurability(parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-950/20 rounded-lg appearance-none cursor-pointer dark:bg-white/20"
          />
        </div>
      )}

      <div>
        <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-2">
          Generated Lua Code:
        </label>
        <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded border border-zinc-300 dark:border-zinc-700 overflow-auto text-xs font-mono">
          {generateLuaCode()}
        </pre>
      </div>

      <button
        onClick={copyToClipboard}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors"
      >
        {copied ? '✓ Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  )
}
