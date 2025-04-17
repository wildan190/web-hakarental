import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section
            className="text-white min-h-screen flex items-center bg-cover bg-center relative px-4 md:px-10 py-20"
            style={{ backgroundImage: "url('/assets/img/hero.jpg')" }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-5"></div>

            <div className="relative z-10 max-w-3xl w-full">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-snug">
                    <TypeAnimation
                        sequence={[
                            "Sewa Mobil Banjarmasin - Haka Rental",
                            2000,
                            "Haka Rental - Sewa Mobil Banjarmasin",
                            2000,
                            "Sewa Mobil Banjarmasin | Haka Rental",
                            2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                    />
                </h2>

                <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
                    Haka Rental siap memenuhi kebutuhan Sewa Mobil Anda dengan armada yang bersih,
                    terawat, dan nyaman. Gratis antar-jemput unit untuk wilayah Banjarmasin!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <a
                        href="https://wa.me/62822535456"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white font-semibold px-6 py-3 rounded hover:bg-green-600 transition text-center"
                    >
                        Pesan Sekarang
                    </a>
                    <Link
                        to="/mobil"
                        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition text-center"
                    >
                        Daftar Kendaraan
                    </Link>
                </div>
            </div>
        </section>
    );
}
