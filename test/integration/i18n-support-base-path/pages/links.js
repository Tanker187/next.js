import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Page(props) {
  const router = useRouter()
  const { nextLocale } = router.query
  const availableLocales = router.locales || []
  const safeLocale =
    availableLocales && availableLocales.includes(nextLocale)
      ? nextLocale
      : router.locale || router.defaultLocale

  return (
    <>
      <p id="links">links page</p>
      <p id="props">{JSON.stringify(props)}</p>
      <p id="router-locale">{router.locale}</p>
      <p id="router-default-locale">{router.defaultLocale}</p>
      <p id="router-locales">{JSON.stringify(router.locales)}</p>
      <p id="router-query">{JSON.stringify(router.query)}</p>
      <p id="router-pathname">{router.pathname}</p>
      <p id="router-as-path">{router.asPath}</p>
      <Link href="/another" locale={safeLocale} id="to-another">
        to /another
      </Link>
      <br />
      <Link href="/gsp" locale={safeLocale} id="to-gsp">
        to /gsp
      </Link>
      <br />
      <Link
        href="/gsp/fallback/first"
        locale={safeLocale}
        id="to-fallback-first"
      >
        to /gsp/fallback/first
      </Link>
      <br />
      <Link
        href="/gsp/fallback/hello"
        locale={safeLocale}
        id="to-fallback-hello"
      >
        to /gsp/fallback/hello
      </Link>
      <br />
      <Link
        href="/gsp/no-fallback/first"
        locale={safeLocale}
        id="to-no-fallback-first"
      >
        to /gsp/no-fallback/first
      </Link>
      <br />
      <Link href="/gssp" locale={safeLocale} id="to-gssp">
        to /gssp
      </Link>
      <br />
      <Link href="/gssp/first" locale={safeLocale} id="to-gssp-slug">
        to /gssp/first
      </Link>
      <br />
    </>
  )
}

// make SSR page so we have query values immediately
export const getServerSideProps = () => {
  return {
    props: {},
  }
}
