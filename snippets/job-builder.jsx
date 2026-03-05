export const JobBuilder = () => {
  const [jobId, setJobId] = useState('custom_job')
  const [jobName, setJobName] = useState('Custom Job')
  const [jobType, setJobType] = useState('Company')
  const [salary, setSalary] = useState(200)
  const [grades, setGrades] = useState([
    { _key: 0, id: 'employee', name: 'Employee', level: 1, perms: { JOB_STORAGE: true } },
    { _key: 1, id: 'manager', name: 'Manager', level: 4, perms: { JOB_STORAGE: true, JOB_CRAFTING: true, JOB_HIRE: true } },
    { _key: 2, id: 'owner', name: 'Owner', level: 99, perms: { JOB_MANAGEMENT: true, JOB_MANAGE_EMPLOYEES: true, JOB_HIRE: true, JOB_FIRE: true, JOB_STORAGE: true, JOB_CRAFTING: true } }
  ])
  const [copied, setCopied] = useState(false)
  const [nextKey, setNextKey] = useState(3)

  const availablePerms = [
    { key: 'JOB_STORAGE', label: 'Storage' },
    { key: 'JOB_CRAFTING', label: 'Crafting' },
    { key: 'JOB_HIRE', label: 'Hire' },
    { key: 'JOB_FIRE', label: 'Fire' },
    { key: 'JOB_MANAGE_EMPLOYEES', label: 'Manage Employees' },
    { key: 'JOB_MANAGEMENT', label: 'Management' },
  ]

  const addGrade = () => {
    setGrades([...grades, {
      _key: nextKey,
      id: `grade_${nextKey}`,
      name: `Grade ${nextKey}`,
      level: 1,
      perms: { JOB_STORAGE: true }
    }])
    setNextKey(nextKey + 1)
  }

  const removeGrade = (_key) => {
    if (grades.length > 1) {
      setGrades(grades.filter(g => g._key !== _key))
    }
  }

  const updateGrade = (_key, field, value) => {
    setGrades(grades.map(g => g._key === _key ? { ...g, [field]: value } : g))
  }

  const togglePerm = (_key, permKey) => {
    setGrades(grades.map(g => {
      if (g._key !== _key) return g
      const newPerms = { ...g.perms }
      if (newPerms[permKey]) {
        delete newPerms[permKey]
      } else {
        newPerms[permKey] = true
      }
      return { ...g, perms: newPerms }
    }))
  }

  const generateLuaCode = () => {
    const timestamp = Math.floor(Date.now() / 1000)
    let code = `table.insert(_defaultJobData, {\n`
    code += `    Type = '${jobType}',\n`
    code += `    LastUpdated = ${timestamp},\n`
    code += `    Id = '${jobId}',\n`
    code += `    Name = '${jobName}',\n`
    code += `    Salary = ${salary},\n`
    code += `    SalaryTier = 1,\n`
    code += `    Grades = {\n`

    const sorted = [...grades].sort((a, b) => a.level - b.level)
    sorted.forEach(grade => {
      const permEntries = Object.keys(grade.perms).filter(k => grade.perms[k])
      code += `        {\n`
      code += `            Id = '${grade.id}',\n`
      code += `            Name = '${grade.name}',\n`
      code += `            Level = ${grade.level},\n`
      if (permEntries.length > 0) {
        code += `            Permissions = {\n`
        permEntries.forEach(p => {
          code += `                ${p} = true,\n`
        })
        code += `            },\n`
      } else {
        code += `            Permissions = {},\n`
      }
      code += `        },\n`
    })

    code += `    }\n`
    code += `})`
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
        Job Configuration Builder
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
            Job ID (lowercase, no spaces)
          </label>
          <input
            type="text"
            value={jobId}
            onChange={(e) => setJobId(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
            className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
            placeholder="custom_job"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
            Job Name
          </label>
          <input
            type="text"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
            placeholder="Custom Job"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
            Type
          </label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
          >
            <option value="Company">Company</option>
            <option value="Government">Government</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-1">
            Salary: ${salary}
          </label>
          <input
            type="range"
            min="50"
            max="1000"
            step="5"
            value={salary}
            onChange={(e) => setSalary(parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-950/20 rounded-lg appearance-none cursor-pointer dark:bg-white/20"
          />
        </div>
      </div>

      <div className="border-t border-zinc-300 dark:border-zinc-700 pt-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-semibold text-zinc-950/70 dark:text-white/70">
            Grades
          </h4>
          <button
            onClick={addGrade}
            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm font-medium transition-colors"
          >
            + Add Grade
          </button>
        </div>

        {grades.map((grade) => (
          <div
            key={grade._key}
            className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded mb-3 border border-zinc-300 dark:border-zinc-700"
          >
            <div className="grid grid-cols-4 gap-2 items-end mb-2">
              <div>
                <label className="block text-xs text-zinc-950/50 dark:text-white/50 mb-1">
                  Grade ID
                </label>
                <input
                  type="text"
                  value={grade.id}
                  onChange={(e) => updateGrade(grade._key, 'id', e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                  className="w-full px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
                  placeholder="employee"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-950/50 dark:text-white/50 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={grade.name}
                  onChange={(e) => updateGrade(grade._key, 'name', e.target.value)}
                  className="w-full px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
                  placeholder="Employee"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-950/50 dark:text-white/50 mb-1">
                  Level
                </label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={grade.level}
                  onChange={(e) => updateGrade(grade._key, 'level', parseInt(e.target.value) || 1)}
                  className="w-full px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
                />
              </div>
              <button
                onClick={() => removeGrade(grade._key)}
                disabled={grades.length === 1}
                className="px-2 py-1 bg-red-500 hover:bg-red-600 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white rounded text-sm transition-colors"
              >
                Remove
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {availablePerms.map((perm) => (
                <label
                  key={perm.key}
                  className="flex items-center space-x-1 text-xs text-zinc-950/60 dark:text-white/60 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={!!grade.perms[perm.key]}
                    onChange={() => togglePerm(grade._key, perm.key)}
                    className="rounded"
                  />
                  <span>{perm.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
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
          <strong>Note:</strong> Place this in a new file under{' '}
          <code>mythic-jobs/config/defaultJobs/</code>. The file needs access to the{' '}
          <code>_defaultJobData</code> global table. Level determines grade hierarchy — higher levels
          have more authority. Owner should always be Level 99.
        </p>
      </div>
    </div>
  )
}
