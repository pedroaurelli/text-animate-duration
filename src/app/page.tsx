'use client'

import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'

const text = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non posuere lacus. Duis vitae sapien porta, condimentum ex sit amet, semper tortor. Nunc ac neque ac nibh congue interdum. Donec elementum, massa ac cursus fermentum, est neque cursus elit, et porttitor magna mi quis mi. Curabitur scelerisque, augue in vestibulum porttitor, quam odio interdum odio, ut consectetur odio elit sit amet arcu. Sed dictum faucibus quam, eget porttitor urna laoreet vel. Maecenas a auctor neque. Mauris ullamcorper erat lectus, sit amet convallis augue lacinia eget. Nulla blandit, ex ac varius luctus, lectus urna fringilla mi, eu ullamcorper lorem magna nec lorem. Vivamus interdum risus eget lectus placerat vulputate. Nam mollis tortor posuere euismod finibus. Praesent sollicitudin magna et massa luctus, eu consectetur ex venenatis. Donec et purus non est dictum tempus. Donec vitae turpis vitae est vehicula tincidunt ac blandit nibh. Maecenas sagittis elit sed nibh volutpat, sed vehicula dolor pellentesque. Proin tempus sem hendrerit tincidunt tempor.

Sed metus velit, cursus in vestibulum in, ornare nec nibh. Nunc finibus metus dictum, mollis augue nec, faucibus orci. Nunc metus massa, laoreet in finibus sed, fermentum quis velit. Suspendisse at quam nulla. Aenean pellentesque, justo eu pellentesque condimentum, turpis neque malesuada nulla, sit amet iaculis libero magna sed urna. Aenean luctus ligula in tempor mattis. In vel ultricies tortor. Quisque non erat at nibh pretium accumsan eget vitae risus. Etiam justo velit, consectetur nec orci non, aliquet consequat nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer non quam turpis.

Donec et diam ultricies, aliquam erat id, venenatis ante. Suspendisse finibus ullamcorper dolor, a rhoncus nisi porttitor ac. Vestibulum auctor semper faucibus. Cras cursus, ligula sit amet lacinia pulvinar, felis elit congue orci, in efficitur sem purus eu orci. Nullam nunc est, molestie sit amet arcu ac, ornare interdum odio. Maecenas suscipit orci quam, eget feugiat mi gravida vel. Maecenas eu tellus vel mauris varius consectetur in rhoncus lectus. Nunc sit amet imperdiet lacus, eget sagittis risus. Praesent ac massa viverra, luctus risus eget, vehicula arcu. Duis imperdiet mi gravida, dapibus turpis iaculis, elementum nulla. Nulla a vestibulum nulla. Donec sed elementum velit, ut laoreet lacus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non posuere lacus. Duis vitae sapien porta, condimentum ex sit amet, semper tortor. Nunc ac neque ac nibh congue interdum. Donec elementum, massa ac cursus fermentum, est neque cursus elit, et porttitor magna mi quis mi. Curabitur scelerisque, augue in vestibulum porttitor, quam odio interdum odio, ut consectetur odio elit sit amet arcu. Sed dictum faucibus quam, eget porttitor urna laoreet vel. Maecenas a auctor neque. Mauris ullamcorper erat lectus, sit amet convallis augue lacinia eget. Nulla blandit, ex ac varius luctus, lectus urna fringilla mi, eu ullamcorper lorem magna nec lorem. Vivamus interdum risus eget lectus placerat vulputate. Nam mollis tortor posuere euismod finibus. Praesent sollicitudin magna et massa luctus, eu consectetur ex venenatis. Donec et purus non est dictum tempus. Donec vitae turpis vitae est vehicula tincidunt ac blandit nibh. Maecenas sagittis elit sed nibh volutpat, sed vehicula dolor pellentesque. Proin tempus sem hendrerit tincidunt tempor.

Sed metus velit, cursus in vestibulum in, ornare nec nibh. Nunc finibus metus dictum, mollis augue nec, faucibus orci. Nunc metus massa, laoreet in finibus sed, fermentum quis velit. Suspendisse at quam nulla. Aenean pellentesque, justo eu pellentesque condimentum, turpis neque malesuada nulla, sit amet iaculis libero magna sed urna. Aenean luctus ligula in tempor mattis. In vel ultricies tortor. Quisque non erat at nibh pretium accumsan eget vitae risus. Etiam justo velit, consectetur nec orci non, aliquet consequat nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer non quam turpis.

Donec et diam ultricies, aliquam erat id, venenatis ante. Suspendisse finibus ullamcorper dolor, a rhoncus nisi porttitor ac. Vestibulum auctor semper faucibus. Cras cursus, ligula sit amet lacinia pulvinar, felis elit congue orci, in efficitur sem purus eu orci. Nullam nunc est, molestie sit amet arcu ac, ornare interdum odio. Maecenas suscipit orci quam, eget feugiat mi gravida vel. Maecenas eu tellus vel mauris varius consectetur in rhoncus lectus. Nunc sit amet imperdiet lacus, eget sagittis risus. Praesent ac massa viverra, luctus risus eget, vehicula arcu. Duis imperdiet mi gravida, dapibus turpis iaculis, elementum nulla. Nulla a vestibulum nulla. Donec sed elementum velit, ut laoreet lacus.

`

function formattedNumber(num: number) {
  return num.toFixed(2)
}

function estimateServerDuration(chars: number) {
  // Pontos conhecidos
  const x1 = 277, y1 = 1822.1;
  const x2 = 3087, y2 = 17442.4;

  // Coeficiente angular (m)
  const m = (y2 - y1) / (x2 - x1);

  // Coeficiente linear (b)
  const b = y1 - m * x1;

  // Retorna o tempo estimado
  return m * chars + b;
}

function calculateAnimationDuration(responseSize: number, maxAnimation: number, minAnimation: number, largeTextLength: number) {
  const proporcao = Math.min(responseSize / largeTextLength, 1)
  const duracao = maxAnimation - proporcao * (maxAnimation - minAnimation)

  return Math.round(duracao);
}

export default function Home() {
  const [minDuration, setMinDuration] = useState<number>(2)
  const [maxDuration, setMaxDuration] = useState<number>(30)
  const [responseSize, setResponseSize] = useState<number>((text.length / 3))
  const [largeTextValue, setLargeTextValue] = useState<number>((text.length / 2))

  const [serverResponseDuration, setServerResponseDuration] = useState<number>(0)
  const [finalResponse, setFinalResponse] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleGenerate = () => {
    setFinalResponse(text.slice(0, responseSize!))

    /*
      Smallest response:
      size: 277 caracteres
      duration: 1822.1 ms
    */
    setIsLoading(true)

    const timeout = setTimeout(() => {
      setIsLoading(false)

      return (
        clearTimeout(timeout)
      )
    }, serverResponseDuration)
  }

  const disabledButton = !minDuration || !maxDuration || !largeTextValue || !responseSize

  return (
    <div className='grid grid-cols-2'>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-8">Text animation duration</h1>
        <div className='flex flex-col gap-3'>
          <div>
            <label className='text-neutral-400'>Assistant output length ({(responseSize).toFixed(0)} chars)</label>
            <input
              type='range'
              min={0}
              max={text.length}
              value={formattedNumber(responseSize)}
              onChange={(e) => {
                setResponseSize(parseInt(e.target.value))
                setServerResponseDuration(estimateServerDuration(responseSize!))
              }}
              className='w-full'
            />
          </div>
          <div className='flex flex-col gap-3 border-1 p-2 rounded-md border-neutral-700'>
            <div className='flex flex-col'>
              <label className='text-neutral-400'>Large text length ({largeTextValue} chars)</label>
              <input
                type='range'
                min={0}
                max={text.length}
                value={formattedNumber(largeTextValue)}
                onChange={(e) => setLargeTextValue(parseInt(e.target.value))}
                className='w-full'
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-neutral-400'>Min char animation duration ({minDuration}ms)</label>
              <input
                type='range'
                min={0}
                max={50}
                value={formattedNumber(minDuration)}
                onChange={(e) => setMinDuration(parseInt(e.target.value))}
                className='w-full'
              />
            </div>
            <div className='flex flex-col'>
              <label className='text-neutral-400'>Max char animation duration ({maxDuration}ms)</label>
              <input
                type='range'
                min={0}
                max={50}
                value={formattedNumber(maxDuration)}
                onChange={(e) => setMaxDuration(parseInt(e.target.value))}
                className='w-full'
              />
            </div>
          </div>
          {!disabledButton && (
            <button
              className='bg-neutral-700 p-2 rounded-md transition-all cursor-pointer hover:bg-neutral-600'
              onClick={handleGenerate}
            >
              Generate
            </button>
          )}
        </div>
        <div className='font-normal text-purple-400 mt-4'>
          <p className='text-sm'>Server response time (loading) = {formattedNumber(serverResponseDuration / 1000)}s</p>
          <p className='text-sm'>Char animation duration = {calculateAnimationDuration(responseSize, maxDuration, minDuration, largeTextValue)}ms</p>
          <p className='text-sm'>Total response time (animation + Server response time) = {formattedNumber(((calculateAnimationDuration(responseSize, maxDuration, minDuration, largeTextValue) * responseSize) + serverResponseDuration) / 1000)}s</p>
        </div>
      </div>
      <div className='bg-neutral-900 w-full h-full p-4'>
        <h2 className='text-3xl font-semibold mb-4'>
          Assistant output
          {serverResponseDuration && (
            <div className='font-normal text-purple-400'>
              <p className='text-sm'>Server response time (loading) = {formattedNumber(serverResponseDuration / 1000)}s</p>
              <p className='text-sm'>Char animation duration = {calculateAnimationDuration(responseSize, maxDuration, minDuration, largeTextValue)}ms</p>
              <p className='text-sm'>Total response time (animation + Server response time) = {formattedNumber(((calculateAnimationDuration(responseSize, maxDuration, minDuration, largeTextValue) * responseSize) + serverResponseDuration) / 1000)}s</p>
            </div>
          )}
        </h2>
        <>
          {isLoading && <div className='animate-pulse bg-neutral-700 w-full h-4 rounded-md' />}
          {!isLoading && finalResponse && (
            <div className='inline-block'>
              <div className='size-6 rounded-full ring-2' />
              <p className='text-neutral-300 mt-2 p-2 bg-neutral-800 rounded-md w-full'>
                <TypeAnimation
                  sequence={[
                    finalResponse
                  ]}
                  speed={{
                    type: 'keyStrokeDelayInMs',
                    value: calculateAnimationDuration(responseSize, maxDuration, minDuration, largeTextValue)
                  }}
                  wrapper="span"
                  cursor={true}
                  className='text-base'
                />
              </p>
            </div>
          )}
        </>
      </div>
    </div>
  )
}
