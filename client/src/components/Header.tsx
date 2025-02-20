import { Link } from "react-router"

function Header() {
    return (
        <header className="bg-steel w-full border-b border-steel-300 shadow-2xl">
            <nav className="container px-6 py-4 flex items-center justify-between lg:px-8 lg:py-5">
                <h1 className="text-xl"><Link to="/">Scrum Poker</Link><span className="text-lg text-steel-50 ml-[6px]">by Nils</span></h1>
                <ul className="gap-3 hidden lg:flex">
                    <li>
                        <a href="https://nils-siemsen.de/en/imprint" className="text-steel-50 transition-colors hover:text-sky">Imprint</a>
                    </li>
                    <li>
                        <a href="https://nils-siemsen.de/en/privacy" className="text-steel-50 transition-colors hover:text-sky">Data Privacy</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header