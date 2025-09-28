<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  totalPages: number
  currentPage?: number
  maxVisiblePages?: number
  slug: string
}

const props = withDefaults(defineProps<Props>(), {
  totalPages: 1,
  currentPage: 1,
  maxVisiblePages: 5
})

const visiblePages = computed(() => {
  const pages: number[] = []
  const half = Math.floor(props.maxVisiblePages / 2)
  let start = Math.max(1, props.currentPage - half)
  let end = Math.min(props.totalPages, start + props.maxVisiblePages - 1)
  
  // Adjust start if we're near the end
  if (end - start + 1 < props.maxVisiblePages) {
    start = Math.max(1, end - props.maxVisiblePages + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})
</script>

<template>
  <div class="pagination-container">
    <div class="pagination-controls">
      <a
        :class="['pagination-btn', 'prev-btn', { disabled: currentPage === 1 }]"
        title="First page"
        :href="currentPage === 1 ? undefined : `${slug}${1}`"
      >
        ««
      </a>

      <a
        :class="['pagination-btn', 'prev-btn', { disabled: currentPage === 1 }]"
        title="Previous page"
        :href="currentPage === 1 ? undefined : `${slug}${currentPage-1}`"
      >
        «
      </a>

      <a
        v-for="page in visiblePages"
        :key="page"
        :class="['pagination-btn', 'page-btn', { active: page === currentPage }]"
        :href="`${slug}${page}`"
      >
        {{ page }}
      </a>

      <a
        :class="['pagination-btn', 'next-btn', { disabled: currentPage === totalPages }]"
        title="Next page"
        :href="currentPage === totalPages ? undefined : `${slug}${currentPage+1}`"
      >
        »
      </a>

      <a
        :class="['pagination-btn', 'last-btn', { disabled: currentPage === totalPages }]"
        title="Last page"
        :href="currentPage === totalPages ? undefined : `${slug}${totalPages}`"
      >
        »»
      </a>
    </div>
  </div>
</template>

<style scoped>
.pagination-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 20px;
}

.page-size-selector {
  display: flex;
  align-items: center;
  gap: 10px;
}

.page-size-selector label {
  font-weight: 500;
  color: #2c3e50;
}

.page-size-select {
  padding: 6px 12px;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  background: white;
  font-size: 14px;
}

.pagination-controls {
  display: flex;
  gap: 5px;
  align-items: center;
}

.pagination-btn {
  padding: 8px 0px;
  border: 1px solid #cbd5e0;
  background: white;
  color: #4a5568;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s ease;
  min-width: 40px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  background: #e2e8f0;
  border-color: #a0aec0;
}

.pagination-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f7fafc;
}

.pagination-btn.active {
  background: #3d585d;
  color: white;
  border-color: #3d585d;
}

.pagination-btn.active:hover {
  background: #587f86;
  border-color: #587f86;
}

.page-info {
  color: #5a6c7d;
  font-size: 14px;
  text-align: center;
}

@media (max-width: 768px) {
  .pagination-container {
    padding: 15px;
  }
  
  .pagination-controls {
    gap: 2px;
  }
  
  .pagination-btn {
    padding: 6px 0px;
    font-size: 12px;
    min-width: 32px;
  }
  
  .page-info {
    font-size: 12px;
  }
}
</style>