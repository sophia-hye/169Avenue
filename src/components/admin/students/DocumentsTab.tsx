import { useRef, useState } from 'react'
import { useLanguage } from '../../../context/LanguageContext'
import {
  type StudentCase,
  type DocumentFile,
  type DocumentType,
  upsertDocument,
  deleteDocument,
} from '../../../data/student-store'
import {
  uploadToStorage,
  getStoragePublicUrl,
  deleteFromStorage,
  fileToBase64,
  base64ToObjectUrl,
} from '../../../lib/storage'
import { isSupabaseConfigured } from '../../../lib/supabase'

const MAX_BYTES = 20 * 1024 * 1024

const DOC_TYPES: DocumentType[] = [
  'passport',
  'bachelor_transcript',
  'bachelor_diploma',
  'sop_korean',
  'sop_english',
  'resume',
  'master_transcript',
  'master_diploma',
]

const DOC_ACCEPT: Record<DocumentType, string> = {
  passport:            'image/*,.pdf',
  bachelor_transcript: '.pdf',
  bachelor_diploma:    'image/*,.pdf',
  sop_korean:          '.pdf,.doc,.docx',
  sop_english:         '.pdf,.doc,.docx',
  resume:              '.pdf,.doc,.docx',
  master_transcript:   '.pdf',
  master_diploma:      'image/*,.pdf',
}

function getDocUrl(doc: DocumentFile): string | null {
  if (doc.storagePath) return getStoragePublicUrl(doc.storagePath)
  if (doc.localData) return base64ToObjectUrl(doc.localData, doc.mimeType)
  return null
}

function isPreviewable(doc: DocumentFile): boolean {
  return doc.mimeType.startsWith('image/') || doc.mimeType === 'application/pdf'
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

interface Props {
  c: StudentCase
  save: (next: StudentCase) => void
}

export function DocumentsTab({ c, save }: Props) {
  const { t } = useLanguage()
  const tt = t as unknown as Record<string, string>
  const docs = c.documents ?? []

  const [uploading, setUploading] = useState<DocumentType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<DocumentFile | null>(null)

  const handleUpload = async (type: DocumentType, file: File) => {
    setError(null)
    if (file.size > MAX_BYTES) {
      setError(tt.docs_size_error)
      return
    }
    setUploading(type)
    try {
      let storagePath: string | undefined
      let localData: string | undefined

      if (isSupabaseConfigured) {
        const result = await uploadToStorage(c.student.id, type, file)
        if (!result) {
          setError(tt.docs_upload_error)
          return
        }
        storagePath = result.path
      } else {
        localData = await fileToBase64(file)
      }

      save(upsertDocument(c, {
        type,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        storagePath,
        localData,
      }))
    } catch {
      setError(tt.docs_upload_error)
    } finally {
      setUploading(null)
    }
  }

  const handleDelete = async (doc: DocumentFile) => {
    if (!confirm(tt.docs_delete_confirm)) return
    if (doc.storagePath) await deleteFromStorage(doc.storagePath)
    save(deleteDocument(c, doc.id))
  }

  const handleDownload = (doc: DocumentFile) => {
    const url = getDocUrl(doc)
    if (!url) return
    const a = document.createElement('a')
    a.href = url
    a.download = doc.fileName
    a.click()
    if (!doc.storagePath) URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-headline text-xl text-primary tracking-tight mb-1">{tt.docs_tab_title}</h2>
        <p className="font-body text-xs text-on-surface-variant/50">{tt.docs_tab_sub}</p>
      </div>

      {error && (
        <div className="mb-4 px-4 py-2.5 bg-rose-50 border border-rose-200 text-rose-700 font-body text-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">error</span>
          {error}
          <button onClick={() => setError(null)} className="ml-auto">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DOC_TYPES.map((type) => {
          const existing = docs.find((d) => d.type === type)
          return (
            <DocCard
              key={type}
              type={type}
              labelKey={`docs_${type}`}
              existing={existing ?? null}
              isUploading={uploading === type}
              accept={DOC_ACCEPT[type]}
              tt={tt}
              onUpload={(file) => handleUpload(type, file)}
              onDelete={() => existing && handleDelete(existing)}
              onPreview={() => existing && setPreview(existing)}
              onDownload={() => existing && handleDownload(existing)}
            />
          )
        })}
      </div>

      {preview && (
        <PreviewModal
          doc={preview}
          tt={tt}
          onClose={() => setPreview(null)}
          onDownload={() => handleDownload(preview)}
        />
      )}
    </div>
  )
}

/* ─── DocCard ─── */

function DocCard({
  type,
  labelKey,
  existing,
  isUploading,
  accept,
  tt,
  onUpload,
  onDelete,
  onPreview,
  onDownload,
}: {
  type: DocumentType
  labelKey: string
  existing: DocumentFile | null
  isUploading: boolean
  accept: string
  tt: Record<string, string>
  onUpload: (file: File) => void
  onDelete: () => void
  onPreview: () => void
  onDownload: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onUpload(file)
    e.target.value = ''
  }

  const docIcon = getDocIcon(type)

  return (
    <div className={`border ${existing ? 'border-outline-variant/25 bg-surface' : 'border-dashed border-outline-variant/20 bg-surface-container-lowest/40'} p-4 transition-colors`}>
      <div className="flex items-start gap-3">
        <span className={`material-symbols-outlined text-2xl mt-0.5 ${existing ? 'text-secondary' : 'text-on-surface-variant/30'}`}>
          {docIcon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant/60 mb-1">
            {tt[labelKey]}
          </p>
          {existing ? (
            <>
              <p className="font-body text-sm text-primary truncate">{existing.fileName}</p>
              <p className="font-body text-[11px] text-on-surface-variant/40 mt-0.5">
                {formatBytes(existing.fileSize)} · {tt.docs_uploaded_on} {existing.uploadedAt.slice(0, 10)}
              </p>
              <div className="flex items-center gap-1 mt-3 flex-wrap">
                {isPreviewable(existing) && (
                  <ActionBtn icon="visibility" label={tt.docs_preview} onClick={onPreview} />
                )}
                <ActionBtn icon="download" label={tt.docs_download} onClick={onDownload} />
                <ActionBtn icon="upload" label={tt.docs_replace} onClick={() => inputRef.current?.click()} />
                <ActionBtn icon="delete" label={tt.docs_delete} onClick={onDelete} danger />
              </div>
            </>
          ) : (
            <>
              <p className="font-body text-xs text-on-surface-variant/40">{tt.docs_no_file}</p>
              <button
                onClick={() => inputRef.current?.click()}
                disabled={isUploading}
                className="mt-3 flex items-center gap-1.5 px-3 py-1.5 font-body text-xs border border-outline-variant/30 text-on-surface-variant/60 hover:border-secondary hover:text-secondary transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm">
                  {isUploading ? 'hourglass_top' : 'upload'}
                </span>
                {isUploading ? tt.docs_uploading : tt.docs_upload}
              </button>
            </>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}

/* ─── ActionBtn ─── */

function ActionBtn({
  icon, label, onClick, danger,
}: {
  icon: string
  label: string
  onClick: () => void
  danger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`flex items-center gap-1 px-2 py-1 font-body text-[11px] border transition-colors ${
        danger
          ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
          : 'border-outline-variant/25 text-on-surface-variant/60 hover:border-secondary hover:text-secondary'
      }`}
    >
      <span className="material-symbols-outlined text-sm">{icon}</span>
      {label}
    </button>
  )
}

/* ─── PreviewModal ─── */

function PreviewModal({
  doc,
  tt,
  onClose,
  onDownload,
}: {
  doc: DocumentFile
  tt: Record<string, string>
  onClose: () => void
  onDownload: () => void
}) {
  const url = getDocUrl(doc)

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 flex flex-col"
      onClick={onClose}
    >
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-surface/95 backdrop-blur border-b border-outline-variant/15 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="material-symbols-outlined text-on-surface-variant/50 text-xl">
            {getDocIcon(doc.type)}
          </span>
          <div className="min-w-0">
            <p className="font-body text-sm text-primary truncate">{doc.fileName}</p>
            <p className="font-body text-[11px] text-on-surface-variant/40">{formatBytes(doc.fileSize)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-4">
          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 font-body text-xs border border-outline-variant/30 text-on-surface-variant/60 hover:border-secondary hover:text-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            {tt.docs_download}
          </button>
          <button onClick={onClose} className="p-1.5 text-on-surface-variant/50 hover:text-primary">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-hidden flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {!url ? (
          <p className="font-body text-sm text-white/70">{tt.docs_preview_not_supported}</p>
        ) : doc.mimeType.startsWith('image/') ? (
          <img
            src={url}
            alt={doc.fileName}
            className="max-h-full max-w-full object-contain"
            onLoad={() => { if (!doc.storagePath) URL.revokeObjectURL(url) }}
          />
        ) : doc.mimeType === 'application/pdf' ? (
          <iframe
            src={url}
            title={doc.fileName}
            className="w-full h-full bg-white"
          />
        ) : (
          <div className="text-center">
            <p className="font-body text-sm text-white/70 mb-4">{tt.docs_preview_not_supported}</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── helpers ─── */

function getDocIcon(type: DocumentType): string {
  switch (type) {
    case 'passport':            return 'badge'
    case 'bachelor_transcript':
    case 'master_transcript':   return 'grade'
    case 'bachelor_diploma':
    case 'master_diploma':      return 'school'
    case 'sop_korean':
    case 'sop_english':         return 'edit_document'
    case 'resume':              return 'description'
  }
}
