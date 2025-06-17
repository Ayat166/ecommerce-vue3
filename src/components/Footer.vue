<script lang="ts">
import { defineComponent } from 'vue'
import '../styles/footer.css'

export default defineComponent({
    name: 'Footer',
})
</script>

<template>
    <section class="newsletter">
        <div class="container">
            <h2>Join our Newsletter</h2>
            <p>Nulla ac convallis lorem, eget euismod nisl. bibendum nec.</p>
            <form class="newsletter-form">
                <input 
                    type="email" 
                    placeholder="Your E-mail"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Navigate</h3>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Sitemap</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Collection</h3>
                    <ul>
                        <li><a href="#">New arrivals</a></li>
                        <li><a href="#">Featured</a></li>
                        <li><a href="#">Catalog</a></li>
                        <li><a href="#">Brands</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Categories</h3>
                    <ul>
                        <li><a href="#">Tables</a></li>
                        <li><a href="#">Lamps</a></li>
                        <li><a href="#">Chairs</a></li>
                        <li><a href="#">Sofas</a></li>
                    </ul>
                </div>

                <div class="footer-section contact-info">
                    <div class="address">399 Crowfield Road,<br>Phoenix, Arizona 85012</div>
                    <a href="mailto:asffefdsfsdc.com" class="email">asffefdsfsdc.com</a>
                    <div class="phone">+602-926-5809</div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="copyright">Copyright © All Rights Reserved 2020</div>
                <div class="social-links">
                    <a href="#" title="Twitter">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                        </svg>
                    </a>
                    <a href="#" title="Pinterest">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm3-15H9c-1.657 0-3 1.343-3 3v4c0 1.657 1.343 3 3 3h6c1.657 0 3-1.343 3-3V10c0-1.657-1.343-3-3-3z"/>
                        </svg>
                    </a>
                    <a href="#" title="Facebook">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                        </svg>
                    </a>
                    <a href="#" title="Instagram">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>