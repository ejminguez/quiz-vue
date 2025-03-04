import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'
import type { Tables } from '../../database/types'

export const useUserStore = defineStore('userStore', {
  state: () => {
    const users = ref<Tables<'USER'>[]>([])
    return {
      users,
      loading: false,
    }
  },
  actions: {
    async fetchUsers() {
      this.loading = true
      const { data, error } = await supabase.from('USER').select()
      if (error) {
        console.error('Error fetching users:', error)
      } else {
        this.users = data
        this.loading = false
      }
    },
  },
})
