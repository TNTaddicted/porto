import { useEffect, useMemo, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const sanitizeHex = (value) => value.replace(/[^0-9a-f]/gi, '')

// Friend code validation: no spaces, must have # followed by exactly 4 digits
const validateFriendCode = (fc) => {
  const trimmed = fc.trim()
  if (trimmed.includes(' ')) return { valid: false, message: 'Friend code cannot contain spaces.' }
  const friendCodePattern = /^[^#]*#[0-9]{4}$/
  if (!friendCodePattern.test(trimmed)) {
    return { valid: false, message: 'Friend code must have # followed by exactly 4 numbers (e.g., warmapex#2446).' }
  }
  return { valid: true, value: trimmed }
}

// PUID validation: exactly 32 hexadecimal characters
const validatePUID = (puid) => {
  const cleaned = sanitizeHex(puid.trim())
  if (cleaned.length !== 32) {
    return { valid: false, message: 'PUID must be exactly 32 hexadecimal characters.' }
  }
  return { valid: true, value: cleaned }
}

const AddAUFile = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [friendCode, setFriendCode] = useState('')
  const [puid, setPuid] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const processedUrlRef = useRef(false)

  const params = useMemo(() => new URLSearchParams(location.search), [location.search])

  useEffect(() => {
    const idParam = params.get('id')
    const fcParam = params.get('fc')
    const puidParam = params.get('puid')

    if (idParam || fcParam || puidParam) {
      setId(idParam ?? '')
      setFriendCode(fcParam ?? '')
      setPuid(puidParam ?? '')
      // Only auto-add if all params are present and we haven't processed this URL yet
      if (idParam && fcParam && puidParam && !processedUrlRef.current) {
        processedUrlRef.current = true
        handleAdd(idParam, fcParam, puidParam, true)
      }
    } else {
      // Reset the ref when there are no URL params
      processedUrlRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  const handleAdd = async (rawId, rawFriendCode, rawPuid, autoTrigger = false) => {
    const trimmedId = rawId.trim()

    if (!trimmedId) {
      setStatus('error')
      setMessage('ID is required.')
      return
    }

    // Validate friend code
    const fcValidation = validateFriendCode(rawFriendCode)
    if (!fcValidation.valid) {
      setStatus('error')
      setMessage(fcValidation.message)
      return
    }

    // Validate PUID
    const puidValidation = validatePUID(rawPuid)
    if (!puidValidation.valid) {
      setStatus('error')
      setMessage(puidValidation.message)
      return
    }

    try {
      // Check for duplicates
      const { data: existing, error: checkError } = await supabase
        .from('au_files')
        .select('id')
        .eq('puid', puidValidation.value)
        .limit(1)

      if (checkError) {
        console.error('Check error:', checkError)
      }

      if (existing && existing.length > 0) {
        setStatus('exists')
        setMessage('This record already exists in the database.')
        return
      }

      // Insert into Supabase
      const { data, error } = await supabase
        .from('au_files')
        .insert([
          {
            id: trimmedId,
            friend_code: fcValidation.value,
            puid: puidValidation.value,
          },
        ])
        .select()

      if (error) {
        console.error('Insert error:', error)
        // Check if it's a duplicate key error (PUID already exists)
        if (error.code === '23505' || error.message.includes('duplicate key') || error.message.includes('already exists')) {
          setStatus('exists')
          setMessage('This record already exists in the database.')
          return
        }
        setStatus('error')
        if (error.message.includes('Could not find the table')) {
          setMessage('Database table not found. Please run the SQL setup in Supabase first. See DATABASE_SETUP.md for instructions.')
        } else {
          setMessage(`Failed to add record: ${error.message}`)
        }
        return
      }

      // Success - record was added
      setStatus(autoTrigger ? 'auto-success' : 'success')
      setMessage('Entry added to database successfully!')

      // Clear form if manual submission
      if (!autoTrigger) {
        setId('')
        setFriendCode('')
        setPuid('')
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/aufiles')
        }, 2000)
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setStatus('error')
      setMessage('An unexpected error occurred. Please try again.')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleAdd(id, friendCode, puid)
  }

  const handleFriendCodeChange = (event) => {
    const value = event.target.value
    // Remove spaces as user types
    const noSpaces = value.replace(/\s/g, '')
    setFriendCode(noSpaces)
  }

  const handlePuidChange = (event) => {
    const value = event.target.value
    // Only allow hexadecimal characters
    const cleaned = sanitizeHex(value)
    // Limit to 32 characters
    setPuid(cleaned.slice(0, 32))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 py-20 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        <Link
          to="/aufiles"
          className="inline-flex items-center text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 hover:text-neon-green dark:hover:text-neon-green transition-colors"
        >
          ← Back to archive
        </Link>

        <header className="space-y-3">
          <h1 className="text-3xl font-bold">
            Inject <span className="text-neon-green">New Record</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Add new entries to the database. All entries are stored permanently in Supabase.
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
            Endpoint: /aufiles/add?id=ID&fc=FRIEND_CODE&puid=PUID
          </p>
        </header>

        {status !== 'idle' && (
          <div
            className={`rounded-lg border px-4 py-3 text-sm ${
              status === 'success' || status === 'auto-success'
                ? 'border-neon-green/40 bg-neon-green/5 text-neon-green'
                : status === 'exists'
                  ? 'border-yellow-400/40 bg-yellow-400/10 text-yellow-500'
                  : 'border-red-400/40 bg-red-400/10 text-red-500'
            }`}
          >
            {status === 'auto-success' ? 'Auto-added via URL. ' : ''}
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-light-border dark:border-dark-border bg-white/70 dark:bg-dark-surface/80 backdrop-blur-md px-6 py-8 shadow-lg">
          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Identifier
            </label>
            <input
              value={id}
              onChange={(event) => setId(event.target.value)}
              placeholder="pichipuk"
              required
              className="w-full rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg px-4 py-2 text-sm outline-none focus:border-neon-green dark:focus:border-neon-green focus:ring-2 focus:ring-neon-green/30 transition"
            />
            <p className="text-xs text-gray-400">No character limit.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Friend Code
            </label>
            <input
              value={friendCode}
              onChange={handleFriendCodeChange}
              placeholder="warmapex#2446"
              required
              className="w-full rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg px-4 py-2 text-sm outline-none focus:border-neon-green dark:focus:border-neon-green focus:ring-2 focus:ring-neon-green/30 transition"
            />
            <p className="text-xs text-gray-400">
              Must have # followed by exactly 4 numbers. Spaces are automatically removed.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              PUID
            </label>
            <input
              value={puid}
              onChange={handlePuidChange}
              placeholder="00023bde5dd04f3ba92427d9e59359a1"
              required
              maxLength={32}
              className="w-full rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg px-4 py-2 text-sm font-mono outline-none focus:border-neon-green dark:focus:border-neon-green focus:ring-2 focus:ring-neon-green/30 transition"
            />
            <p className="text-xs text-gray-400">
              Must be exactly 32 hexadecimal characters (0-9, a-f). Invalid characters are blocked.
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-neon-green hover:bg-neon-green-dark px-4 py-2 font-semibold text-white shadow-lg shadow-neon-green/30 transition"
          >
            Add to Database
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddAUFile
