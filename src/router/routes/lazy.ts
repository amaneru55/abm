import React from 'react'

const lazy = (name: string) => async () => {
  const { default: Component } = await import(`../../pages/${name}/index.ts`) as { default: React.FC };
  return { Component };
}

export default lazy

