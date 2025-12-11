export const JobBuilder = () => {
  const [jobId, setJobId] = useState('custom_job')
  const [jobName, setJobName] = useState('Custom Job')
  const [grades, setGrades] = useState([
    { id: 0, name: 'Employee', label: 'Employee', salary: 500 },
    { id: 1, name: 'Supervisor', label: 'Supervisor', salary: 750 },
    { id: 2, name: 'Manager', label: 'Manager', salary: 1000 }
  ])
  const [workplaceX, setWorkplaceX] = useState(0)
  const [workplaceY, setWorkplaceY] = useState(0)
  const [workplaceZ, setWorkplaceZ] = useState(0)
  const [copied, setCopied] = useState(false)

  const addGrade = () => {
    const newId = Math.max(...grades.map(g => g.id), -1) + 1
    setGrades([...grades, {
      id: newId,
      name: `Grade${newId}`,
      label: `Grade ${newId}`,
      salary: 500
    }])
  }

  const removeGrade = (id) => {
    if (grades.length > 1) {
      setGrades(grades.filter(g => g.id !== id))
    }
  }

  const updateGrade = (id, field, value) => {
    setGrades(grades.map(g => g.id === id ? { ...g, [field]: value } : g))
  }

  const generateLuaCode = () => {
    let code = `['${jobId}'] = {\n`
    code += `\tName = '${jobName}',\n`
    code += `\tID = '${jobId}',\n`
    code += `\tWorkplaces = {\n`
    code += `\t\t{\n`
    code += `\t\t\tcoords = vector3(${workplaceX}, ${workplaceY}, ${workplaceZ}),\n`
    code += `\t\t\tradius = 5.0,\n`
    code += `\t\t\tbanner = 'https://example.com/banner.png',\n`
    code += `\t\t},\n`
    code += `\t},\n`
    code += `\tGrades = {\n`

    grades.sort((a, b) => a.id - b.id).forEach(grade => {
      code += `\t\t[${grade.id}] = {\n`
      code += `\t\t\tName = '${grade.name}',\n`
      code += `\t\t\tLabel = '${grade.label}',\n`
      code += `\t\t\tSalary = ${grade.salary},\n`
      code += `\t\t\tPermissions = {},\n`
      code += `\t\t},\n`
    })

    code += `\t},\n`
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
            Job ID
          </label>
          <input
            type="text"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
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
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-zinc-950/70 dark:text-white/70 mb-2">
          Workplace Coordinates
        </label>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-zinc-950/50 dark:text-white/50 mb-1">X</label>
            <input
              type="number"
              value={workplaceX}
              onChange={(e) => setWorkplaceX(parseFloat(e.target.value) || 0)}
              className="w-full px-2 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-950/50 dark:text-white/50 mb-1">Y</label>
            <input
              type="number"
              value={workplaceY}
              onChange={(e) => setWorkplaceY(parseFloat(e.target.value) || 0)}
              className="w-full px-2 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-950/50 dark:text-white/50 mb-1">Z</label>
            <input
              type="number"
              value={workplaceZ}
              onChange={(e) => setWorkplaceZ(parseFloat(e.target.value) || 0)}
              className="w-full px-2 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-zinc-950/70 dark:text-white/70">
            Job Grades
          </label>
          <button
            onClick={addGrade}
            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm font-medium transition-colors"
          >
            + Add Grade
          </button>
        </div>

        {grades.map((grade) => (
          <div
            key={grade.id}
            className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded mb-2 border border-zinc-300 dark:border-zinc-700"
          >
            <div className="grid grid-cols-5 gap-2 items-end">
              <div>
                <label className="block text-xs text-zinc-950/50 dark:text-white/50 mb-1">
                  ID
                </label>
                <input
                  type="number"
                  value={grade.id}
                  onChange={(e) => updateGrade(grade.id, 'id', parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-950/50 dark:text-white/50 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={grade.name}
                  onChange={(e) => updateGrade(grade.id, 'name', e.target.value)}
                  className="w-full px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-950/50 dark:text-white/50 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={grade.label}
                  onChange={(e) => updateGrade(grade.id, 'label', e.target.value)}
                  className="w-full px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-950/50 dark:text-white/50 mb-1">
                  Salary
                </label>
                <input
                  type="number"
                  value={grade.salary}
                  onChange={(e) => updateGrade(grade.id, 'salary', parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-sm"
                />
              </div>
              <button
                onClick={() => removeGrade(grade.id)}
                disabled={grades.length === 1}
                className="px-2 py-1 bg-red-500 hover:bg-red-600 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white rounded text-sm transition-colors"
              >
                ×
              </button>
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
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors"
      >
        {copied ? '✓ Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  )
}
