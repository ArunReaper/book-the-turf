import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div>
            <h1>Book The Turf</h1>

            <p>
                Find football and cricket turfs near you.
            </p>

            <Link to="/turfs">
                <button>
                    Explore Turfs
                </button>
            </Link>
        </div>
    );
}

export default HomePage;