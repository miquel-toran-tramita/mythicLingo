<script lang="ts">
  import Input from '@/components/Input.svelte'
  import Button from '@/components/Button.svelte'

  import Message from '@/components/Message.svelte'
  import { api } from '@/utils/api'
  import { onMount } from 'svelte'

  let value: string = ''
  let loading: boolean = false
  let memory: any = []
  let compacted: boolean = false

  let HTMLChat: HTMLElement

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
    }

    loading = true
    const response = await api.post('/api/chatgpt', memory)
    loading = false

    memory = [...memory, response.data]

    setTimeout(() => {
      const lastMessage = document.querySelector('.chat .message:last-child')
      if (lastMessage) lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 400)
  }

  const sendUserResponse = async () => await apiChatGPT('user')

  const onScroll = () => (compacted = HTMLChat.scrollTop > 0)

  onMount(async () => await apiChatGPT())
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
      transition: 0.3s ease;
      font-size: 70px;
      padding-top: 50px;
      padding-bottom: 20px;
      text-align: center;
      background: linear-gradient(60deg, #6a5acd, #00bfff, rgb(225, 0, 255)); /* Degradado de púrpura a azul */
      -webkit-background-clip: text; /* Para soportar navegadores WebKit (Chrome, Safari) */
      -webkit-text-fill-color: transparent; /* Para hacer el texto en sí transparente */
      background-clip: text; /* Clip del fondo al texto (Firefox y navegadores modernos) */
      color: transparent; /* Hace el color del texto transparente */

      @include notDesktop {
        font-size: 40px;
      }
    }

    .chat {
      overflow-y: scroll;
    }

    .send-messages {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
</style>

<div class="g-wrapper" class:compacted>
  <h1>MythicLingo</h1>

  <div class="chat" bind:this={HTMLChat} on:scroll={onScroll}>
    {#each memory as m}
      {#each m.content as chat}
        {#if chat.message}
          <Message message={chat.message} character={chat.character} />
        {/if}
      {/each}
    {/each}

    {#if loading}
      ...
    {/if}
  </div>

  <div class="send-messages">
    <Input bind:value placeholder="Escribe un mensaje..." />
    <Button type="main" click={sendUserResponse} icon="arrow"></Button>
  </div>
</div>

<svelte:window
  on:keydown={(ev) => {
    if (ev.key === 'Enter') sendUserResponse()
  }}
/>
