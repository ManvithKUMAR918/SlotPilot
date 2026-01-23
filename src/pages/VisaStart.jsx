import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Globe2, Sparkles, ArrowRight } from "lucide-react";

const COUNTRIES = [
    "India", "United States", "United Kingdom", "Canada", "Australia",
    "Germany", "Ireland", "United Arab Emirates", "France", "Italy",
    "Japan", "Singapore", "New Zealand",
];

const COUNTRY_EMOJI = {
    India: "🇮🇳", "United States": "🇺🇸", "United Kingdom": "🇬🇧",
    Canada: "🇨🇦", Australia: "🇦🇺", Germany: "🇩🇪", Ireland: "🇮🇪",
    "United Arab Emirates": "🇦🇪", France: "🇫🇷", Italy: "🇮🇹",
    Japan: "🇯🇵", Singapore: "🇸🇬", "New Zealand": "🇳🇿",
};

const VisaStart = () => {
    const navigate = useNavigate();
    const [passportCountry, setPassportCountry] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const sortedCountries = useMemo(
        () => [...COUNTRIES].sort((a, b) => a.localeCompare(b)),
        []
    );

    const goToVisaServices = (country) => {
        if (!country || isLoading) return;
        setIsLoading(true);
        setPassportCountry(country);
        setTimeout(() => {
            navigate("/visa-services", {
                state: { passportCountry: country, fromVisaStart: true },
            });
        }, 1100);
    };

    // Path matching the visual flow of your uploaded image
    const flightPath = "M -50 250 Q 50 150 150 250 T 350 250 C 450 250 450 50 350 50 C 250 50 250 250 550 250 L 1200 100";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-sky-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-12 relative overflow-hidden transition-colors duration-500">
            <style>{`
                @keyframes vs-fadeUp {
                  from { opacity: 0; transform: translateY(14px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                @keyframes vs-softPop {
                  0% { transform: translateY(10px) scale(0.98); opacity: 0; }
                  100% { transform: translateY(0) scale(1); opacity: 1; }
                }
                @keyframes vs-float {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-14px); }
                }
                @keyframes vs-float2 {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(16px); }
                }
                @keyframes vs-dots {
                  0% { content: ""; }
                  33% { content: "."; }
                  66% { content: ".."; }
                  100% { content: "..."; }
                }
                .vs-enter { animation: vs-softPop 560ms cubic-bezier(.2,.9,.2,1) both; }
                .vs-enter-2 { animation: vs-fadeUp 520ms ease-out both; animation-delay: 110ms; }
                .vs-enter-3 { animation: vs-fadeUp 520ms ease-out both; animation-delay: 190ms; }

                .vs-bg-orb {
                  position: absolute; width: 520px; height: 520px; border-radius: 9999px;
                  filter: blur(34px); opacity: 0.35; pointer-events: none;
                }
                .vs-bg-orb.one {
                  left: -140px; top: -180px;
                  background: radial-gradient(circle at 30% 30%, rgba(56,189,248,0.65), rgba(99,102,241,0.18), transparent 60%);
                  animation: vs-float 7.2s ease-in-out infinite;
                }
                .vs-bg-orb.two {
                  right: -180px; bottom: -200px;
                  background: radial-gradient(circle at 30% 30%, rgba(34,197,94,0.22), rgba(56,189,248,0.38), transparent 62%);
                  animation: vs-float2 8.4s ease-in-out infinite;
                }
                .vs-ellipsis::after { content: ""; display: inline-block; width: 1.2em; text-align: left; animation: vs-dots 1s steps(3, end) infinite; }
                .vs-spinner { width: 64px; height: 64px; border-radius: 9999px; border: 6px solid rgba(56,189,248,0.22); border-top-color: rgba(56,189,248,1); animation: spin 900ms linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>

            <div className="vs-bg-orb one" />
            <div className="vs-bg-orb two" />

            {/* --- FLYING PAPER PLANE ANIMATION --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <svg width="100%" height="100%" viewBox="0 0 1000 500" fill="none" preserveAspectRatio="xMidYMid slice" className="opacity-40 dark:opacity-20">
                    {/* The dotted flight path */}
                    <motion.path
                        d={flightPath}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="6 6"
                        className="text-slate-400 dark:text-slate-600"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                    
                    {/* The Paper Plane */}
                    <motion.g
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear", // Linear is better for path following
                            repeatDelay: 1
                        }}
                        style={{
                            offsetPath: `path('${flightPath}')`,
                            offsetRotate: "auto 0deg" // Changed to 0deg to match the new nose orientation
                        }}
                    >
                        {/* Redesigned Paper Plane Icon - Nose points to the RIGHT (15,0) */}
                        <path
                            d="M15,0 L-10,-8 L-5,0 L-10,8 Z"
                            fill="currentColor"
                            className="text-sky-500 dark:text-sky-400"
                        />
                    </motion.g>
                </svg>
            </div>

            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 vs-loading-backdrop backdrop-blur-sm">
                    <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-2xl px-10 py-8 flex flex-col items-center gap-4 border border-white/60 dark:border-slate-800 backdrop-blur-md transition-colors duration-500">
                        <div className="vs-spinner" />
                        <div className="text-center">
                            <p className="text-sm text-slate-700 dark:text-slate-200">
                                Preparing visa options for{" "}
                                <strong className="text-slate-900 dark:text-white">
                                    {COUNTRY_EMOJI[passportCountry] ? `${COUNTRY_EMOJI[passportCountry]} ` : ""}
                                    {passportCountry}
                                </strong>
                                <span className="vs-ellipsis" />
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <Card
                className={[
                    "w-full max-w-xl overflow-visible relative rounded-3xl z-10",
                    "border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md shadow-2xl transition-all duration-500",
                    mounted ? "vs-enter" : "",
                ].join(" ")}
            >
                <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-100 dark:border-sky-900/50 text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30 transition-colors duration-500">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-medium">Fast, guided visa discovery</span>
                    </div>

                    <CardTitle className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight transition-colors duration-500">
                        Start Your Visa Application
                    </CardTitle>
                    <CardDescription className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-500">
                        Select the country that issued your passport. We’ll show destinations
                        you can apply for in the next step.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className={mounted ? "vs-enter-2 space-y-3" : "space-y-3"}>
                        <label className="flex items-center justify-center sm:justify-start gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 ml-1 transition-colors duration-500">
                            <Globe2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                            Select the Country that Issued your Passport
                        </label>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="relative flex-1">
                                <Select
                                    value={passportCountry}
                                    onValueChange={(value) => goToVisaServices(value)}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="w-full h-14 text-lg bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-2xl focus:ring-2 focus:ring-sky-200 transition-all duration-500">
                                        <SelectValue placeholder="Select passport country" />
                                    </SelectTrigger>

                                    <SelectContent className="max-h-72 overflow-auto z-50 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg text-slate-900 dark:text-slate-100 min-w-[22rem]">
                                        {sortedCountries.map((c) => (
                                            <SelectItem
                                                key={c}
                                                value={c}
                                                className="cursor-pointer py-3 text-base hover:bg-sky-50 dark:hover:bg-sky-900 data-[state=checked]:bg-sky-100 dark:data-[state=checked]:bg-sky-900 data-[state=checked]:text-slate-900 dark:data-[state=checked]:text-white"
                                            >
                                                <span className="mr-2">{COUNTRY_EMOJI[c]}</span> {c}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 ml-1 italic">
                                    Tip: choose the country printed on your passport’s cover.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={[mounted ? "vs-enter-3" : "", "pt-4 border-t border-slate-100 dark:border-slate-800 text-center"].join(" ")}>
                        <p className="text-xs text-slate-400 dark:text-slate-600 transition-colors duration-500">
                            You can change this later on the visa services page if needed.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default VisaStart;