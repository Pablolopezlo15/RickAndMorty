export function getStatusClasses(status?: string): string {
  if (!status) {
    return 'bg-gray-100 text-gray-700 border border-gray-200'
  }

  const lowerStatus = status.toLowerCase()

  switch (lowerStatus) {
    case 'alive':
      return 'bg-green-500 text-green-800 border border-green-200'
    case 'dead':
      return 'bg-red-500 text-white border border-red-200'
    case 'unknown':
      return 'bg-gray-500 text-gray-800 border border-gray-200'
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-200'
  }
}

export function getStatusLabel(status?: string): string {
  if (!status) return 'Desconocido'

  const lowerStatus = status.toLowerCase()

  switch (lowerStatus) {
    case 'alive':
      return 'Vivo'
    case 'dead':
      return 'Muerto'
    case 'unknown':
      return 'Desconocido'
    default:
      return status
  }
}
