import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMessages, sendMessage, deleteMessage } from './api'
import type { Message } from './types'

export function useMessages(channelId: string) {
  return useQuery({
    queryKey: ['messages', channelId],
    queryFn: () => getMessages(channelId),
    enabled: !!channelId,
  })
}

export function useSendMessage(channelId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (content: string) => sendMessage(channelId, content),

    onMutate: async (content) => {
      await queryClient.cancelQueries({ queryKey: ['messages', channelId] })

      const previous = queryClient.getQueryData<Message[]>(['messages', channelId])

      const optimistic: Message = {
        id: `optimistic-${Date.now()}`,
        channel_id: channelId,
        user_id: '',
        content,
        created_at: new Date().toISOString(),
      }

      queryClient.setQueryData<Message[]>(['messages', channelId], (old = []) => [
        ...old,
        optimistic,
      ])

      return { previous }
    },

    onError: (_err, _content, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['messages', channelId], context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', channelId] })
    },
  })
}

export function useDeleteMessage(channelId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', channelId] })
    },
  })
}
