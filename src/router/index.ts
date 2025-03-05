import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import CartView from '../views/CartView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import GoogleCallbackView from '../views/GoogleCallbackView.vue'
import Profile from '../views/ProfileView.vue';


const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/products', name: 'Products', component: ProductsView },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetailView },
  { path: '/cart', name: 'Cart', component: CartView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/auth/google/callback', name: 'GoogleCallback', component: GoogleCallbackView },
  { path: '/profile', name: 'Profile', component: Profile }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
