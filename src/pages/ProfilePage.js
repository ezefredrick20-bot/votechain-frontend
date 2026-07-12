import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import GlassCard from "../components/GlassCard";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const nin =
                    localStorage.getItem("userNIN");

                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/user/${nin}`
                );

                const data = await res.json();

                setUser(data);

            }

            catch (error) {

                console.error(error);

            }

        };

        loadProfile();

    }, []);

    if (!user) {

        return (

            <div className="text-white text-center mt-20">

                Loading Profile...

            </div>

        );

    }

    return (

        <>
            <Navbar />

            <motion.div

                initial={{ opacity: 0 }}

                animate={{ opacity: 1 }}

                className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-black p-8"

            >

                <h1 className="text-5xl font-bold text-center text-white mb-10">

                    👤 My Profile

                </h1>

                <div className="max-w-5xl mx-auto">

                    <GlassCard>

                        <div className="grid md:grid-cols-2 gap-8">

                            <ProfileItem
                                title="First Name"
                                value={user.firstName}
                            />

                            <ProfileItem
                                title="Last Name"
                                value={user.lastName}
                            />

                            <ProfileItem
                                title="Middle Name"
                                value={user.middleName || "-"}
                            />

                            <ProfileItem
                                title="Phone"
                                value={user.phone}
                            />

                            <ProfileItem
                                title="NIN"
                                value={user.nin}
                            />

                            <ProfileItem
                                title="Date of Birth"
                                value={new Date(user.dob).toLocaleDateString()}
                            />

                            <ProfileItem
                                title="Wallet"
                                value={
                                    user.wallet
                                        ? user.wallet
                                        : "Not Connected"
                                }
                            />

                            <ProfileItem
                                title="Voting Status"
                                value={
                                    user.hasVoted
                                        ? "Already Voted"
                                        : "Not Yet Voted"
                                }
                            />

                        </div>

                    </GlassCard>

                    <div className="text-center mt-10">

                        <button

                            onClick={() => navigate("/")}

                            className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl text-white"

                        >

                            Back Home

                        </button>

                    </div>

                </div>

            </motion.div>

        </>

    );

}

function ProfileItem({ title, value }) {

    return (

        <div>

            <h2 className="text-gray-400">

                {title}

            </h2>

            <p className="text-green-400 text-xl font-bold">

                {value}

            </p>

        </div>

    );

}