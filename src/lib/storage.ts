import { supabase, isSupabaseConfigured } from './supabase'

const BUCKET = 'client-documents'

export async function uploadToStorage(
  studentId: string,
  docType: string,
  file: File
): Promise<{ path: string; publicUrl: string } | null> {
  if (!isSupabaseConfigured || !supabase) return null
  const ext = file.name.split('.').pop() ?? 'bin'
  const path = `${studentId}/${docType}/${Date.now()}.${ext}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type })
  if (error) {
    console.error('[storage] upload failed:', error)
    return null
  }
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { path, publicUrl: data.publicUrl }
}

export function getStoragePublicUrl(path: string): string | null {
  if (!isSupabaseConfigured || !supabase) return null
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteFromStorage(path: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return
  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) console.error('[storage] delete failed:', error)
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve((reader.result as string).split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function base64ToObjectUrl(base64: string, mimeType: string): string {
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))
  const blob = new Blob([bytes], { type: mimeType })
  return URL.createObjectURL(blob)
}
