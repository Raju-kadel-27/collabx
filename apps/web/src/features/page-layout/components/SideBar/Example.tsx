
const Example = () => {
  return (
    <>
<div className='flex items-center justify-center min-h-screen from-purple-100 via-red-300 to-indigo-500 bg-gradient-to-br'>
    <div className='w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl'>
        <h1 className="text-xl mb-10 text-center">TAILWINDCSS ACCORDION WITH <code>&lt;details&gt; &lt;summary&gt;</code> HTML Tag</h1>
        <details className="w-full bg-white border border-blue-500 cursor-pointer mb-3">
            <summary className="w-full bg-white text-dark flex justify-between px-4 py-3  after:content-['+']">Morbi at sagittis velit</summary>
            <p className="px-4 py-3">
            Nunc posuere dapibus urna quis cursus. Mauris malesuada tincidunt diam vel placerat mi tincidunt ac. Nullam augue urna, venenatis ut blandit eget, auctor vel eros. In ut dolor ante
            </p>
        </details>

        <details className="w-full bg-white border border-blue-500 cursor-pointer mb-3">
            <summary className="w-full bg-white text-dark flex justify-between px-4 py-3 after:content-['+']">Etiam ut lacus in enim sagittis posuere at a elit</summary>
            <p className="px-4 py-3">
            Fusce sed laoreet ex. Aenean justo nisl, eleifend eget eleifend sit amet, imperdiet id libero. Suspendisse et tempus leo, et lacinia arcu. Etiam at ante in est efficitur fringilla eleifend nec tellus. Integer sed auctor lectus, nec ullamcorper arcu. Nullam nec eros elit. Nulla tempor massa ut quam elementum dignissim. Sed eu pulvinar est, vel vehicula dolor. Pellentesque in ante vel elit facilisis consectetur eu id felis
            </p>
        </details>

        <details className="w-full bg-white border border-blue-500 cursor-pointer mb-3">
            <summary className="w-full bg-white text-dark flex justify-between px-4 py-3  after:content-['+']">
            Nam auctor fringilla magna id porta
            </summary>
            <p className="px-4 py-3">
            Etiam maximus vitae eros eu vestibulum. Donec posuere, magna non tincidunt dignissim, magna tortor mollis augue, at maximus ante lacus vel tellus. Vestibulum vestibulum consectetur tortor id sagittis. Suspendisse nisi ipsum, pretium a lorem at, laoreet condimentum arcu
            </p>
        </details>

        <div className="text-right py-4">Create by <a href="https://hafidmaulana.vercel.app">Hafid Maulana</a></div>
    </div>
</div>
    
    </>
  )
}

export default Example