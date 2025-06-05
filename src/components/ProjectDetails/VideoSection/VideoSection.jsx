import { VideoPlayer } from '@/utils/VideoPlayer/VideoPlayer'
import React from 'react'

import './VideoSection.scss';

export default function VideoSection({ data }) {
  return (
    <section className="video-section container grid">
      <VideoPlayer
        url={data?.video?.url}
        preview={data?.video?.poster}
        customClass='video-section__player'
      />
    </section>
  )
}
