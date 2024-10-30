<script lang="ts">
  /* Example:
    <Input
      id="1"
      prefix="person"
      error={data.name.error}
      bind:value={data.name.value}
      label="Nombre y apellidos"
      placeholder="Nombre"
      autocomplete="name"
    />
  */

  import { formatPrice } from '@/utils/generic'
  import Svg from '@/components/Svg.svelte'
  import { svgList } from '@/constants/svgStore'

  export let id: string = '1'
  export let autocomplete: AutoFill = ''
  export let label: string = ''
  export let maxlength: number = 300
  export let errorMessage: string = 'Completa este campo'
  export let placeholder: string = 'Mensaje'
  export let error: boolean = false
  export let prefix: string = ''
  export let sufix: string = ''
  export let type: 'textarea' | 'text' | 'number' | 'currency' | 'email' | 'password' | 'tel' = 'text'
  export let externalValidate = null
  export let theme: 'radius20' | '' = ''
  export let step: string = '1'
  export let min: string | undefined = undefined
  export let max: string | undefined = undefined

  export let value: string | number

  let focused: boolean = false

  $: isError = error

  if (type === 'password') sufix = 'eyeClosed'

  const typeAction = (node) => {
    node.type = type === 'email' || type === 'number' || type === 'tel' || type === 'password' ? type : 'text'
  }

  const inputValidate = (event) => {
    if (type === 'tel') {
      const firstChar = event.target.value[0] === '+' ? '+' : ''
      event.target.value = firstChar + event.target.value.replace(/[^0-9\s]/g, '')
    }

    if (type === 'currency') {
      event.target.value = formatPrice(event.target.value)
    }

    if (type === 'number') {
      if (max && value > max) event.target.value = max
      if (min && value < min) event.target.value = min

      event.target.value = parseFloat(event.target.value.toString().slice(0, maxlength))
    }
  }

  $: externalValidate = (msg: string) => {
    if (type === 'email') {
      const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
      isError = !emailRegEx.test(value.toString())

      if (isError) errorMessage = msg || 'La dirección email no es válida'

      return isError
    }
  }

  const sufixClick = () => {
    if (sufix === 'eye' || 'eyeClosed') {
      type = type === 'password' ? 'text' : 'password'
      sufix = type === 'password' ? 'eyeClosed' : 'eye'
    }
  }
</script>

<style lang="scss">
  $errorColor: rgb(138, 18, 18);
  .input-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    gap: 10px;
    padding: 15px 0;

    &.focused {
      &:after {
        width: 100%;
      }
    }

    &.withLabel {
      padding-top: 20px;
    }

    &.withPrefix {
      label {
        padding-left: 30px;
        &.filled {
          padding-left: 0;
        }
      }
    }

    &.isTextarea {
      label {
        top: 22px;
        bottom: unset;

        &.filled {
          transform: translateY(-20px);
        }
      }
    }

    label {
      position: absolute;
      bottom: 18px;
      left: 2px;
      transition: 0.3s ease;
      transform-origin: left;
      color: var(--colorText2);

      &.filled {
        transition: 0.3s ease;
        transform: translateY(-25px);
        color: var(--colorPrimary);
        font-size: 12px;
      }
    }

    input {
      position: relative;
      padding: 15px;
      border: 0;
      border: 1px solid var(--colorBorder);
      border-radius: var(--radius);
      background-color: transparent;
      font-size: 16px;
      width: 100%;
      outline: none;
      z-index: 1;
      color: var(--colorText3);
      backdrop-filter: blur(10px);

      &:-webkit-autofill {
        padding-left: 5px !important;
      }

      &.radius20 {
        border-radius: 20px;
      }

      &.isError {
        border-bottom: 1px solid $errorColor;
      }
    }

    textarea {
      padding: 2px;
      border: 0;
      border-bottom: 1px solid var(--colorBorder);
      background-color: transparent;
      color: var(--colorText);
      resize: vertical;
      width: 100%;
      outline: none;
      font-size: 16px;
      z-index: 1;
    }

    .input {
      position: relative;

      :global(svg) {
        width: 20px !important;
        height: 20px !important;
      }

      .prefix,
      .sufix {
        top: 0;
        display: flex;
        align-items: center;
        position: absolute;
        height: 100%;
      }

      .prefix {
        left: 0px;
        ~ input {
          padding-left: 30px;
        }
      }

      .sufix {
        right: 0px;
        ~ input {
          padding-right: 45px;
        }
      }
    }
    .error {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 5px;
      color: $errorColor;
      font-size: 12px;
      bottom: -8px;
      opacity: 0.8;

      :global(svg) {
        fill: $errorColor;
      }
    }
  }
</style>

<div class="input-wrapper" class:withLabel={label} class:withPrefix={prefix} class:focused class:isTextarea={type === 'textarea'}>
  {#if label}
    <label class:filled={value || value === 0} for="input-{id}">{label}</label>
  {/if}

  {#if type != 'textarea'}
    <div class="input">
      {#if prefix}
        <div class="prefix">
          {#if svgList.includes(prefix)}
            <Svg name={prefix} fill="var(--colorPrimary)" />
          {:else}
            {prefix}
          {/if}
        </div>
      {/if}

      {#if sufix}
        <button class="sufix" on:click={sufixClick}>
          {#if svgList.includes(sufix)}
            <Svg name={sufix} fill="var(--colorPrimary)" />
          {:else}
            {sufix}
          {/if}
        </button>
      {/if}

      {#if type === 'number'}
        <input
          type="number"
          {step}
          class={theme}
          id="input-{id}"
          {min}
          {max}
          {placeholder}
          name="input-{id}"
          {autocomplete}
          class:isError
          use:typeAction
          on:input={inputValidate}
          on:focus={() => (focused = true)}
          on:blur={() => (focused = false)}
          bind:value
          {maxlength}
        />
      {:else if type === 'password'}
        <input
          type="password"
          class={theme}
          id="input-{id}"
          name="input-{id}"
          {autocomplete}
          class:isError
          use:typeAction
          on:input={inputValidate}
          on:focus={() => (focused = true)}
          on:blur={() => (focused = false)}
          bind:value
          {maxlength}
        />
      {:else}
        <input
          type="text"
          class={theme}
          id="input-{id}"
          name="input-{id}"
          {autocomplete}
          {placeholder}
          autofocus
          class:isError
          use:typeAction
          on:input={inputValidate}
          on:focus={() => (focused = true)}
          on:blur={() => (focused = false)}
          bind:value
          {maxlength}
        />
      {/if}
    </div>
  {:else}
    <textarea id="textarea-{id}" name="textarea-{id}" {maxlength} bind:value cols="30" rows="3"></textarea>
  {/if}

  {#if isError}
    <span class="error">
      <Svg name="error" width="18" />
      {errorMessage}
    </span>
  {/if}
</div>
