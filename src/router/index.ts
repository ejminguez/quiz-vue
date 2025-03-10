import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import { useAuthStore } from '@/stores/authStore'
import { supabase } from '@/lib/supabaseClient'

// Define routes that should be guest-only
const guestRoutes = ['/auth/signIn', '/auth/signUp']

// Define routes that require authentication (use regex for dynamic paths)
const protectedRoutes = ['/quiz/take/:id', '/user', '/edit', '/user/create']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Get session from Supabase
  const { data: { session } } = await supabase.auth.getSession()
  authStore.user = session?.user || null

  // Check if the route is guest-only
  if (guestRoutes.includes(to.path) && authStore.user) {
    next('/') // Redirect logged-in users away from auth pages
  } 
  // Check if the route requires authentication
  else if (to.matched.some(() => protectedRoutes.some(p => to.path.startsWith(p.replace(':id', '')))) && !authStore.user) {
    next('/auth/signIn') // Redirect guests to sign-in
  } 
  else {
    next() // Allow access
  }
})

export default router
