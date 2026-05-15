import { useEffect, useState } from 'react'
import { ModalShell } from '../common/ModalShell.jsx'
import { Button } from '../common/Button.jsx'
import { TextField } from '../inputs/TextField.jsx'
import { NODE_TYPES } from '../../constants/nodeTypes.js'

/**
 * @param {{
 *   isOpen: boolean
 *   nodeType: import('../../types/node.js').NodeType
 *   onClose: () => void
 *   onSubmit: (name: string) => void
 * }} props
 */
export function CreateNodeModal({ isOpen, nodeType, onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) return
    setName('')
    setError('')
  }, [isOpen, nodeType])

  const isFile = nodeType === NODE_TYPES.FILE
  const title = isFile ? 'Create File' : 'Create Folder'
  const label = isFile ? 'File name' : 'Folder name'
  const placeholder = isFile ? 'example.txt' : 'my-folder'

  const handleClose = () => {
    setName('')
    setError('')
    onClose()
  }

  const handleSubmit = () => {
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Name is required.')
      return
    }
    onSubmit(trimmed)
    setName('')
    setError('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <ModalShell
      isOpen={isOpen}
      title={title}
      onClose={handleClose}
      footer={
        <>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </>
      }
    >
      <TextField
        label={label}
        value={name}
        onChange={(next) => {
          setName(next)
          if (error) setError('')
        }}
        error={error}
        placeholder={placeholder}
        autoFocus
        onKeyDown={handleKeyDown}
      />
    </ModalShell>
  )
}
