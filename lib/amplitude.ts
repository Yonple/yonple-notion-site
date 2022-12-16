import type { EventOptions } from '@amplitude/analytics-types'

let amplitude: any

export const initAmplitude = () => {
  if (amplitude) return
  amplitude = require('@amplitude/analytics-browser')
  amplitude.init('daee15a6986780dc943996cc00aedf38')
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
