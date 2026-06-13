import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 2rem",
                backgroundColor: "#222",
                color: "white",
            }}
        >
            <h2>BookTheTurf</h2>

            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                }}
            >
                <Link
                    to="/"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Home
                </Link>

                <Link
                    to="/turfs"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Turfs
                </Link>

                <Link
                    to="/contact"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Contact
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;