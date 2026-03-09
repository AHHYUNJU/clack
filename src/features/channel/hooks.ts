import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getChannels, createChannel, deleteChannel } from './api'

export function useChannels() {
  return useQuery({
    queryKey: ['channels'],
    queryFn: getChannels,
  })
}

export function useCreateChannel() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ name, description }: { name: string; description?: string }) =>
      createChannel(name, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] })
    },
  })
}

export function useDeleteChannel() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteChannel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] })
    },
  })
}
