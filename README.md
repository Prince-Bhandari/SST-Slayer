# ⚔️ Syllabus Slayer

**A study RPG for Android: answer questions correctly to slay the demon.**

![Platform](https://img.shields.io/badge/platform-Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![Expo SDK](https://img.shields.io/badge/Expo%20SDK-54-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![React](https://img.shields.io/badge/React-19.1.0-149ECA?style=for-the-badge&logo=react&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-LTS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Status](https://img.shields.io/badge/status-demo-orange?style=for-the-badge&)

---

## Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
  - [Troubleshooting Connection Issues](#troubleshooting-connection-issues)
- [Building a Standalone APK](#building-a-standalone-apk)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Notes](#notes)

---

## About
Syllabus Slayer is a single-level educational RPG quiz demo. Players fight a demon by answering the Class 9 Social Science (Democracy) multiple-choice questions. A correct answer strikes the demon; a wrong answer costs a heart.

## Features
- 10 Class 9 SST (Democracy) MCQs
- 3 hearts for the player and 5 HP for the demon
- The hunt ends in victory as soon as the demon is defeated, or in defeat when all hearts are lost
- Instant feedback showing the correct answer after each question
- Emoji-based visuals, no external game assets

## Tech Stack
| Layer | Technology |
|---|---|
| Framework | [Expo](https://expo.dev) SDK 54 |
| UI | React Native 0.81.5, React 19.1.0 |
| Layout | `react-native-safe-area-context` |
| Builds | [EAS Build](https://docs.expo.dev/build/introduction/) |

## Getting Started

### Prerequisites
- [Node.js LTS](https://nodejs.org)
- An Android phone with **Expo Go for SDK 54**, or an Android emulator
- Git

> **Important:** Expo Go supports only one SDK version at a time, and this project uses **SDK 54**. The latest Play Store version of Expo Go will not open it.
> Download the matching version here: [Expo Go 54.0.8 (APK)](https://github.com/expo/expo-go-releases/releases/download/Expo-Go-54.0.8/Expo-Go-54.0.8.apk)

### Installation
```bash
git clone https://github.com/Prince-Bhandari/SST-Slayer.git
cd SST-Slayer/
npm install
```

### Running the App
```bash
npx expo start
```
Scan the QR code with **Expo Go** on your Android phone (phone and computer must be on the same Wi-Fi), or press `a` to open an Android emulator.


### Troubleshooting Connection Issues
| Problem | Try |
|---|---|
| Phone can't connect on the same Wi-Fi | `npx expo start --lan` |
| Network blocks device-to-device traffic (college or office Wi-Fi) | `npx expo start --tunnel` |
| Tunnel fails with `[Network] fetch failed` | Your network is blocking ngrok. Use your phone's hotspot for the computer, then run `--lan` |
| "Incompatible SDK version" in Expo Go | Install the SDK 54 Expo Go linked above |

## Building a Standalone APK
The APK runs independently of Expo Go and does not need the development server.

1. Create an Expo account: <https://expo.dev/signup>
2. Install the EAS CLI: `npm install -g eas-cli`
3. Sign in: `eas login`
4. Link the project to **your** Expo account (first time only): `eas init`
   This writes your own `projectId` into `app.json`. Commit that change.
5. Build: `eas build --platform android --profile preview`
6. Download the APK from the link Expo prints and install it on your Android device.

## Project Structure
```
SST-Slayer/
├── App.js             # All game screens and logic
├── app.json           # Expo app configuration
├── eas.json           # EAS Build profiles (development, preview, production)
├── package.json       # Dependencies and scripts
├── CONTRIBUTING.md    # Team workflow guide
├── README.md    
└── .gitignore
```
