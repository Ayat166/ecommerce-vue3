# 🛒 Saqaya Ecommerce - Vue 3 Application

A modern, responsive ecommerce web application built with **Vue 3**, **TypeScript**, and **Pinia**. This project demonstrates a complete online shopping experience with product browsing, cart management, and a beautiful user interface.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Component Hierarchy](#component-hierarchy)
- [Installation & Setup](#installation--setup)
- [Development](#development)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Routing](#routing)
- [Styling](#styling)
- [Testing](#testing)
- [Build & Deployment](#build--deployment)

## 🎯 Project Overview

Saqaya Ecommerce is a full-featured online shopping platform that provides users with:

- **Product Discovery**: Browse through a curated collection of products
- **Product Details**: Detailed product information with ratings and reviews
- **Shopping Cart**: Add/remove items with quantity management
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations

The application uses the [FakeStore API](https://fakestoreapi.com/) to fetch product data and demonstrates best practices in Vue 3 development with TypeScript.

## ✨ Features

### Core Features
- 🏠 **Home Page**: Welcome section with featured products slider
- 📦 **Product Catalog**: Browse all products with sorting options
- 🔍 **Product Details**: Detailed product view with images and descriptions
- 🛒 **Shopping Cart**: Side panel cart with add/remove functionality
- 📞 **Contact Form**: Customer support contact page
- 🎨 **Responsive Design**: Mobile-first responsive layout

### Advanced Features
- ⚡ **Product Sorting**: Sort by price (low/high) and rating
- 🌟 **Product Ratings**: Star-based rating display
- 📱 **Mobile Navigation**: Hamburger menu for mobile devices
- 🎯 **Cart Badge**: Real-time cart item count indicator
- 🔄 **State Persistence**: Cart state management with Pinia
- 🎨 **Modern UI**: Clean design with hover effects and transitions

## 🛠 Technology Stack

### Frontend Framework
- **Vue 3.5.17** - Progressive JavaScript framework with Composition API
- **TypeScript 5.8.0** - Type-safe JavaScript development
- **Vite 7.0.0** - Lightning-fast build tool and dev server

### State Management & Routing
- **Pinia 3.0.3** - Intuitive, type safe store for Vue
- **Vue Router 4.5.1** - Official router for Vue.js

### Development Tools
- **ESLint 9.29.0** - Code linting and formatting
- **Prettier 3.5.3** - Code formatter
- **Vitest 3.2.4** - Unit testing framework
- **Vue Test Utils 2.4.6** - Vue component testing utilities

### Build & Development
- **@vitejs/plugin-vue 6.0.0** - Vue 3 support for Vite
- **vite-plugin-vue-devtools 7.7.7** - Vue DevTools integration
- **vue-tsc 2.2.10** - TypeScript compiler for Vue

## 📁 Project Structure

```
ecommerce-vue3/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable Vue components
│   │   ├── LayoutComponent.vue      # Main layout wrapper
│   │   ├── NavbarComponent.vue      # Navigation header
│   │   ├── FooterComponent.vue      # Footer section
│   │   ├── ProductCard.vue          # Product display card
│   │   ├── ProductSlider.vue        # Product carousel
│   │   ├── SideCart.vue             # Shopping cart sidebar
│   │   ├── SortDropdown.vue         # Product sorting
│   │   └── LogoComponent.vue        # Brand logo
│   ├── pages/              # Route-based page components
│   │   ├── HomePage.vue             # Landing page
│   │   ├── ProductsPage.vue         # Product catalog
│   │   ├── ProductDetails.vue       # Individual product view
│   │   ├── ContactUs.vue            # Contact form
│   │   └── Error.vue                # Error page
│   ├── stores/             # Pinia state management
│   │   └── index.ts                # Main store configuration
│   ├── router/             # Vue Router configuration
│   │   └── index.ts                # Route definitions
│   ├── types/              # TypeScript type definitions
│   │   ├── Product.ts              # Product interface
│   │   └── ProductCart.ts          # Cart item interface
│   ├── styles/             # Global styles and CSS
│   ├── App.vue             # Root component
│   ├── main.ts             # Application entry point
│   └── style.css           # Global styles
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## 🏗 Component Hierarchy

```
App.vue
└── LayoutComponent.vue
    ├── NavbarComponent.vue
    │   └── LogoComponent.vue
    ├── SideCart.vue
    ├── Router View (Pages)
    │   ├── HomePage.vue
    │   │   └── ProductSlider.vue
    │   │       └── ProductCard.vue
    │   ├── ProductsPage.vue
    │   │   ├── SortDropdown.vue
    │   │   └── ProductCard.vue
    │   ├── ProductDetails.vue
    │   ├── ContactUs.vue
    │   └── Error.vue
    └── FooterComponent.vue
```

### Component Descriptions

#### Layout Components
- **LayoutComponent.vue**: Main layout wrapper with navigation, cart, and footer
- **NavbarComponent.vue**: Header with logo, navigation links, and cart button
- **FooterComponent.vue**: Footer with newsletter signup and social links

#### Product Components
- **ProductCard.vue**: Reusable product display card with image, title, price, and add to cart
- **ProductSlider.vue**: Carousel component for featured products
- **ProductDetails.vue**: Detailed product view with full information

#### Cart Components
- **SideCart.vue**: Sliding cart sidebar with item management
- **SortDropdown.vue**: Product sorting controls

#### Utility Components
- **LogoComponent.vue**: Brand logo SVG component
- **Error.vue**: Error page for invalid routes

## 🚀 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-vue3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 💻 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Formatting
npm run format

# Unit testing
npm run test:unit
```

### Development Workflow

1. **Start development server**: `npm run dev`
2. **Make changes** to components in `src/`
3. **Hot reload** will automatically update the browser
4. **Run tests**: `npm run test:unit`
5. **Lint code**: `npm run lint`
6. **Format code**: `npm run format`

## 🔌 API Integration

The application integrates with the [FakeStore API](https://fakestoreapi.com/) for product data:

### API Endpoints Used
- `GET /products` - Fetch all products
- `GET /products/{id}` - Fetch specific product details

### Data Flow
1. **Store Actions**: API calls are handled in Pinia store actions
2. **Component Integration**: Components use store getters to access data
3. **Error Handling**: Graceful error handling for API failures

## 📊 State Management

### Pinia Store Structure

```typescript
// stores/index.ts
export const useStore = defineStore('store', {
  state: () => ({
    products: [] as Product[],
    product: null,
    cart: [] as ProductCart[],
  }),

  actions: {
    async fetchProducts() { /* API call */ },
    async fetchProduct(id: number) { /* API call */ },
    addToCart(product: Product) { /* Cart logic */ },
    removeFromCart(productId: number) { /* Cart logic */ },
  },

  getters: {
    allProducts: (state) => state.products,
    currentProduct: (state) => state.product,
    cartItems: (state) => state.cart,
    cartCount: (state) => state.cart.reduce((total, item) => total + item.quantity, 0),
  },
})
```

### State Flow
1. **Product Data**: Fetched from API and stored in Pinia
2. **Cart Management**: Local state management with add/remove actions
3. **Reactive Updates**: Components automatically update when state changes

## 🛣 Routing

### Route Configuration

```typescript
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'Products', component: Products },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
  { path: '/contact', name: 'Contact', component: ContactUs },
  { path: '/error', name: 'Error', component: Error },
  { path: '/:catchAll(.*)', redirect: '/' },
]
```

### Route Guards
- **Product Details**: Validates product ID parameter
- **Error Handling**: Redirects invalid routes to error page

## 🎨 Styling

### CSS Architecture
- **Scoped Styles**: Component-specific styles using Vue's scoped CSS
- **Global Styles**: Base styles in `src/style.css`
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

### Design System
- **Color Palette**: Consistent color scheme throughout the application
- **Typography**: Unified font hierarchy and spacing
- **Components**: Reusable UI components with consistent styling

## 🧪 Testing

### Testing Framework
- **Vitest**: Fast unit testing framework
- **Vue Test Utils**: Vue component testing utilities
- **Test Coverage**: Component and store testing

### Running Tests
```bash
npm run test:unit
```

## 🚀 Build & Deployment

### Production Build
```bash
npm run build
```

### Build Output
- **Optimized Assets**: Minified CSS, JS, and images
- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Unused code elimination

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFlare, AWS CloudFront
- **Server**: Node.js server with static file serving

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/) - Progressive JavaScript framework
- [FakeStore API](https://fakestoreapi.com/) - Product data API
- [Pinia](https://pinia.vuejs.org/) - Intuitive state management
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

---

**Built with ❤️ using Vue 3, TypeScript, and modern web technologies**
