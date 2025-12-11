export const ItemGenerator = () => {
  const [itemName, setItemName] = useState('custom_item')
  const [label, setLabel] = useState('Custom Item')
  const [description, setDescription] = useState('')
  const [weight, setWeight] = useState(1.0)
  const [price, setPrice] = useState(100)
  const [type, setType] = useState(1)
  const [rarity, setRarity] = useState(1)
  const [isUsable, setIsUsable] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)
  const [stackable, setStackable] = useState(true)
  const [stackSize, setStackSize] = useState(10)
  const [isDestroyed, setIsDestroyed] = useState(false)
  const [hasDurability, setHasDurability] = useState(false)
  const [durabilityDays, setDurabilityDays] = useState(1)
  const [closeUi, setCloseUi] = useState(false)
  const [metalic, setMetalic] = useState(false)
  const [copied, setCopied] = useState(false)

  const typeNames = {
    1: 'Consumable',
    2: 'Weapon',
    3: 'Tool',
    4: 'Crafting Ingredient',
    5: 'Collectable',
    6: 'Junk',
    7: 'Unknown/Special',
    8: 'Evidence',
    9: 'Ammo',
    10: 'Container',
    11: 'Gem',
    12: 'Paraphernalia',
    13: 'Wearable',
    14: 'Contraband',
    15: 'Gang Chain',
    16: 'Weapon Attachment',
    17: 'Schematic'
  }

  const rarityNames = {
    0: 'Nothing',
    1: 'Common',
    2: 'Uncommon',
    3: 'Rare',
    4: 'Epic',
    5: 'Labor Objective'
  }

  const generateLuaCode = () => {
    let code = `{\n`
    code += `\tname = '${itemName}',\n`
    code += `\tlabel = '${label}',\n`

    if (description) {
      code += `\tdescription = '${description}',\n`
    }

    code += `\tprice = ${price},\n`
    code += `\tweight = ${weight},\n`
    code += `\ttype = ${type},\n`
    code += `\trarity = ${rarity},\n`
    code += `\n`
    code += `\tisUsable = ${isUsable ? 'true' : 'false'},\n`
    code += `\tisRemoved = ${isRemoved ? 'true' : 'false'},\n`
    code += `\tisStackable = ${stackable ? stackSize : 'false'},\n`
    code += `\tisDestroyed = ${isDestroyed ? 'true' : 'false'},\n`
    code += `\tcloseUi = ${closeUi ? 'true' : 'false'},\n`
    code += `\tmetalic = ${metalic ? 'true' : 'false'},\n`

    if (hasDurability) {
      const durabilitySeconds = durabilityDays * 24 * 60 * 60
      code += `\n`
      code += `\t-- Durability: ${durabilityDays} day${durabilityDays !== 1 ? 's' : ''}\n`
      code += `\tdurability = (60 * 60 * 24 * ${durabilityDays}),\n`
    } else {
      code += `\tdurability = 0,\n`
    }

    code += `}`

    return code
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateLuaCode())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 border dark:border-zinc-950/80 rounded-xl not-prose space-y-4">
      <h3 className="text-lg font-bold text-blue-500 mb-4">
        Item Definition Generator
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
            Item Name (lowercase, no spaces)
          </label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
            className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
            placeholder="custom_item"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
            Display Label
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
            placeholder="Custom Item"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
          Description (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
          placeholder="Item description..."
          rows="2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
            Weight: {weight} kg
          </label>
          <input
            type="range"
            min="0"
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
            min="0"
            max="10000"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-950/20 rounded-lg appearance-none cursor-pointer dark:bg-white/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
          >
            {Object.entries(typeNames).map(([value, name]) => (
              <option key={value} value={value}>
                {value} - {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
            Rarity
          </label>
          <select
            value={rarity}
            onChange={(e) => setRarity(parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
          >
            {Object.entries(rarityNames).map(([value, name]) => (
              <option key={value} value={value}>
                {value} - {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="border-t border-zinc-300 dark:border-zinc-700 pt-4">
        <h4 className="text-sm font-semibold text-zinc-950/70 dark:text-white/70 mb-3">
          Item Properties
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center space-x-2 text-sm text-zinc-950/70 dark:text-white/70">
            <input
              type="checkbox"
              checked={isUsable}
              onChange={(e) => setIsUsable(e.target.checked)}
              className="rounded"
            />
            <span>Usable</span>
          </label>

          <label className="flex items-center space-x-2 text-sm text-zinc-950/70 dark:text-white/70">
            <input
              type="checkbox"
              checked={isRemoved}
              onChange={(e) => setIsRemoved(e.target.checked)}
              className="rounded"
            />
            <span>Removed on Use</span>
          </label>

          <label className="flex items-center space-x-2 text-sm text-zinc-950/70 dark:text-white/70">
            <input
              type="checkbox"
              checked={isDestroyed}
              onChange={(e) => setIsDestroyed(e.target.checked)}
              className="rounded"
            />
            <span>Destroyed at 0 Durability</span>
          </label>

          <label className="flex items-center space-x-2 text-sm text-zinc-950/70 dark:text-white/70">
            <input
              type="checkbox"
              checked={closeUi}
              onChange={(e) => setCloseUi(e.target.checked)}
              className="rounded"
            />
            <span>Close UI on Use</span>
          </label>

          <label className="flex items-center space-x-2 text-sm text-zinc-950/70 dark:text-white/70">
            <input
              type="checkbox"
              checked={metalic}
              onChange={(e) => setMetalic(e.target.checked)}
              className="rounded"
            />
            <span>Metallic</span>
          </label>

          <label className="flex items-center space-x-2 text-sm text-zinc-950/70 dark:text-white/70">
            <input
              type="checkbox"
              checked={stackable}
              onChange={(e) => setStackable(e.target.checked)}
              className="rounded"
            />
            <span>Stackable</span>
          </label>
        </div>
      </div>

      {stackable && (
        <div>
          <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
            Stack Size: {stackSize}
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={stackSize}
            onChange={(e) => setStackSize(parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-950/20 rounded-lg appearance-none cursor-pointer dark:bg-white/20"
          />
        </div>
      )}

      <div className="border-t border-zinc-300 dark:border-zinc-700 pt-4">
        <label className="flex items-center space-x-2 text-sm text-zinc-950/70 dark:text-white/70 mb-3">
          <input
            type="checkbox"
            checked={hasDurability}
            onChange={(e) => setHasDurability(e.target.checked)}
            className="rounded"
          />
          <span className="font-semibold">Has Durability/Decay</span>
        </label>

        {hasDurability && (
          <div>
            <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
              Durability: {durabilityDays} day{durabilityDays !== 1 ? 's' : ''}
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={durabilityDays}
              onChange={(e) => setDurabilityDays(parseInt(e.target.value))}
              className="w-full h-2 bg-zinc-950/20 rounded-lg appearance-none cursor-pointer dark:bg-white/20"
            />
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Time until item fully degrades: {durabilityDays * 24} hours ({durabilityDays * 24 * 60 * 60} seconds)
            </p>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-2">
          Generated Lua Code:
        </label>
        <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded border border-zinc-300 dark:border-zinc-700 overflow-auto text-xs font-mono max-h-80">
          {generateLuaCode()}
        </pre>
      </div>

      <button
        onClick={copyToClipboard}
        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors"
      >
        {copied ? '✓ Copied to Clipboard!' : 'Copy to Clipboard'}
      </button>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded p-3">
        <p className="text-xs text-amber-900 dark:text-amber-300">
          <strong>Note:</strong> This generates the item definition structure. You'll need to register this item
          with the Items component and add the image file to <code>mythic-inventory/ui/assets/items/</code>
        </p>
      </div>
    </div>
  )
}
