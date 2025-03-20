import type { Social, Header, Link, Feature } from '@/types/nuxtTypes'
declare module 'nuxt/schema' {
    interface AppConfigInput {
      /** Theme configuration */
      theme?: {
        /** Primary app color */
        primaryColor?: string
      },
      app?: {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        ui?: any,
        version?: string
        meta?: {
          title?: string
          description?: string
          keywords?: string
          image?: string
          author?: string
          publisher?: string
          canonical?: string
        }
        features?: Feature[],
        socials?: Social[],
        headers?: Header,
        footer?: {
            references?: Link[],
            children?: Link[],
            contact?: Link[],
            copyright?: string
        },
        documents?: {
          sidebars?: Navigation[]
        }
      }
    }
  }
  
  export {}
  