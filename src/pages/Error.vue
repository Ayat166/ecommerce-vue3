<template>
    <div class="error">
        <h1>404! Error</h1>
        <p>Sorry, something went wrong.</p>
        <p>Please try again later.</p>
    </div>
</template>

<script lang="ts">
export default {
    name: "ErrorPage"

}
</script>

<style>
.error {
    text-align: center;
    padding: 2rem;
    background-color: #f8d7da;
    color: #2b181b99;
    border-radius: 8px;
    margin: 2rem auto;
    max-width: 600px;
}
.error h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
}
.error p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
}
.error p:last-child {
    margin-top: 1rem;
    font-weight: bold;
}
.error a {
    color: #0056b3;
    text-decoration: none;
}

.error a:hover {
    text-decoration: underline;
}

.error a:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 86, 179, 0.5);
}
.error a:active {
    color: #003d7a;
}
</style>
