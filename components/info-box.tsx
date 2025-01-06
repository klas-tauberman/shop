export function InfoBox() {
  return (
    <div className="bg-[#FDF4E7] p-4 sm:p-6 rounded-lg">
      <h2 className="text-lg sm:text-xl font-medium mb-4">Information</h2>
      <p className="mb-4 sm:mb-6 text-base">
        Din beställning kommer vara färdig inom 2-3 dagar för upphämtning. Du får ett meddelande i god tid innan.
      </p>
      <h3 className="text-base sm:text-lg font-medium mb-2">Har du några frågor?</h3>
      <p className="text-base">
        Du når mig enklast på{' '}
        <a href="tel:0707438595" className="underline">
          0707438595
        </a>
        .
      </p>
    </div>
  )
}

