import { SUPPORT_EMAIL, SUPPORT_FULL_NAME } from '~constants'

import useIsMobile from '~hooks/ui/useIsMobile'

import { Button } from '~components/ui/Button'

function Support() {
  const isMobile = useIsMobile()

  return (
    <div className="pb-8 container text-center">
      <h1 className="text-3xl font-semibold">
        Support
      </h1>
      <div className="mt-4">
        For any inquiry, please contact
        {' '}
        {SUPPORT_FULL_NAME.split(' ')[0]}
        {' '}
        at
        {' '}
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="text-primary hover:underline"
        >
          {SUPPORT_EMAIL}
        </a>
        .
      </div>
      <div>
        You can also use WhatsApp for a quicker response:
      </div>
      <div className="mt-8 w-fit mx-auto flex flex-col items-center gap-8">
        {isMobile && (
          <a
            href="https://wa.me/33666000577"
            target="_blank"
            rel="noreferrer"
          >
            <Button>
              Chat on WhatsApp
            </Button>
          </a>
        )}
        <img
          src="/images/dherault-whatsapp.png"
          alt="David Hérault WhatsApp"
          className="max-w-[256px]"
        />
      </div>
    </div>
  )
}

export default Support
