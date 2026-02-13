import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Moon,
  Sun,
  BarChart2,
  Database,
  Search,
  AlertTriangle,
  TrendingUp,
  Cpu,
  Layers,
  FileText,
  ShieldAlert,
  Activity,
} from "lucide-react";

// --- EXPANDED DATASET & NARRATIVE ---

const slides = [
  // --- SECTION 1: THE HOOK ---
  {
    id: 1,
    type: "title",
    title: "FORENSIC GOVERNANCE",
    subtitle: "DECODING AADHAAR: FROM 4.9M RECORDS TO HUMAN STORIES",
    content: "UIDAI DATA HACKATHON | TEAM WINTER IS OURS",
  },
  {
    id: 2,
    type: "content",
    title: "PROBLEM STATEMENT",
    intro:
      "The objective was not merely data analysis, but a forensic investigation into the Aadhaar ecosystem to identify meaningful patterns, structural anomalies, and operational signals.",
    points: [
      {
        head: "Beyond Reporting",
        body: "We moved beyond volume counting to 'Root Cause Analysis', distinguishing between administrative failures (fixable) and structural realities (permanent).",
      },
      {
        head: "Cross-Validation",
        body: "Every insight is cross-validated against external policy timelines (SIR, Tax Deadlines) and ground realities (Migration patterns) to ensure authenticity.",
      },
      {
        head: "The Goal",
        body: "To translate 4.9 million raw rows into a 'Governance Warning System' that predicts stress before it becomes a crisis.",
      },
    ],
  },
  {
    id: 3,
    type: "stats",
    title: "THE DATASETS",
    intro:
      "Our analysis is strictly grounded in three specific aggregated datasets provided for the hackathon (Dec 2025 Snapshot).",
    stats: [
      { label: "Dataset 1", value: "Enrolment Data" },
      { label: "Dataset 2", value: "Demographic Update" },
      { label: "Dataset 3", value: "Biometric Update" },
      { label: "Total Raw Rows", value: "4.9 Million" },
    ],
  },

  // --- SECTION 2: THE YEAR IN REVIEW ---
  {
    id: 4,
    type: "content",
    title: "UIDAI 2025: YEAR IN REVIEW",
    intro:
      "Context is critical. The data reflects massive policy shifts undertaken by UIDAI in 2025.",
    points: [
      {
        head: "Scale & Reliability",
        body: "2,707 Cr authentications in 2024-25. Core infra is stable. The challenge has shifted from 'Scale' to 'Quality'.",
      },
      {
        head: "Policy Shift: Child Focus",
        body: "Free Mandatory Biometric Updates (MBU) for ages 5-7 and 15-17. This explains the massive 'Update' volume vs 'Enrolment' volume.",
      },
      {
        head: "Pricing Rationalization",
        body: "Update fees rationalized (₹75/₹125). This policy change drove specific user behaviors visible in the financial columns of our data.",
      },
    ],
  },

  // --- SECTION 3: THE CLEANING PIPELINE ---
  {
    id: 5,
    type: "stats",
    title: "PHASE 1: DATA AUDIT",
    intro:
      "We began with a raw inventory audit of 12 CSV files to assess initial quality.",
    stats: [
      { label: "Files", value: "12 CSVs" },
      { label: "Initial Row Count", value: "4.9 M" },
      { label: "District Count", value: "989 (High)" },
      { label: "Duplicate Rate", value: "~8%" },
    ],
  },
  {
    id: 6,
    type: "content",
    title: "PHASE 2: PREPROCESSING LOGIC",
    intro:
      "A rigorous linear pipeline was implemented to sanitize the data before any analysis could begin.",
    points: [
      {
        head: "Temporal Standardization",
        body: "Enforced strict dd-mm-yyyy format. Records failing this parse were filtered to ensure time-series consistency.",
      },
      {
        head: "Geographic Normalization",
        body: "Mapped legacy state names (e.g., 'ORISSA' → 'ODISHA') and sanitized strings. Fixed invalid pincodes (non-6-digit) using Regex.",
      },
      {
        head: "District Mapping",
        body: "Reduced unique districts from 989 to ~750 by mapping variations (e.g., 'BANGALORE' → 'BENGALURU URBAN').",
      },
    ],
  },
  {
    id: 7,
    type: "content",
    title: "PHASE 3: INTEGRATION & DEDUPLICATION",
    intro:
      "The most critical step: Removing 'Ghost Records' that appeared only after merging datasets.",
    points: [
      {
        head: "The Duplicate Discovery",
        body: "We identified 390,612 exact duplicates that existed across file boundaries. These were creating false volume spikes.",
      },
      {
        head: "Final Clean Dataset",
        body: "Post-cleaning, we retained 4,317,898 Valid Records with 100% uniqueness and completeness.",
      },
      {
        head: "Result",
        body: "A clean, trustworthy foundation for Forensic Analysis.",
      },
    ],
  },

  // --- SECTION 4: FEATURE ENGINEERING ---
  {
    id: 8,
    type: "stats",
    title: "FEATURE ENGINEERING",
    intro:
      "We derived high-dimensional features to quantify ecosystem health beyond simple volume counts.",
    stats: [
      { label: "Total Updates", value: "Overall Activity" },
      { label: "Bio Compliance (5-17)", value: "Policy Adherence" },
      { label: "Demo Volatility", value: "Churn Proxy" },
      { label: "Update Intensity", value: "Ops Load / Enrol" },
    ],
  },
  {
    id: 9,
    type: "content",
    title: "RISK FRAMING FRAMEWORK",
    intro:
      "We defined 'Risk' not just as anomalies, but as specific operational failures.",
    points: [
      {
        head: "Low Compliance",
        body: "Districts failing to capture mandatory biometrics (MBU) for children, risking future service exclusion.",
      },
      {
        head: "High Volatility",
        body: "Districts showing erratic, non-organic spikes in demographic updates (often linked to fraud or panic).",
      },
      {
        head: "High Update Intensity",
        body: "Districts where the administrative load per enrolment is disproportionately high, signaling stress.",
      },
    ],
  },

  // --- SECTION 5: MACRO PATTERNS ---
  {
    id: 10,
    type: "chart",
    chartType: "pie",
    title: "SERVICE MIX REALITY",
    intro:
      "The ecosystem has transitioned from 'Acquisition' to 'Lifecycle Management'. 86% of activity is now maintenance.",
    chartData: [
      { label: "Demographic Updates", value: 45.4, color: "bg-orange-600" },
      { label: "Biometric Updates", value: 40.9, color: "bg-blue-600" },
      { label: "New Enrollments", value: 13.7, color: "bg-green-600" },
    ],
  },
  {
    id: 11,
    type: "map",
    mapMode: "concentration",
    title: "GEOGRAPHIC SKEW",
    intro:
      "5 states drive ~40% of the national volume. Infrastructure planning must follow this Pareto distribution.",
    mapSteps: [
      {
        id: "IN-UP",
        name: "Uttar Pradesh",
        stat: "Volume Leader",
        insight:
          "Highest absolute volume, driven by adult demographic corrections.",
      },
      {
        id: "IN-MH",
        name: "Maharashtra",
        stat: "Urban Hubs",
        insight: "High biometric update volume concentrated in Pune/Thane.",
      },
      {
        id: "IN-WB",
        name: "West Bengal",
        stat: "High Load",
        insight: "Significant demographic update activity.",
      },
    ],
  },

  // --- SECTION 6: DEEP INSIGHTS - NORTHEAST ---
  {
    id: 12,
    type: "map",
    mapMode: "northeast",
    title: "INSIGHT #1: THE NORTHEAST PARADOX",
    intro:
      "Why does Manipur have high updates but low enrollment, while Meghalaya is the opposite? We found two distinct realities.",
    mapSteps: [
      {
        id: "IN-MN",
        name: "Manipur",
        stat: "0.013 Intensity (Max)",
        insight:
          "High Updates, Low Enrolment. 45x the median national update intensity.",
      },
      {
        id: "IN-ML",
        name: "Meghalaya",
        stat: "High Enrolment",
        insight:
          "Disproportionately high fresh enrolment rates compared to mature states.",
      },
    ],
  },
  {
    id: 13,
    type: "content",
    title: "ROOT CAUSE: MANIPUR VS MEGHALAYA",
    intro:
      "Data Analysis + External Validation reveals the 'Why' behind the map.",
    points: [
      {
        head: "Manipur: Structural Barriers",
        body: "Update volume is high due to 'Catch-up' on mandatory biometric updates (MBU). However, NEW enrolment is low due to strict state-level verification (Illegal Immigration checks) which bottlenecks fresh entry.",
      },
      {
        head: "Meghalaya: The '50-Day' Push",
        body: "High fresh enrolment is NOT organic. It correlates perfectly with the state's '50-Day Saturation Campaign' linked to welfare schemes, forcing a massive intake of the previously excluded.",
      },
      {
        head: "Conclusion",
        body: "Infrastructure in Manipur needs to be permanent (for updates). Infrastructure in Meghalaya needs to be mobile (for one-time enrolment).",
      },
    ],
  },

  // --- SECTION 7: DEEP INSIGHTS - NOVEMBER SURGE ---
  {
    id: 14,
    type: "chart",
    chartType: "image",
    title: "INSIGHT #2: THE NOVEMBER PANIC",
    intro:
      "We detected a massive 'Cliff Effect' in November. This was not organic demand; it was Policy-Induced Anxiety.",
    chartData: {
      src: "/nov-chart.jpeg",
      alt: "November Panic Chart",
    },
    footer:
      "Districts like Thane and Pune jumped 7x month-over-month, then crashed.",
  },
  {
    id: 15,
    type: "content",
    title: "ROOT CAUSE: THE POLICY COLLISION",
    intro:
      "Cross-referencing dates with government circulars reveals the trigger.",
    points: [
      {
        head: "1. The Trigger: Deadlines",
        body: "The surge coincides with the collision of 'Special Intensive Revision' (SIR) for Voter IDs and Tax Filing deadlines.",
      },
      {
        head: "2. The Behavior: Panic",
        body: "Residents rushed to fix minor demographic mismatches (Name/DOB) to link PAN/Voter ID. This explains why 'Demographic Updates' spiked, not Biometrics.",
      },
      {
        head: "3. The Proof: The Cliff",
        body: "The 97% drop immediately after the deadline confirms this was artificial, deadline-driven demand, not organic population growth.",
      },
    ],
  },

  // --- SECTION 8: DEEP INSIGHTS - INVISIBLE CHILD ---
  {
    id: 16,
    type: "map",
    mapMode: "crisis",
    title: "INSIGHT #3: THE INVISIBLE COHORT",
    intro:
      "The most alarming finding: 'Zero Compliance' zones where children are being digitally abandoned.",
    mapSteps: [
      {
        id: "IN-AS",
        name: "Dima Hasao (Assam)",
        stat: "0.0% Compliance",
        insight:
          "Sustained failure to capture mandatory biometrics for over 3 quarters.",
      },
      {
        id: "IN-BR",
        name: "Bhabua (Bihar)",
        stat: "Institutional Neglect",
        insight: "High adult activity but zero child biometric updates.",
      },
      {
        id: "IN-ML",
        name: "E.W. Khasi Hills",
        stat: "Remote Disconnect",
        insight:
          "Tribal belts seeing adult enrollment but zero child lifecycle management.",
      },
    ],
  },
  {
    id: 17,
    type: "content",
    title: "ROOT CAUSE: INSTITUTIONAL ABANDONMENT",
    intro:
      "This is not 'low performance'; it is non-performance. 7.5 million children are at risk.",
    points: [
      {
        head: "The Reality",
        body: "In these 60+ districts, the machinery to enroll children has effectively collapsed. We suspect school-level partnerships (the usual channel for kids) are inactive here.",
      },
      {
        head: "The Consequence",
        body: "These children exist in census counts but lack biometric markers. As they approach board exams (2027), they face mass service rejection.",
      },
      {
        head: "The Fix",
        body: "We cannot rely on schools in these areas. We need 'Operation Invisible Child'—mobile task forces dedicated solely to 5/15-year updates.",
      },
    ],
  },

  // --- SECTION 9: TECHNICAL ML IMPLEMENTATION ---
  {
    id: 18,
    type: "content",
    title: "TECHNICAL ARCHITECTURE",
    intro:
      "We deployed unsupervised learning to move beyond simple thresholding.",
    points: [
      {
        head: "Behavioral Segmentation (K-Means)",
        body: "Instead of finding anomalies, K-Means groups districts with similar behavioural patterns. It finds natural segments (e.g., 'High Churn', 'Stable') rather than just outliers.",
      },
      {
        head: "Structural Anomaly Detection (Isolation Forest)",
        body: "A label-free model that looks at all features together. It detects multi-dimensional anomalies (e.g., a district with normal volume but abnormal update ratios) that simple Z-scores miss.",
      },
      {
        head: "Graph & Time Series",
        body: "Utilized univariate/bivariate analysis for temporal spikes and Graph Analysis to find synchronized volatility across unconnected districts.",
      },
    ],
  },

  // --- SECTION 10: STRATEGY ---
  {
    id: 19,
    type: "matrix",
    title: "STRATEGIC SEGMENTATION",
    intro: "A Triage-Based Resource Allocation Framework.",
    matrixData: [
      {
        label: "CRISIS (60 Districts)",
        desc: "Zero Child Compliance. ACTION: Mobile Task Forces (Op Invisible Child).",
        color: "bg-red-600",
      },
      {
        label: "STRUCTURAL (Manipur)",
        desc: "High Churn. ACTION: Permanent infrastructure expansion.",
        color: "bg-orange-500",
      },
      {
        label: "CATCH-UP (Meghalaya)",
        desc: "High Fresh Entry. ACTION: Saturation Camps.",
        color: "bg-blue-500",
      },
      {
        label: "ADMIN STRESS (UP)",
        desc: "High Volume / Low Quality. ACTION: Reallocate Adult resources to Children.",
        color: "bg-green-500",
      },
    ],
  },
  {
    id: 20,
    type: "content",
    title: "FINAL RECOMMENDATIONS",
    intro: "Moving from Reactive Panic to Predictive Governance.",
    points: [
      {
        head: "1. Eliminate 'Cliff' Deadlines",
        body: "Stagger policy deadlines to prevent the 'November Surge' panic that overwhelms the system.",
      },
      {
        head: "2. Targeted Regional Models",
        body: "One size does not fit all. Manipur needs a 'Border Protocol' (High Security, High Capacity). Meghalaya needs 'Mission Mode' camps.",
      },
      {
        head: "3. Child Biometric KPI",
        body: "Make 'Child Biometric Compliance' a mandatory KPI for District Magistrates to fix the Invisible Cohort issue.",
      },
    ],
  },
  {
    id: 21,
    type: "title",
    title: "THANK YOU",
    subtitle: "DATA HACKATHON 2026",
    content:
      "TEAM WINTER IS OURS | Krrish Rastogi (Lead), Daksh, Ishan, Aviral, Rishabh",
  },
];

// --- Sub-Components ---

const ChartComponent = ({ type, data, footer }) => {
  if (type === "pie") {
    return (
      <div className="flex flex-wrap justify-center gap-12 items-center">
        <div
          className="relative w-64 h-64 md:w-72 md:h-72 rounded-full border-4 border-white shadow-xl"
          style={{
            background: `conic-gradient(
                  #ea580c 0% 45.4%, 
                  #2563eb 45.4% 86.3%, 
                  #16a34a 86.3% 100%
                )`,
          }}
        ></div>
        <div className="flex flex-col gap-4">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded ${d.color} shadow-sm`}></div>
              <span className="font-display text-xl">
                {d.label}: <strong>{d.value}%</strong>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vertical Bar Chart for Nov Surge
  if (type === "bar_vertical") {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex items-end justify-center gap-4 md:gap-12 h-64 w-full max-w-4xl border-b-2 border-white/20 pb-4 px-4">
          {data.map((d, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 group flex-1"
            >
              <div className="font-bold text-2xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {d.text}
              </div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${d.value}%` }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className={`w-full max-w-[100px] rounded-t-lg shadow-lg ${d.color} relative hover:opacity-90 transition-all`}
              ></motion.div>
              <div className="text-center font-tech text-xs md:text-sm uppercase tracking-wider mt-2 opacity-80">
                {d.label}
              </div>
            </div>
          ))}
        </div>
        {footer && (
          <div className="mt-8 text-lg italic text-center opacity-80 max-w-2xl bg-white/5 p-4 rounded-lg border-l-4 border-red-500">
            {footer}
          </div>
        )}
      </div>
    );
  }
  return null;
};

// --- MAP COMPONENT ---
const IndiaMapSlide = ({ data, stepIndex }) => {
  const [svgContent, setSvgContent] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    fetch("/india.svg")
      .then((response) => response.text())
      .then((svg) => setSvgContent(svg))
      .catch((err) => console.error("Error loading SVG:", err));
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const paths = mapRef.current.querySelectorAll("path");
    paths.forEach((p) => {
      p.setAttribute("class", "");
      p.style.fill = "";
    });

    data.mapSteps.forEach((step, index) => {
      const el = mapRef.current.querySelector(`#${step.id}`);
      if (el) {
        if (index === stepIndex) {
          el.setAttribute("class", "active-state");
        } else if (index < stepIndex) {
          el.setAttribute("class", "visited-state");
        }
      }
    });
  }, [stepIndex, svgContent, data]);

  const currentStepData = data.mapSteps[stepIndex] || {
    name: "Explore the Data",
    stat: "",
    insight: "Use arrows to navigate the geographic insights.",
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen items-stretch justify-between px-4 md:px-8 py-4 gap-4 overflow-hidden">
      <div className="w-full lg:w-1/3 flex flex-col justify-center items-start text-left z-20 max-h-full overflow-y-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-[var(--text-primary)] mb-4 border-l-4 border-[var(--accent-color)] pl-6 text-left leading-tight">
          {data.title}
        </h2>
        <p className="text-sm md:text-base lg:text-lg font-body italic text-[var(--text-primary)] mb-6 opacity-80 text-left">
          {data.intro}
        </p>
        <div className="min-h-[150px] md:min-h-[200px] w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepData.id || "empty"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/80 dark:bg-black/40 backdrop-blur-md border-l-4 border-[var(--accent-color)] p-4 md:p-5 rounded-r-xl shadow-2xl text-left"
            >
              {stepIndex >= 0 ? (
                <>
                  <div className="text-lg md:text-xl lg:text-2xl font-display font-bold text-[var(--text-primary)] mb-2">
                    {currentStepData.name}
                  </div>
                  <div className="text-base md:text-lg lg:text-xl font-tech text-[var(--accent-color)] mb-3 font-bold uppercase tracking-wider">
                    {currentStepData.stat}
                  </div>
                  <p className="font-body text-sm md:text-base lg:text-lg leading-relaxed text-[var(--text-primary)] opacity-90">
                    {currentStepData.insight}
                  </p>
                </>
              ) : (
                <div className="flex items-center justify-start h-full p-2 opacity-50">
                  <p className="font-tech text-xs md:text-sm uppercase tracking-widest flex items-center gap-2">
                    <ChevronRight size={16} /> Click Right Arrow
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="w-full lg:w-2/3 h-[50vh] lg:h-full flex items-center justify-center relative z-10 p-4">
        <motion.div
          className="india-map-container w-full h-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          ref={mapRef}
        >
          <div
            className="w-full h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: svgContent || "Loading Map..." }}
          />
        </motion.div>
      </div>
    </div>
  );
};

// --- Generic Slide Components ---

const TitleSlide = ({ data }) => (
  <div className="flex flex-col items-center justify-center min-h-screen px-8 md:px-32 text-center">
    <motion.h1
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-6xl md:text-8xl font-bold font-display mb-6 tracking-tighter text-[var(--text-primary)]"
    >
      {data.title}
    </motion.h1>
    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-2xl font-tech text-[var(--accent-color)] mb-12 tracking-widest uppercase font-bold"
    >
      {data.subtitle}
    </motion.h2>
    <div className="text-xl font-body opacity-80 max-w-2xl mx-auto border-t border-[var(--text-primary)]/20 pt-8">
      {data.content}
    </div>
  </div>
);

const ContentSlide = ({ data }) => (
  <div className="flex flex-col min-h-screen justify-center px-8 md:px-32 py-20">
    <h2 className="text-4xl md:text-5xl font-bold font-display mb-10 border-b-4 border-[var(--accent-color)] inline-block pb-4">
      {data.title}
    </h2>
    <p className="text-lg md:text-xl italic mb-12 opacity-80 max-w-4xl font-body leading-relaxed">
      {data.intro}
    </p>
    <div className="grid gap-8">
      {data.points.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="border-l-4 border-[var(--text-primary)] pl-8 py-2 hover:border-[var(--accent-color)] transition-colors"
        >
          <h3 className="text-xl md:text-2xl font-bold font-display mb-2">
            {p.head}
          </h3>
          <p className="text-base md:text-lg opacity-80 font-body leading-relaxed">
            {p.body}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
);

const StatsSlide = ({ data }) => (
  <div className="flex flex-col min-h-screen justify-center px-8 md:px-32 py-20">
    <h2 className="text-5xl font-bold font-display mb-6 text-center">
      {data.title}
    </h2>
    <p className="text-xl text-center mb-16 italic opacity-70 font-body">
      {data.intro}
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {data.stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="p-8 bg-white/5 border border-[var(--accent-color)] rounded-xl text-center backdrop-blur-sm shadow-lg hover:-translate-y-2 transition-transform duration-300"
        >
          <div className="text-4xl font-bold font-display text-[var(--accent-color)] mb-3">
            {s.value}
          </div>
          <div className="text-sm font-tech uppercase tracking-wider opacity-80 font-bold">
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const ChartSlide = ({ data }) => (
  <div className="flex flex-col min-h-screen justify-center px-8 md:px-32 py-20">
    <div className="flex items-center gap-4 mb-8">
      <BarChart2 size={40} className="text-[var(--accent-color)]" />
      <h2 className="text-5xl font-bold font-display">{data.title}</h2>
    </div>
    <p className="text-xl italic mb-12 opacity-80 border-l-4 border-[var(--accent-color)] pl-6 font-body max-w-3xl">
      {data.intro}
    </p>
    <div className="flex justify-center items-center w-full min-h-[400px] bg-white/5 rounded-2xl p-10 border border-[var(--text-primary)]/10 shadow-inner">
      <ChartComponent
        type={data.chartType}
        data={data.chartData}
        footer={data.footer}
      />
    </div>
  </div>
);

const MatrixSlide = ({ data }) => (
  <div className="flex flex-col min-h-screen justify-center px-8 md:px-32 py-20">
    <h2 className="text-5xl font-bold font-display mb-12 text-center">
      {data.title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
      {data.matrixData.map((m, i) => (
        <div
          key={i}
          className={`p-10 rounded-xl flex flex-col justify-center items-center text-center text-white shadow-xl ${m.color} hover:scale-105 transition-transform duration-300`}
        >
          <div className="text-3xl font-bold font-display mb-4 tracking-wide">
            {m.label}
          </div>
          <div className="text-lg opacity-95 font-body leading-snug">
            {m.desc}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [subSlideIndex, setSubSlideIndex] = useState(-1);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSlide]);

  const nextSlide = () => {
    const currentData = slides[currentSlide];
    if (currentData.type === "map" && currentData.mapSteps) {
      if (subSlideIndex < currentData.mapSteps.length - 1) {
        setSubSlideIndex((prev) => prev + 1);
        return;
      }
    }
    setSubSlideIndex(-1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    const currentData = slides[currentSlide];
    if (currentData.type === "map" && subSlideIndex > -1) {
      setSubSlideIndex((prev) => prev - 1);
      return;
    }
    setSubSlideIndex(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className={`${darkMode ? "dark" : ""} font-body transition-colors duration-500`}
    >
      <div className="relative min-h-screen w-full bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
        {/* Header Control */}
        <div className="fixed top-6 right-6 z-50">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-md shadow-sm border border-[var(--text-primary)]/10 hover:bg-white/20 transition-all text-[var(--text-primary)]"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Slide Render Logic */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {slides[currentSlide].type === "title" && (
                <TitleSlide data={slides[currentSlide]} />
              )}
              {slides[currentSlide].type === "content" && (
                <ContentSlide data={slides[currentSlide]} />
              )}
              {slides[currentSlide].type === "stats" && (
                <StatsSlide data={slides[currentSlide]} />
              )}
              {slides[currentSlide].type === "chart" && (
                <ChartSlide data={slides[currentSlide]} />
              )}
              {slides[currentSlide].type === "matrix" && (
                <MatrixSlide data={slides[currentSlide]} />
              )}
              {slides[currentSlide].type === "map" && (
                <IndiaMapSlide
                  data={slides[currentSlide]}
                  stepIndex={subSlideIndex}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="fixed bottom-8 right-8 flex gap-4 z-50">
          <button
            onClick={prevSlide}
            className="p-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-[var(--accent-color)] hover:text-white transition-all shadow-lg group border border-[var(--text-primary)]/10 text-[var(--text-primary)]"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="p-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-[var(--accent-color)] hover:text-white transition-all shadow-lg group border border-[var(--text-primary)]/10 text-[var(--text-primary)]"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="fixed bottom-8 left-8 text-sm font-tech opacity-50 tracking-widest font-bold">
          SLIDE {currentSlide + 1} / {slides.length}
          {slides[currentSlide].type === "map" &&
            subSlideIndex > -1 &&
            ` • POINT ${subSlideIndex + 1}`}
        </div>

        {/* Copyright Notice */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-xs font-tech text-[var(--text-primary)] opacity-40">
          © 2026 UIDAI Hackathon | Team Winter Is Ours
        </div>
      </div>
    </div>
  );
}
