function Footer() {
    return (
        <footer className="bg-steel w-full border-t border-steel-300">
            <nav className="max-w-[1400px] flex flex-col items-center mx-auto px-6 py-4 lg:px-8 lg:py-5">
                {/* 
                <ul className="w-full flex items-center justify-around mb-5 md:gap-5 lg:gap-8 lg:justify-center">
                    <li>
                        <a>About</a>
                    </li>
                    <li>
                        <a>Privacy</a>
                    </li>
                    <li>
                        <a>Imprint</a>
                    </li>
                </ul>                
                */}
                <span className="text-steel-200">© Nils Siemsen</span>
            </nav>
        </footer>
    )
}

export default Footer