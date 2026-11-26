import React, { useMemo, useState } from "react";
import {
  SafeAreaView, View, Text, TouchableOpacity, StyleSheet, StatusBar,
  ScrollView, Platform
} from "react-native";

const QUESTIONS = [
  { q: "In a democracy, the source of power lies with?", options: ["The army", "The judiciary", "The citizens", "The police"], answer: 2 },
  { q: "The Constitution protects the _____________ Rights of citizens.", options: ["Legal", "Fundamental", "Social", "Political"], answer: 1 },
  { q: "Which of the following ensures separation of powers?", options: ["Elections", "Police", "Media", "Constitution"], answer: 3 },
  { q: "Citizens elect their representatives through?", options: ["Secret ballot", "Public discussion only", "Direct appointment", "Court orders"], answer: 0 },
  { q: "The right to vote for citizens above 18 years is called?", options: ["Universal Adult Franchise", "Fundamental Right", "Voting privilege", "Legal right"], answer: 0 },
  { q: "India’s democracy is described as a?", options: ["Problem for world", "Beacon of hope", "Weak system", "Temporary system"], answer: 1 },
  { q: "Which of the following is part of media?", options: ["Courts", "Parliament", "Newspapers and social media", "Police"], answer: 2 },
  { q: "Which process is linked with Parliament and State Legislatures?", options: ["Electoral Process", "Judicial Process", "Accountability Mechanism", "Legislative Process"], answer: 3 },
  { q: "The Constitution of India was adopted on?", options: ["26 January 1950", "15 August 1947", "26 November 1949", "2 October 1950"], answer: 2 },
  { q: "PIL stands for:", options: ["Public Information Law", "Private Interest Litigation", "Public Interest Litigation", "People’s Important Law"], answer: 2 }
];

const LETTERS = ["A", "B", "C", "D"];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [index, setIndex] = useState(0);
  const [health, setHealth] = useState(3);
  const [demonHP, setDemonHP] = useState(5);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [lastCorrect, setLastCorrect] = useState(false);

  const question = QUESTIONS[index];
  const finished = index >= QUESTIONS.length;

  function startGame() {
    setIndex(0); setHealth(3); setDemonHP(5); setScore(0);
    setSelected(null); setFeedback(""); setLastCorrect(false); setScreen("game");
  }

  function chooseAnswer(choice) {
    if (selected !== null || screen !== "game") return;
    setSelected(choice);
    const correct = choice === question.answer;
    setLastCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
      setDemonHP(h => Math.max(0, h - 1));
      setFeedback("DIRECT HIT! Your blade strikes the demon.");
    } else {
      const nextHealth = Math.max(0, health - 1);
      setHealth(nextHealth);
      setFeedback(`The demon counterattacks! Correct answer: ${LETTERS[question.answer]}. ${question.options[question.answer]}`);
    }
  }

  function nextQuestion() {
    const next = index + 1;
    if (health <= 0) {
      setScreen("over");
      return;
    }
    if (next >= QUESTIONS.length) {
      setIndex(next);
      setScreen(demonHP <= 0 ? "victory" : "over");
      return;
    }
    setIndex(next);
    setSelected(null);
    setFeedback("");
    setLastCorrect(false);
  }

  const healthLabel = "♥ ".repeat(health) + "♡ ".repeat(3 - health);

  if (screen === "home") return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.home}>
        <Text style={styles.eyebrow}>A STUDY RPG</Text>
        <Text style={styles.logo}>SYLLABUS{"\n"}<Text style={styles.logoGold}>SLAYER</Text></Text>
        <Text style={styles.tagline}>KNOWLEDGE IS YOUR WEAPON.</Text>
        <View style={styles.heroArt}>
          <Text style={styles.heroEmoji}>⚔️</Text>
          <Text style={styles.vs}>VS</Text>
          <Text style={styles.demonEmoji}>👹</Text>
        </View>
        <Text style={styles.intro}>Answer correctly to strike the demon.{"\n"}Wrong answers cost you a heart.</Text>
        <View style={styles.mission}>
          <Text style={styles.missionTitle}>YOUR FIRST HUNT</Text>
          <Text style={styles.missionText}>CLASS 9  •  SOCIAL SCIENCE</Text>
          <Text style={styles.missionText}>CHAPTER 6  •  DEMOCRACY</Text>
          <Text style={styles.missionText}>10 QUESTIONS  •  3 HEARTS</Text>
        </View>
        <TouchableOpacity style={styles.primaryBtn} onPress={startGame} activeOpacity={0.85}>
          <Text style={styles.primaryBtnText}>⚔  START HUNT</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>DEFEAT THE DEMON. MASTER THE CHAPTER.</Text>
      </View>
    </SafeAreaView>
  );

  if (screen === "victory" || screen === "over") {
    const won = screen === "victory";
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />
        <View style={styles.result}>
          <Text style={styles.resultIcon}>{won ? "🏆" : "💀"}</Text>
          <Text style={[styles.resultTitle, won ? styles.gold : styles.red]}>{won ? "DEMON SLAIN!" : "HUNT ENDED"}</Text>
          <Text style={styles.resultSub}>{won ? "The battlefield is yours, Slayer." : (health <= 0 ? "The demon defeated you. Train and return." : "The demon survived. Land more hits next time.")}</Text>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreNumber}>{score}/{QUESTIONS.length}</Text>
            <Text style={styles.scoreCaption}>CORRECT ANSWERS</Text>
            <Text style={styles.scoreDetail}>HEARTS REMAINING: {health}/3</Text>
          </View>
          <TouchableOpacity style={styles.primaryBtn} onPress={startGame}>
            <Text style={styles.primaryBtnText}>↻  PLAY AGAIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => setScreen("home")}>
            <Text style={styles.secondaryBtnText}>MAIN MENU</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.game} keyboardShouldPersistTaps="handled">
        <View style={styles.topRow}>
          <Text style={styles.smallBrand}>⚔ SYLLABUS SLAYER</Text>
          <Text style={styles.level}>LEVEL 01</Text>
        </View>
        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>YOUR HEALTH</Text>
            <Text style={styles.hearts}>{healthLabel}</Text>
          </View>
          <View style={[styles.statBox, { alignItems: "flex-end" }]}>
            <Text style={styles.statLabel}>DEMON HP</Text>
            <Text style={styles.demonHealth}>{demonHP}/5</Text>
          </View>
        </View>
        <View style={styles.hpTrack}><View style={[styles.hpFill, { width: `${demonHP * 20}%` }]} /></View>

        <View style={styles.arena}>
          <View style={styles.arenaCharacter}>
            <Text style={styles.avatar}>🧝</Text>
            <Text style={styles.avatarName}>SLAYER</Text>
          </View>
          <Text style={[styles.arenaAction, lastCorrect ? styles.gold : styles.red]}>{selected === null ? "⚔  FIGHT!" : lastCorrect ? "SLASH!" : "OUCH!"}</Text>
          <View style={styles.arenaCharacter}>
            <Text style={styles.avatar}>{demonHP === 0 ? "💥" : "👹"}</Text>
            <Text style={styles.avatarName}>DEMON</Text>
          </View>
        </View>

        <View style={styles.progressRow}>
          <Text style={styles.progressText}>QUESTION {index + 1} / {QUESTIONS.length}</Text>
          <Text style={styles.progressText}>SCORE: {score}</Text>
        </View>
        <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${((index + 1) / QUESTIONS.length) * 100}%` }]} /></View>

        <View style={styles.questionCard}>
          <Text style={styles.subject}>CLASS 9 SST  •  DEMOCRACY</Text>
          <Text style={styles.question}>{question.q}</Text>
          {question.options.map((option, i) => {
            const isChosen = selected === i;
            const isAnswer = selected !== null && i === question.answer;
            return (
              <TouchableOpacity
                key={i}
                disabled={selected !== null}
                onPress={() => chooseAnswer(i)}
                activeOpacity={0.8}
                style={[
                  styles.option,
                  isChosen && (isAnswer ? styles.correctOption : styles.wrongOption),
                  isAnswer && selected !== null && styles.correctOption
                ]}
              >
                <Text style={[styles.optionLetter, isAnswer && selected !== null && styles.correctText]}>{LETTERS[i]}</Text>
                <Text style={[styles.optionText, isAnswer && selected !== null && styles.correctText]}>{option}</Text>
                {isAnswer && selected !== null ? <Text style={styles.check}>✓</Text> : null}
                {isChosen && !isAnswer ? <Text style={styles.check}>✕</Text> : null}
              </TouchableOpacity>
            );
          })}
          {selected !== null && (
            <View style={[styles.feedbackBox, lastCorrect ? styles.feedbackGood : styles.feedbackBad]}>
              <Text style={styles.feedbackText}>{feedback}</Text>
              <TouchableOpacity style={styles.nextBtn} onPress={nextQuestion}>
                <Text style={styles.nextBtnText}>{health <= 0 ? "SEE RESULT" : index === QUESTIONS.length - 1 ? "FINISH HUNT" : "NEXT QUESTION  →"}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Text style={styles.footer}>STAY SHARP, SLAYER.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#090d18" },
  home: { flex: 1, paddingHorizontal: 25, paddingTop: 38, paddingBottom: 22, alignItems: "center", justifyContent: "space-between" },
  eyebrow: { color: "#d7a94b", letterSpacing: 5, fontSize: 11, fontWeight: "900" },
  logo: { color: "#f5f0e7", fontSize: 42, fontWeight: "900", letterSpacing: 3, textAlign: "center", lineHeight: 47, marginTop: 16 },
  logoGold: { color: "#e5ad49" },
  tagline: { color: "#8994a9", letterSpacing: 2, fontSize: 10, marginTop: 5 },
  heroArt: { width: "100%", minHeight: 145, backgroundColor: "#141d30", borderWidth: 1, borderColor: "#29354b", borderRadius: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginVertical: 18 },
  heroEmoji: { fontSize: 66 }, demonEmoji: { fontSize: 68 }, vs: { color: "#e5ad49", fontWeight: "900", fontSize: 20 },
  intro: { color: "#c2cad8", textAlign: "center", lineHeight: 23, fontSize: 14 },
  mission: { width: "100%", padding: 17, backgroundColor: "#111a2a", borderRadius: 14, borderColor: "#29354b", borderWidth: 1, gap: 7 },
  missionTitle: { color: "#e5ad49", fontWeight: "900", letterSpacing: 2, marginBottom: 3 },
  missionText: { color: "#c3ccda", fontSize: 11, letterSpacing: 1.2, fontWeight: "700" },
  primaryBtn: { backgroundColor: "#b77a2e", width: "100%", borderRadius: 12, paddingVertical: 17, alignItems: "center", marginTop: 17, borderBottomWidth: 4, borderBottomColor: "#75471f" },
  primaryBtnText: { color: "#140f0a", fontSize: 15, fontWeight: "900", letterSpacing: 2 },
  footer: { color: "#657087", fontSize: 9, letterSpacing: 2, textAlign: "center", marginTop: 20 },
  game: { paddingHorizontal: 17, paddingTop: 15, paddingBottom: 30 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  smallBrand: { color: "#e5ad49", fontSize: 12, fontWeight: "900", letterSpacing: 1.5 },
  level: { color: "#8f9bb0", fontSize: 10, fontWeight: "800", letterSpacing: 1.5 },
  stats: { flexDirection: "row", justifyContent: "space-between", marginTop: 19 },
  statBox: { flex: 1, backgroundColor: "#131d2e", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#27364d" },
  statLabel: { color: "#8794aa", fontSize: 9, fontWeight: "900", letterSpacing: 1.5 },
  hearts: { color: "#f15b64", fontSize: 21, marginTop: 5, letterSpacing: 2 },
  demonHealth: { color: "#f16a54", fontSize: 20, fontWeight: "900", marginTop: 5 },
  hpTrack: { height: 7, backgroundColor: "#283044", borderRadius: 5, overflow: "hidden", marginTop: 8 },
  hpFill: { height: 7, backgroundColor: "#d94d49", borderRadius: 5 },
  arena: { marginTop: 15, padding: 12, minHeight: 115, backgroundColor: "#121a2a", borderRadius: 15, borderWidth: 1, borderColor: "#27364d", flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
  arenaCharacter: { alignItems: "center", minWidth: 70 },
  avatar: { fontSize: 48 },
  avatarName: { color: "#aab4c5", fontSize: 9, fontWeight: "900", letterSpacing: 2, marginTop: 4 },
  arenaAction: { fontWeight: "900", fontSize: 12, letterSpacing: 1 },
  gold: { color: "#f0bd58" }, red: { color: "#f06c6c" },
  progressRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 19, marginBottom: 8 },
  progressText: { color: "#9da9bc", fontSize: 10, fontWeight: "900", letterSpacing: 1 },
  progressTrack: { height: 4, backgroundColor: "#273146", borderRadius: 4, overflow: "hidden", marginBottom: 14 },
  progressFill: { height: 4, backgroundColor: "#d4a14a" },
  questionCard: { backgroundColor: "#111a2a", borderColor: "#29364d", borderWidth: 1, borderRadius: 16, padding: 16 },
  subject: { color: "#d7a94b", fontSize: 9, fontWeight: "900", letterSpacing: 1.5, marginBottom: 11 },
  question: { color: "#f4f2ed", fontSize: 19, lineHeight: 27, fontWeight: "800", marginBottom: 17 },
  option: { minHeight: 51, paddingHorizontal: 12, marginTop: 9, borderRadius: 10, backgroundColor: "#1a263a", borderWidth: 1, borderColor: "#34445e", flexDirection: "row", alignItems: "center" },
  optionLetter: { color: "#e0b35e", fontWeight: "900", fontSize: 13, width: 28 },
  optionText: { color: "#e2e7ef", fontSize: 13, fontWeight: "600", flex: 1, paddingVertical: 9 },
  correctOption: { backgroundColor: "#16382e", borderColor: "#39a879" },
  wrongOption: { backgroundColor: "#421f2b", borderColor: "#d34f5b" },
  correctText: { color: "#7ee0ad" },
  check: { color: "#8ce1b5", fontWeight: "900", fontSize: 18, marginLeft: 6 },
  feedbackBox: { padding: 12, borderRadius: 10, marginTop: 15, borderWidth: 1 },
  feedbackGood: { backgroundColor: "#153329", borderColor: "#2e8d69" },
  feedbackBad: { backgroundColor: "#3b2028", borderColor: "#a84854" },
  feedbackText: { color: "#f1e9dc", fontSize: 12, lineHeight: 18, fontWeight: "600" },
  nextBtn: { backgroundColor: "#d4a14a", borderRadius: 8, padding: 13, alignItems: "center", marginTop: 12 },
  nextBtnText: { color: "#19130a", fontSize: 11, fontWeight: "900", letterSpacing: 1.4 },
  result: { flex: 1, padding: 26, alignItems: "center", justifyContent: "center" },
  resultIcon: { fontSize: 80, marginBottom: 20 },
  resultTitle: { fontSize: 31, fontWeight: "900", letterSpacing: 2 },
  resultSub: { color: "#aab4c5", marginTop: 10, textAlign: "center", fontSize: 14 },
  scoreCard: { width: "100%", marginTop: 35, padding: 25, backgroundColor: "#131d2e", borderRadius: 16, borderWidth: 1, borderColor: "#35435a", alignItems: "center" },
  scoreNumber: { color: "#f1bd5c", fontSize: 48, fontWeight: "900" },
  scoreCaption: { color: "#aeb9ca", fontSize: 10, letterSpacing: 2, fontWeight: "900", marginTop: 5 },
  scoreDetail: { color: "#e1e6ee", fontSize: 12, marginTop: 18, fontWeight: "800" },
  secondaryBtn: { padding: 15, marginTop: 9 },
  secondaryBtnText: { color: "#aeb9ca", letterSpacing: 2, fontSize: 11, fontWeight: "900" }
});
