import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DATA_URL =
  'https://raw.githubusercontent.com/Hyperionicc/TheAmongUsFiles/refs/heads/main/TheAmongUsFiles%20(raw).txt'

const CACHE_KEY = 'aufiles-cache'
const CACHE_DURATION = 1000 * 60 * 60 * 48 // 48 hours
const DEFAULT_PAGE_SIZE = 50

const friendCodePattern = /#/
const puidPattern = /^[0-9a-f]{16,}$/i

const parseText = (text) => {
  if (!text) return []
  const blocks = text
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean)

  const entries = []

  blocks.forEach((block) => {
    const lines = block
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)

    if (lines.length === 0) return

    let id = ''
    let friendCode = ''
    let puid = ''

    lines.forEach((line) => {
      if (friendCodePattern.test(line)) {
        friendCode = line
      } else if (puidPattern.test(line.replace(/[^0-9a-f]/gi, ''))) {
        const cleaned = line.replace(/[^0-9a-f]/gi, '')
        if (cleaned.length >= 16) {
          puid = cleaned
        }
      } else if (!id) {
        id = line
      }
    })

    if (id || friendCode || puid) {
      entries.push({
        id: id || 'Unknown ID',
        friendCode: friendCode || 'Unknown',
        puid: puid || 'Unknown',
        source: 'remote',
      })
    }
  })

  return entries
}

const mergeEntries = (remoteEntries, dbEntries) => {
  const map = new Map()

  const pushEntry = (entry, source) => {
    if (!entry) return
    const key = entry.puid && entry.puid !== 'Unknown' ? entry.puid : `${entry.id}-${entry.friendCode}`
    if (!map.has(key)) {
      map.set(key, { ...entry, source })
    } else if (source === 'database') {
      map.set(key, { ...entry, source })
    }
  }

  remoteEntries.forEach((entry) => pushEntry(entry, 'remote'))
  dbEntries.forEach((entry) => pushEntry(entry, 'database'))

  return Array.from(map.values()).sort((a, b) => a.id.localeCompare(b.id))
}

const readLocalStorageJson = (key, fallback) => {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

const AUFiles = () => {
  const navigate = useNavigate()
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      setIsLoading(true)
      setError('')
      try {
        // Fetch from Supabase
        const { data: dbEntries, error: dbError } = await supabase
          .from('au_files')
          .select('id, friend_code, puid')
          .order('id', { ascending: true })

        if (dbError) {
          console.error('Supabase error:', dbError)
          // If table doesn't exist, just continue without database entries
          if (dbError.message.includes('Could not find the table')) {
            console.warn('Table au_files does not exist. Please run the SQL setup.')
          }
        }

        const dbFormatted = (dbEntries || []).map((entry) => ({
          id: entry.id,
          friendCode: entry.friend_code,
          puid: entry.puid,
          source: 'database',
        }))

        // Fetch from GitHub (with cache)
        const cached = readLocalStorageJson(CACHE_KEY, null)
        const shouldUseCache =
          cached && cached.timestamp && Date.now() - cached.timestamp < CACHE_DURATION && cached.data

        let remoteEntries = []

        if (shouldUseCache) {
          remoteEntries = cached.data
        } else {
          const response = await fetch(DATA_URL, { cache: 'no-cache' })
          if (!response.ok) {
            throw new Error(`Failed to fetch data (status ${response.status})`)
          }
          const text = await response.text()
          remoteEntries = parseText(text)

          if (typeof window !== 'undefined') {
            window.localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                timestamp: Date.now(),
                data: remoteEntries,
              }),
            )
          }
        }

        if (!isMounted) return
        setEntries(mergeEntries(remoteEntries, dbFormatted))
        setIsLoading(false)
      } catch (err) {
        console.error(err)
        if (!isMounted) return
        setError('Unable to load Among Us file data. Please try again later.')
        setIsLoading(false)
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredEntries = useMemo(() => {
    if (!query) return entries
    const lowered = query.toLowerCase()
    return entries.filter((entry) => {
      return (
        entry.id.toLowerCase().includes(lowered) ||
        entry.friendCode.toLowerCase().includes(lowered) ||
        entry.puid.toLowerCase().includes(lowered)
      )
    })
  }, [entries, query])

  // Pagination calculations
  const totalPages = Math.ceil(filteredEntries.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedEntries = filteredEntries.slice(startIndex, endIndex)

  // Reset to page 1 when query or pageSize changes
  useEffect(() => {
    setCurrentPage(1)
  }, [query, pageSize])

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 hover:text-neon-green dark:hover:text-neon-green transition-colors"
          >
            
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">
            The Among Us Files <span className="text-neon-green">Archive</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Internal directory of known Among Us dating accounts. Entries sync from the upstream file
            roughly every 48 hours while keeping database records. This page is intentionally hidden
            from the public navigation.
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <label className="relative w-full md:w-80">
              <span className="sr-only">Search records</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by ID, friend code, or PUID..."
                className="w-full rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface px-4 py-2 text-sm outline-none focus:border-neon-green dark:focus:border-neon-green focus:ring-2 focus:ring-neon-green/30 transition"
              />
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/aufiles/add')}
                className="rounded-lg bg-neon-green hover:bg-neon-green-dark px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-neon-green/30 transition"
              >
                Add Record
              </button>
              <span className="text-xs uppercase tracking-[0.3em] text-gray-400">
                {filteredEntries.length} records
              </span>
            </div>
          </div>
        </header>

        {isLoading && (
          <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-700 p-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Fetching the latest intel...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50/60 px-6 py-4 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="overflow-hidden rounded-2xl border border-light-border dark:border-dark-border bg-white/70 dark:bg-dark-surface/70 backdrop-blur-sm shadow-lg">
              <table className="min-w-full divide-y divide-light-border dark:divide-dark-border text-sm">
                <thead className="bg-light-surface/60 dark:bg-dark-bg/60 uppercase text-xs tracking-wide text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Friend Code</th>
                    <th className="px-4 py-3 text-left">PUID</th>
                    <th className="px-4 py-3 text-left">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-border dark:divide-dark-border">
                  {paginatedEntries.map((entry) => (
                    <tr key={`${entry.id}-${entry.puid}`} className="hover:bg-light-surface/60 dark:hover:bg-dark-bg/60 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{entry.id}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{entry.friendCode}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400 break-all">{entry.puid}</td>
                      <td className="px-4 py-3 text-xs uppercase tracking-wide">
                        {entry.source === 'database' ? (
                          <span className="inline-flex items-center rounded-full bg-neon-green/10 px-2 py-1 font-semibold text-neon-green">
                            Database
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-gray-200/60 px-2 py-1 font-semibold text-gray-600 dark:bg-dark-border dark:text-gray-300">
                            Remote
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-light-border dark:border-dark-border bg-white/60 dark:bg-dark-surface/60 backdrop-blur-sm p-4">
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Items per page:
                  </label>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      const newSize = parseInt(e.target.value, 10)
                      setPageSize(newSize)
                    }}
                    className="rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg px-3 py-1.5 text-sm outline-none focus:border-neon-green dark:focus:border-neon-green focus:ring-2 focus:ring-neon-green/30 transition"
                  >
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                    <option value={500}>500</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Page {currentPage} of {totalPages} ({startIndex + 1}-{Math.min(endIndex, filteredEntries.length)} of {filteredEntries.length})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg disabled:opacity-50 disabled:cursor-not-allowed hover:border-neon-green dark:hover:border-neon-green transition"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg disabled:opacity-50 disabled:cursor-not-allowed hover:border-neon-green dark:hover:border-neon-green transition"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <section className="rounded-xl border border-light-border dark:border-dark-border bg-white/60 dark:bg-dark-surface/60 backdrop-blur-sm p-6 text-sm text-gray-600 dark:text-gray-400 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add new intel</h2>
          <p>
            Use the endpoint{' '}
            <code className="rounded bg-gray-200/80 px-2 py-1 text-xs dark:bg-dark-border">
              /aufiles/add?id=NAME&fc=FRIEND_CODE&puid=PUID
            </code>{' '}
            or click the "Add Record" button above to add new entries to the database.
          </p>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
            Source synced from{' '}
            <a
              href={DATA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-green hover:underline"
            >
              Hyperionic&apos;s Among Us Files
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}

export default AUFiles
