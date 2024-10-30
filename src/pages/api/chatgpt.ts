import OpenAI from 'openai'
import type { APIRoute } from 'astro'
import { api } from '@/utils/api'
import { INITIAL_PROMPT, BETTER_PROMPT } from '@/constants/prompt'

export const POST: APIRoute = async ({ request }) => {
  try {
    let memory = await request.json()

    memory = memory.map((item) => {
      return {
        role: item.role,
        content: JSON.stringify(item.content),
      }
    })

    const openai = new OpenAI({
      apiKey: import.meta.env.OPENAI_API_KEY,
    })

    const completion: any = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: JSON.stringify(BETTER_PROMPT) }, ...memory],
      n: 1,
    })

    const message = completion.choices[0].message

    message.content = JSON.parse(message.content)
    message.content = message.content.output ? message.content.output : message.content

    delete message.refusal

    return api.sendSuccessResponse(message)
  } catch (error) {
    return api.sendErrorResponse(error)
  }
}
