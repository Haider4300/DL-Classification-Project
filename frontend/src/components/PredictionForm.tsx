import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import Card from './Card'

interface Props {
  onPredict: (file: File) => void
  loading: boolean
}

export default function PredictionForm({ onPredict, loading }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']

  function handleFile(file: File) {
    setError(null)
    if (!ALLOWED.includes(file.type)) {
      setError('Only JPEG, PNG, or WebP images are allowed.')
      return
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('Image must be smaller than 8 MB.')
      return
    }
    setSelectedFile(file)
    setFileName(file.name)
    setPreview(URL.createObjectURL(file))
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) handleFile(e.target.files[0])
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0])
  }

  function handleClear() {
    setPreview(null)
    setFileName(null)
    setSelectedFile(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <Card
      title="Upload Image"
      empty={!preview}
      action={preview ? (
        <button onClick={handleClear} className="text-xs text-slate-400 hover:text-rose-500 transition-colors">
          Clear
        </button>
      ) : undefined}
    >
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !preview && inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 transition-all min-h-[220px] select-none
          ${dragOver ? 'border-brand-500 bg-brand-50' : preview ? 'border-slate-200 cursor-default' : 'border-dashed border-slate-300 hover:border-brand-400 hover:bg-brand-50/40 cursor-pointer'}`}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full max-h-64 object-contain rounded-lg p-2" />
        ) : (
          <div className="flex flex-col items-center gap-3 py-10 px-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center">
              <svg className="w-7 h-7 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">
                Drop image here, or <span className="text-brand-600 underline underline-offset-2">browse</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">JPEG, PNG or WebP · max 8 MB</p>
            </div>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp"
          onChange={handleChange} className="sr-only" />
      </div>

      {fileName && <p className="mt-2 text-xs text-slate-500 font-mono truncate">{fileName}</p>}
      {error && <p className="mt-2 text-xs text-rose-500">{error}</p>}

      <button
        onClick={() => selectedFile && onPredict(selectedFile)}
        disabled={!preview || loading}
        className={`mt-4 w-full rounded-xl py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
          ${!preview || loading ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.98]'}`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Classifying…
          </span>
        ) : 'Run Classification'}
      </button>
    </Card>
  )
}