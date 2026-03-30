// 🔥 FINAL STABLE + FULL FEATURES (NO CRASH, NO REMOVED FEATURES)

import { useState, useEffect, useRef } from "react";
import playersData from "./data/players";

export default function App() {
  const [players] = useState(playersData);
  const [index, setIndex] = useState(0);
  const [bid, setBid] = useState(playersData[0].price);
  const [timer, setTimer] = useState(10);
  const [started, setStarted] = useState(false);
  const [team, setTeam] = useState(null);
  const [highest, setHighest] = useState(null);
  const [sold, setSold] = useState("");
  const [withdrawn, setWithdrawn] = useState([]);
  const [newTeam, setNewTeam] = useState("");

  const [teams, setTeams] = useState([
    { name: "RCB", budget: 100, squad: [] },
    { name: "MI", budget: 100, squad: [] },
    { name: "CSK", budget: 100, squad: [] },
    { name: "KKR", budget: 100, squad: [] },
    { name: "SRH", budget: 100, squad: [] },
    { name: "DC", budget: 100, squad: [] },
    { name: "RR", budget: 100, squad: [] },
    { name: "PBKS", budget: 100, squad: [] },
    { name: "GT", budget: 100, squad: [] },
    { name: "LSG", budget: 100, squad: [] }
  ]);

  const bidSound = useRef(new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3"));
  const soldSound = useRef(new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"));

  const playBid = () => bidSound.current.play().catch(()=>{});
  const playSold = () => soldSound.current.play().catch(()=>{});

  const current = players[index];

  useEffect(() => {
    if (!started) return;
    if (timer <= 0) return finalize();
    const t = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(t);
  }, [timer, started]);

  useEffect(() => {
    if (!started) return;
    const ai = setInterval(() => {
      const available = teams.filter(t => t.name !== team && !withdrawn.includes(t.name));
      if (!available.length) return;

      if (Math.random() < 0.6) {
        const randomTeam = available[Math.floor(Math.random() * available.length)];
        setBid(p => p + 0.25);
        setHighest(randomTeam.name);
        setTimer(10);
        playBid();
      }
    }, 1500);
    return () => clearInterval(ai);
  }, [started, teams, withdrawn]);

  const userBid = () => {
    if (withdrawn.includes(team)) return;

    const t = teams.find(t => t.name === team);
    if (!t || t.budget < bid + 0.25) return;

    setBid(p => p + 0.25);
    setHighest(team);
    setTimer(10);
    playBid();
  };

  const withdraw = () => {
    if (highest === team) return alert("You are highest bidder!");
    setWithdrawn(prev => [...prev, team]);
  };

  const finalize = () => {
    if (!highest) return next();

    setSold(`🏆 SOLD TO ${highest}`);
    playSold();

    const updated = teams.map(t =>
      t.name === highest
        ? { ...t, budget: t.budget - bid, squad: [...t.squad, current] }
        : t
    );

    setTeams(updated);

    setTimeout(() => {
      setSold("");
      next();
    }, 2000);
  };

  const next = () => {
    if (highest === team) return alert("Wait! You are highest bidder");

    const n = index + 1;
    if (n >= players.length) return alert("Auction Finished");

    setIndex(n);
    setBid(players[n].price);
    setTimer(10);
    setHighest(null);
    setWithdrawn([]);
  };

  const addTeam = () => {
    if (!newTeam.trim()) return;
    setTeams([...teams, { name: newTeam, budget: 100, squad: [] }]);
    setTeam(newTeam);
    setNewTeam("");
  };

  const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${current.name}`;

  if (!started) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>🏏 IPL AUCTION</h1>

        <div style={styles.grid}>
          {teams.map(t => (
            <div
              key={t.name}
              onClick={() => setTeam(t.name)}
              style={{
                ...styles.card,
                border: team === t.name ? "2px solid gold" : "1px solid #333",
                transform: team === t.name ? "scale(1.1)" : "scale(1)"
              }}
            >
              {t.name}
            </div>
          ))}
        </div>

        <div>
          <input
            value={newTeam}
            onChange={e => setNewTeam(e.target.value)}
            placeholder="Create Team"
            style={styles.input}
          />
          <button onClick={addTeam} style={styles.green}>Add</button>
        </div>

        <button onClick={() => setStarted(true)} style={styles.start}>
          ENTER AUCTION
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {sold && <div style={styles.sold}>{sold}</div>}

      <h2>🔥 Current Bidder: {highest || "None"}</h2>

      <div style={styles.player}>
        <img src={avatar} style={styles.img} />
        <h2>{current.name}</h2>
        <p>{current.role}</p>
        <p>{current.nationality}</p>
        <p>Bat: {current.batting}</p>
        <p>Bowl: {current.bowling}</p>
      </div>

      <h1 style={styles.bid}>₹{bid.toFixed(2)} Cr</h1>
      <h2>⏳ {timer}s</h2>

      <div>
        <button onClick={userBid} style={styles.bidBtn}>BID</button>
        <button onClick={next} style={styles.skip}>SKIP</button>
        <button onClick={withdraw} style={styles.withdraw}>WITHDRAW</button>
      </div>

      <div style={styles.grid}>
        {teams.map(t => (
          <div key={t.name} style={styles.teamCard}>
            <h3>{t.name}</h3>
            <p>₹{t.budget.toFixed(1)}</p>
            {t.squad.map((p,i)=>(<div key={i}>{p.name}</div>))}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#020617,#0f172a,#020617)",
    color: "white",
    textAlign: "center",
    padding: "20px",
  },
  title: { fontSize: "32px", color: "gold" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: "10px" },
  card: { padding: "15px", borderRadius: "10px", background: "#111", cursor: "pointer" },
  input: { padding: "10px", marginTop: "10px" },
  green: { background: "green", padding: "10px" },
  start: { marginTop: "20px", padding: "10px", background: "gold" },
  player: { margin: "20px auto", padding: "20px", width: "260px", background: "#111", borderRadius: "15px" },
  img: { width: "100px", borderRadius: "50%" },
  bid: { fontSize: "40px", color: "gold" },
  bidBtn: { padding: "10px", background: "green", margin: "5px" },
  skip: { padding: "10px", background: "gray", margin: "5px" },
  withdraw: { padding: "10px", background: "red", margin: "5px" },
  sold: { fontSize: "28px", color: "gold" },
  teamCard: { padding: "10px", background: "#111", borderRadius: "10px" }
};