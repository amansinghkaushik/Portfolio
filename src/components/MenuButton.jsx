function MenuButton({ variant = 'closed', onClick }) {
  const isOpen = variant === 'open'
  const squareBase =
    'h-[5px] w-[5px] origin-center bg-[#ffffff] transition-all duration-[400ms] ease-in-out'

  return (
    <button
      type="button"
      className="flex h-11 w-11 cursor-pointer items-center justify-center border-0 bg-transparent p-0"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-pressed={isOpen}
      onClick={onClick}
    >
      <div className="flex h-[19px] w-[19px] flex-col gap-[2px]" aria-hidden="true">
        <div className="flex h-[5px] w-[19px] items-center justify-between">
          <div
            className={`${squareBase} ${isOpen ? 'translate-x-[7px] rotate-45' : ''}`}
          />
          <div
            className={`${squareBase} ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`}
          />
        </div>

        <div className="flex h-[5px] w-[19px] items-center justify-center">
          <div
            className={`${squareBase} ${
              isOpen ? 'rotate-45 opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        <div className="flex h-[5px] w-[19px] items-center justify-between">
          <div
            className={`${squareBase} ${isOpen ? '-translate-y-[7px] rotate-45' : ''}`}
          />
          <div
            className={`${squareBase} ${isOpen ? '-translate-x-[7px] rotate-45' : ''}`}
          />
        </div>
      </div>
    </button>
  )
}

export default MenuButton