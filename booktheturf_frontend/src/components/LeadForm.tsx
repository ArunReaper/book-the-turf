import { useState } from "react";
import { createLead } from "../api/leadService";

function LeadForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const [success, setSuccess] = useState(false);

    const handleSubmit = async (
        event: React.FormEvent
    ) => {

        event.preventDefault();

        try {

            await createLead({
                name,
                email,
                phone,
                message
            });

            setSuccess(true);

            setName("");
            setEmail("");
            setPhone("");
            setMessage("");

        } catch (error) {

            console.error(error);

            alert("Failed to submit lead");
        }
    };

    return (
        <div
            style={{
                marginTop: "2rem",
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "8px"
            }}
        >

            <h2>I'm Interested</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />
                </div>

                <br />

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                </div>

                <br />

                <div>
                    <input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) =>
                            setPhone(e.target.value)
                        }
                    />
                </div>

                <br />

                <div>
                    <textarea
                        placeholder="Message"
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                    />
                </div>

                <br />

                <button type="submit">
                    Submit
                </button>

            </form>

            {success && (
                <p>
                    Thank you! We will contact you soon.
                </p>
            )}

        </div>
    );
}

export default LeadForm;