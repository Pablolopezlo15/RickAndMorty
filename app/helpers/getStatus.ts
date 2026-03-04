export function getStatusClasses(status?: string) {
  const lowerStatus = status?.toLowerCase()

  switch (lowerStatus) {
    case 'alive':
      return 'bg-green-100 text-green-800 border-green-300'
    case 'dead':
      return 'bg-red-100 text-red-800 border-red-300'
    case 'unknown':
      return 'bg-yellow-100 text-gray-800 border-gray-300'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300'
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