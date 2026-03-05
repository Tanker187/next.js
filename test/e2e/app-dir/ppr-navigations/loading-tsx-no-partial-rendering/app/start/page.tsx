'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function Start() {
  const [href, setHref] = useState('')
  const safeHref = href.startsWith('/') ? href : ''
  return (
    <form>
      <input
        type="text"
        name="href"
        onChange={(e) => setHref(e.target.value)}
        value={href}
      />
      {safeHref === '' ? null : <Link href={safeHref}>Navigate</Link>}
    </form>
  )
}
