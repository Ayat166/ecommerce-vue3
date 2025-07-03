<template>
    <div class="sort-dropdown">
        <label for="sort">Sort by:</label>
        <select id="sort" :value="modelValue" @change="onChange">
            <option value="default">All Products</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
    modelValue: string
}>();
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>();

const onChange = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    emit('update:modelValue', value);
};
// import { defineComponent } from 'vue';
// export default defineComponent({
//     props: {
//         modelValue: {
//             type: String,
//             default: 'default'
//         }
//     },
//     emits: ['update:modelValue'],
//     methods: {
//         onChange(event: Event) {
//             const value = (event.target as HTMLSelectElement).value;
//             this.$emit('update:modelValue', value);
//         }
//     }
// });
</script>

<style scoped>
.sort-dropdown {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
}

.sort-dropdown label {
    margin-right: 0.5rem;
    font-weight: bold;
    color: #333;
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 0.5rem;
    display: inline-block;
}

.sort-dropdown select {
    padding: 0.25rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    line-height: 1.5;
    background-color: #fff;
    color: #333;
    cursor: pointer;
    transition: border-color 0.2s ease;
    width: 200px;
    font-family: inherit;
    font-weight: normal;
    outline: none;
    box-shadow: none;
}
</style>
