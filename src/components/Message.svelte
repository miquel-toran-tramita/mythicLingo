<script lang="ts">
  export let message: string = ''
  export let character: string = 'Narrador'
</script>

<style lang="scss">
  @use 'src/sass/mixins.scss' as *;
  .message {
    animation: fadeIn 1s ease-in-out forwards;
    margin: 20px 0;
    font-size: 20px;
    line-height: 1.6;

    @include notDesktop {
      font-size: 14px;
    }

    :global(p) {
      padding: 10px 0;
      text-align: justify;
    }

    .name {
      color: rgba(0, 0, 0, 0.4);
      font-family: 'Rye';
    }

    &.Pixie,
    &.Cronos,
    &.Gramo,
    &.Zephirot,
    &.Prota {
      border-radius: var(--radius);
      padding: 10px 15px;
      max-width: 80%;
      width: fit-content;
      color: var(--colorText);

      max-width: 90%;

      p {
        text-align: left;
      }
    }
    &.Pixie {
      background: linear-gradient(135deg, rgba(255, 237, 129, 1) 0%, rgba(255, 130, 248, 1) 100%);
    }

    &.Cronos {
      background: linear-gradient(135deg, rgba(129, 255, 251, 1) 0%, rgba(146, 255, 135, 1) 100%);
    }

    &.Zephirot {
      background: linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%);
    }

    &.Prota {
      margin-left: auto;
      background: linear-gradient(135deg, rgb(212, 212, 212) 0%, rgb(151, 151, 151) 100%);

      p {
        text-align: right;
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<div class="message {character}">
  {#if character != 'Narrador' && character != 'Prota'}
    <span class="name">
      {character}
    </span>
  {/if}
  <p>
    {@html message}
  </p>
</div>
