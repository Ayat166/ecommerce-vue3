<template>
    <div>
        <Navbar @show-cart="sideCartOpen = true" />
        <SideCart :isActive="sideCartOpen" @close="sideCartOpen = false" />
        <main>
            <slot />
        </main>
        <Footer />
    </div>
</template>

<script>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import SideCart from './SideCart.vue'

export default {
    name: 'Layout',
    components: {
        Navbar,
        Footer,
        SideCart
    },
    data() {
        return {
            sideCartOpen: false
        }
    }
}
</script>

<style scoped>
main {
    min-height: 80vh;
    padding: 2rem 0;
}
</style>
