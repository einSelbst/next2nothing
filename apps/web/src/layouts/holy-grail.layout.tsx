import { Footer, Navigation } from 'components/layout'

const HolyGrailLayout = ({
  children,
}: {
  readonly children: React.ReactNode
}) => (
  <div id='holy-grail-layout'>
    <header>
      <Navigation success error={false} />
    </header>

    <aside aria-labelledby='comp1' className='left'>
      <p id='comp1'>Cryptids of Cornwall:</p>
      <dl>
        <dt>Beast of Bodmin</dt>
        <dd>A large feline inhabiting Bodmin Moor.</dd>

        <dt>Morgawr</dt>
        <dd>A sea serpent.</dd>

        <dt>Owlman</dt>
        <dd>A giant owl-like creature.</dd>
      </dl>
    </aside>

    <main>{children}</main>

    <aside aria-labelledby='comp2' className='right'>
      <h2 id='comp2'>Title for complementary area 2</h2>
      <p>Something which is supposed to be on the right side</p>
    </aside>

    <footer>
      <Footer />
    </footer>
    <style jsx>{`
      #holy-grail-layout {
        display: grid;
        height: 100vh;
        grid-template: auto 1fr auto / auto 1fr auto;
      }

      header {
        padding: 2rem;
        grid-column: 1 / 4;
      }

      main {
        padding: 1rem;
        background: gainsboro;
        font-family: Inter, system-ui, sans-serif;
      }

      .dark main {
        background-color: darkslategray;
        color: wheat;
      }

      aside {
        padding: 1rem;
        writing-mode: vertical-lr;
      }

      .left {
        grid-column: 1 / 2;
      }

      .right {
        grid-column: 3 / 4;
      }

      footer {
        padding: 2rem;
        text-align: center;
        grid-column: 1 / 4;
      }
    `}</style>
  </div>
)

export default HolyGrailLayout
