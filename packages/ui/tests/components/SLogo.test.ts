import { describe, expect, it } from 'vitest'
import SLogo from '../../components/SLogo.vue'
import ComponentRender from '../componentRender'

describe('SLogo', () => {
  it.each([
    ['default rendering', { props: {} }]
  ])('renders %s correctly', async (desc: string, options: { props: any }) => {
    const html = await ComponentRender(`SLogo ${desc}`, options, SLogo)
    expect(html).toMatchSnapshot()
  })
})
