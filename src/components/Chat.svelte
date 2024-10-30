<script lang="ts">
  import Input from '@/components/Input.svelte'
  import Svg from '@/components/Svg.svelte'

  import Message from '@/components/Message.svelte'
  import { api } from '@/utils/api'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  let value: string = ''
  let loading: boolean = false
  let memory: any = []
  let compacted: boolean = false

  let HTMLChat: HTMLElement

  const saveHistory = () => {
    //window.localStorage.setItem('chapters', )
  }

  const apiChatGPT = async (role: string = 'assistant') => {
    if (role === 'user') {
      memory = [
        ...memory,
        {
          role: 'user',
          content: [{ character: 'Prota', message: value }],
        },
      ]

      value = ''

      setTimeout(() => {
        const lastMessage = document.querySelector('.chat .message:last-child')
        if (lastMessage) lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }, 400)
    }

    loading = true
    const response = await api.post('/api/chatgpt', memory)
    loading = false

    console.log(response.data)

    memory = [...memory, response.data]

    setTimeout(() => {
      const lastMessage = document.querySelector('.chat .message:last-child')
      if (lastMessage) lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 400)
  }

  const sendUserResponse = async () => {
    if (loading) return
    await apiChatGPT('user')
  }

  const onScroll = () => (compacted = HTMLChat.scrollTop > 0)

  onMount(async () => {
    await apiChatGPT()
  })
</script>

<style lang="scss">
  @use 'src/sass/mixins.scss' as *;

  .g-wrapper {
    transition: 0.3s ease;
    display: grid;
    height: 100dvh;
    grid-template-rows: fit-content(100%) 1fr 100px;

    &.compacted {
      h1 {
        font-size: 20px;
        padding-top: 20px;
      }
    }

    h1 {
      position: relative;
      transition: 0.3s ease;
      font-size: 70px;
      padding-top: 50px;
      padding-bottom: 20px;
      text-align: center;
      background: linear-gradient(60deg, rgb(225, 0, 255), #00bfff); /* Degradado de púrpura a azul */
      -webkit-background-clip: text; /* Para soportar navegadores WebKit (Chrome, Safari) */
      -webkit-text-fill-color: transparent; /* Para hacer el texto en sí transparente */
      background-clip: text; /* Clip del fondo al texto (Firefox y navegadores modernos) */
      color: transparent; /* Hace el color del texto transparente */

      &::after {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        padding-top: 10px;
        content: 'MythicLingo';
        font-family: inherit;
        -webkit-text-fill-color: black;
        z-index: -1;
        font-weight: bold;
      }

      @include notDesktop {
        font-size: 40px;
      }
    }

    .chapter {
      font-family: 'Rye';
      text-align: center;
      font-size: 30px;
      padding-top: 20px;

      @include notDesktop {
        font-size: 20px;
      }
    }

    .chat {
      overflow-y: scroll;
    }

    .send-messages {
      position: relative;
      display: flex;
      align-items: center;
      height: 60px;
      gap: 5px;
      margin: 10px 0;

      .loading {
        position: absolute;
        top: -40px;
        left: 10px;
      }
    }
  }
</style>

<div class="g-wrapper" class:compacted>
  <h1>MythicLingo</h1>

  <div class="chat" bind:this={HTMLChat} on:scroll={onScroll}>
    {#each memory as m}
      {#each m.content as chat}
        {#if chat.chapter}
          <h2 class="chapter">{@html chat.chapter}</h2>
        {/if}
        {#if chat.message}
          <Message message={chat.message} character={chat.character} />
        {/if}
      {/each}
    {/each}
  </div>

  <div class="send-messages">
    {#if loading}
      <div class="loading" transition:fade>
        <Svg name="loading2" width="40" height="40" />
      </div>
    {/if}

    <Input bind:value placeholder="Escribe un mensaje..." />

    <button class="g-btn" on:click={sendUserResponse}> Hablar </button>
  </div>
</div>

<svelte:window
  on:keydown={(ev) => {
    if (ev.key === 'Enter') sendUserResponse()
  }}
/>
