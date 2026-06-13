import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function HomePage() {
    return (
        <Layout>
            <section
                style={{
                    textAlign: "center",
                    padding: "60px 20px",
                }}
            >
                <h1
                    style={{
                        fontSize: "3rem",
                    }}
                >
                    Book The Turf
                </h1>

                <p
                    style={{
                        fontSize: "1.2rem",
                    }}
                >
                    Find football and cricket turfs near you.
                </p>

                <Link
                    to="/turfs"
                    style={{
                        display: "inline-block",
                        marginTop: "20px",
                        padding: "12px 24px",
                        backgroundColor: "#007bff",
                        color: "white",
                        borderRadius: "8px",
                        textDecoration: "none",
                    }}
                >
                    Explore Turfs
                </Link>
            </section>

            <section>
                <h2>Why Choose Us?</h2>

                <ul>
                    <li>Verified Turf Listings</li>
                    <li>Easy Discovery</li>
                    <li>Direct Contact Information</li>
                </ul>
            </section>
        </Layout>
    );
}

export default HomePage;