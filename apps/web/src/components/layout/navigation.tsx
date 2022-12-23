import MenuItem from './menu-item'

import HeartIcon from 'components/icons/heart.icon'

type Props = {
  readonly success: boolean
  readonly error: boolean
}

const Navigation = ({ success, error }: Props) => (
  <>
    <nav title='Site Navigation'>
      <MenuItem path='/' title='Home' />
      <MenuItem path='/dog' title='Dog' />
      <MenuItem path='/page-1' title='Page 1' />
      <MenuItem path='/fauna-csr' title='Fauna CSR' />
      <MenuItem path='/fauna-ssg' title='Fauna SSG' />
      <MenuItem path='/first-amp' title='First AMP' />
      <MenuItem path='/hybrid/one' title='One' />
      <MenuItem path='/hybrid/post/1' title='Post 1' />
      <MenuItem path='/hybrid/post/4' title='Post 4' />
      <MenuItem path='/hybrid/foo/bar' title='Foo Bar' />
      <MenuItem path='/legal/about' title='About' />
      <MenuItem path='/legal/privacy' title='Privacy' />
      <MenuItem path='/legal/contact' title='Contact' />
      {/* @see https://github.com/sindresorhus/react-extras#choose */}
      <div>
        {(() => {
          if (success) {
            return <span>{success}</span>
          }
          if (error) {
            return <span>{error}</span>
          }
          return <span>�</span>
        })()}
      </div>
      <HeartIcon className='text-red-700' height='16px' width='48px' />
      <HeartIcon className='text-purple-700' height='32px' width='48px' />
      <HeartIcon className='text-pink-700' height='48px' width='48px' />
    </nav>
    <div className='mt-2'>
      <form role='search'>
        <label htmlFor='search-global'>
          <span>Discover Something (not yet)</span>
          {/* ToDo [+next-i18next]: localize title */}
          <input
            aria-label='search text'
            className='block w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 leading-tight focus:border-gray-600 focus:bg-white focus:outline-none'
            id='search-global'
            name='Search Bar'
            placeholder='Search...'
            title='Search on Overnext'
            type='search'
          />
        </label>
        <button type='submit'>search</button>
      </form>
    </div>
  </>
)

export default Navigation
