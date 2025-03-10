import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async fetchUser() {
      const { data: { user } } = await supabase.auth.getUser()
      this.user = user
    },
    async logout() {
      await supabase.auth.signOut()
      this.user = null
      window.location.href = '/auth/signin' // Force redirect after logout
    }
  }
})
