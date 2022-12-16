import type { EventOptions } from '@amplitude/analytics-types'

let amplitude: any

export const initAmplitude = () => {
  amplitude = require('@amplitude/analytics-browser')
  amplitude.init('7d66e2303d9d468465d11de153bd1c32')
}

export const logEvent = (
  eventType: string,
  eventProperties?: Record<string, any> | undefined,
  eventOptions?: EventOptions | undefined
) => {
  if (!amplitude) return
  if (process.env.NODE_ENV !== 'production')
    return console.log(
      `[ANALAYTICS] ${eventType}${
        eventProperties ? `: ${JSON.stringify(eventProperties)}` : ``
      }`
    )
  return amplitude.amplitudeLogEvent(eventType, eventProperties, eventOptions)
}
