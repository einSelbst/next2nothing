import Link from 'next/link'

type MenuItemPropertyType = {
  readonly path: string
  readonly title: string
}

/**
 * A single Menu Item for usage in navigation
 */
const MenuItem = ({
  path,
  title,
}: MenuItemPropertyType): React.ReactElement => (
  <>
    <Link href={path}>{title}</Link>
    &nbsp; &nbsp; &nbsp;
  </>
)

export default MenuItem
