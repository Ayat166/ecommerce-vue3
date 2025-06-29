<template>
    <div class="contact-us-page">
        <h1 class="text-center mb-4">Contact Us</h1>
        <div class="contact-form-container">
            <form>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" required />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required />
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" rows="4" required></textarea>
                </div>
                <div class="form-group">
                    <button type="submit">Send Message</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
export default {

}
</script>

<style scoped>
.contact-us-page {
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
}
.contact-us-page h1 {
    font-size: 2rem;
    color: #22223b;
    margin-bottom: 1.5rem;
}
.contact-form-container {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
}
.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ececec;
    border-radius: 4px;
    font-size: 1rem;
}
.form-group input:focus,
.form-group textarea:focus {
    border-color: #666;
    outline: none;
}

.form-group textarea {
    resize: vertical;
}

.form-group button {
    background-color: #666;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;
    width: 100%;
    font-weight: 600;
    text-align: center;
    display: inline-block;

}

.form-group button:hover {
    background-color: #666;
}
</style>
