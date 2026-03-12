import { supabase } from '@/lib/supabase'
import type { Message } from './types'

export async function getMessages(channelId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('channel_id', channelId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export async function sendMessage(channelId: string, content: string): Promise<Message> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('로그인이 필요합니다')

  const { data, error } = await supabase
    .from('messages')
    .insert({ channel_id: channelId, user_id: user.id, content })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteMessage(id: string): Promise<void> {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id)

  if (error) throw error
}
