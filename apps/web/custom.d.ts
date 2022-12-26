// custom.d.ts
// fix issue with docker build, see https://stackoverflow.com/a/68931138
import 'react'

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean
    global?: boolean
  }
}
