import { supabase } from '@/lib/supabase'
import type { Channel } from './types'

export async function getChannels(): Promise<Channel[]> {
  const { data, error } = await supabase
    .from('channels')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export async function createChannel(name: string, description?: string): Promise<Channel> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('로그인이 필요합니다')

  const { data, error } = await supabase
    .from('channels')
    .insert({ name, description: description ?? null, created_by: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteChannel(id: string): Promise<void> {
  const { error } = await supabase
    .from('channels')
    .delete()
    .eq('id', id)

  if (error) throw error
}
