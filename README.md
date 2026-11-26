# Syllabus Slayer — Android Expo project

A single-level educational RPG quiz demo using the supplied Class 9 SST Democracy MCQs.

## Run locally
1. Install Node.js LTS.
2. Extract this folder.
3. Open a terminal in this folder and run:
   ```bash
   npm install
   npx expo start
   ```
   This starts a development preview. It is not required for the standalone APK.

## Build a standalone Android APK (cloud build)
1. Create/sign in to an Expo account: https://expo.dev/signup
2. Install EAS CLI: `npm install -g eas-cli`
3. Sign in: `eas login`
4. Configure (if prompted): `eas build:configure`
5. Build: `eas build --platform android --profile preview`
6. Download the APK from the build link Expo prints and install it on Android.

The APK runs independently of Expo Go and does not require the development server.

## Notes
- This project uses simple emoji-based placeholder combat visuals and no external game assets.
- The ten questions and answer choices are based on the questions supplied by the user.
- `PIL` is expanded as “Public Interest Litigation” in the answer choice.
- Change the Android package identifier in `app.json` before publishing if you prefer a different permanent application ID.
