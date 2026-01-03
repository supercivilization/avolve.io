// Mock for react-native-worklets on web
// This module is required by react-native-reanimated 4.x but not needed on web

module.exports = {
  // Export empty implementations to satisfy imports
  Worklets: {},
  createWorkletContext: () => ({}),
  createWorkletRuntime: () => ({}),
}
