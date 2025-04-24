import { Link } from 'react-router'
import { BookOpen } from 'lucide-react'

import { SUPPORT_FULL_NAME } from '~constants'

import Logo from '~components/common/logos/Logo'
import XLogo from '~components/common/logos/XLogo'

function LandingFooter() {
  return (
    <footer className="mx-auto pt-16 md:pt-32 pb-16 md:pb-32 px-2 w-full max-w-4xl flex flex-col items-start md:flex-row md:justify-between gap-y-2">
      <div className="md:h-full flex flex-col gap-2">
        <Link to="/">
          <div className="flex items-center gap-4">
            <Logo />
            <div className="text-2xl font-bold font-display text-primary">
              World Collector
            </div>
          </div>
        </Link>
        <div className="grow" />
        <div className="text-sm text-neutral-700">
          Made with ❤️ in Finland 🇫🇮
        </div>
        <div className="text-sm text-neutral-700">
          Copyright ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          {SUPPORT_FULL_NAME}
        </div>
      </div>
      <div className="md:mt-1.5 flex flex-col md:flex-row gap-y-2 gap-x-12">
        <div className="mt-6 md:mt-0 flex flex-col gap-2 md:gap-4">
          <div className="md:mb-2 text-sm font-semibold">
            Company
          </div>
          <Link
            to="/support"
            className="text-sm text-neutral-700 hover:underline"
          >
            Support
          </Link>
          <Link
            to="#"
            target="_blank"
            className="text-sm text-neutral-700 hover:underline"
          >
            Feedback & Roadmap
          </Link>
          <Link
            to="/legal"
            className="text-sm text-neutral-700 hover:underline"
          >
            Privacy Policy & Terms of Service
          </Link>
        </div>
        <div className="mt-6 md:mt-0 flex flex-col gap-2 md:gap-4">
          <div className="md:mb-2 text-sm font-semibold">
            Social
          </div>
          <a
            href="https://x.com/dherault111"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-neutral-700 flex items-center gap-2 hover:underline"
          >
            <XLogo className="h-4 w-4" />
            X
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-neutral-700 flex items-center gap-2 hover:underline"
          >
            <BookOpen className="h-4 w-4" />
            Blog
          </a>
          {/* <a
            href="#"
            // target="_blank"
            rel="noreferrer"
            className="text-sm text-neutral-700 flex items-center gap-2 hover:underline"
          >
            <InstagramLogo className="h-4 w-4" />
            Instagram
          </a> */}
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter
