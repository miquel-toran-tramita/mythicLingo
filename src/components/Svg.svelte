<script lang="ts">
  import { svgStore } from '@/constants/svgStore'

  export let name: string = ''
  export let fill: string = 'var(--colorText)'
  export let width: string = '25'
  export let height: string = '25'
  export let className: string = ''

  className = className ? `class="${className}"` : ''

  $: SVG = svgStore[name]
    ? `<svg xmlns="http://www.w3.org/2000/svg" fill="${fill}" width="${width}px" height="${height}px" ${className} ${
        svgStore[name].split('<svg')[1]
      }`
    : ''
</script>

{#if SVG}
  {@html SVG}
{/if}
