<script lang="ts">
  import Svg from '@/components/Svg.svelte'

  export let disabled: boolean = false
  export let type: 'main' | 'secondary' = 'main'
  export let width: string = ''
  export let customClass: string = ''
  export let icon: string = ''
  export let loading: boolean = false
  export let click = () => {}
</script>

<style lang="scss">
  .btn {
    transition: 0.3s ease;

    border-radius: var(--radius);
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
    max-width: 100%;
    height: 55px;
    padding: 1px;

    min-height: 50px;
    padding: 10px 20px;
    text-decoration: none;
    user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    cursor: pointer;

    :global(.svg-loading) {
      stroke: var(--colorText3);
    }

    &:hover {
      background-color: var(--colorSecondary);
      color: var(--colorPrimary);

      :global(svg) {
        fill: var(--colorPrimary);
      }

      :global(.svg-loading) {
        stroke: var(--colorPrimary);
      }
    }

    &:active {
      transform: scale(0.9);
    }

    &:active,
    &:hover {
      outline: 0;
    }

    &[disabled] {
      cursor: unset;
      border: 1px solid var(--colorBorder);
      opacity: 0.3;
    }

    :global(svg) {
      transition: 0.3s ease;
      transform: rotate(-90deg);
    }
    &.btn-main {
      color: var(--colorText3);
      background: linear-gradient(60deg, #00bfff, rgb(225, 0, 255)); /* Degradado de púrpura a azul */

      &:hover {
        background-color: transparent;
        color: var(--colorPrimary);
      }
    }

    &.btn-secondary {
      border: 1px solid var(--colorBorder);
      color: var(--colorText2);
    }
  }
</style>

<button class="btn btn-{type} {customClass}" style={width ? `width: ${width}` : ''} on:click={click} {disabled}>
  {#if loading}
    <Svg name="loading" className="svg-loading" />
  {:else if icon}
    <Svg name={icon} fill="var(--colorText3)" />
  {/if}
  <slot />
</button>
