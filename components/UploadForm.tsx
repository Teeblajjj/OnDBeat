import { useState } from 'react'

export default function UploadForm() {
  const [title, setTitle] = useState('')
  const [fileName, setFileName] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert(`Pretend uploading: ${title} (${fileName || 'no file selected'})`)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem', maxWidth: 420, marginTop: '1rem' }}>
      <label>
        <div>Title</div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Beat title" style={{ width: '100%', padding: '0.5rem' }} />
      </label>
      <label>
        <div>File</div>
        <input type="file" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
      </label>
      <button type="submit" style={{ padding: '0.5rem 1rem' }}>Upload</button>
    </form>
  )
}


