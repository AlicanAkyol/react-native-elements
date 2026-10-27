# React Native Elements: native TabView reproduction

Verified 27 October 2026 on React Native 0.87.1, React 19.2.3, iPhone Air Simulator, iOS 26.2, Release configuration (Fabric).

Both views run in the same native binary and JS bundle. BeforeTabView is copied from upstream next commit 32ae0ed. AfterTabView changes only the runtime reference StyleSheet.absoluteFillObject to StyleSheet.absoluteFill. Type-only helper imports are replaced with a local function-component type for portability. Both copies add identical onLayout measurement callbacks to their existing page-wrapper Views. No flex, width, translation or other layout rule is changed.

App.tsx uses the real TabView.Item implementation, three pages, selected index 1, disableTransition, and a 320-point container with a 1-point border. The baseline page widths are 106, 106, 106 (the 318-point inner width divided by three); the fixed page widths are 320, 320, 320. The baseline selected page is blank; the patched selected page displays Second.

To reproduce, copy these four TSX files into an otherwise working RN 0.87.1 app and register App.tsx as its root component. Build and launch on iOS. The fixture switches to the second tab after two seconds and prints the actual native layout events after 3.5 seconds. Both variants appear in one screen. The screenshot is the observed output, not a mockup.

This fixture demonstrates layout and controlled tab selection. It does not test native swipe gestures, Android, or the other components changed in the PR. Their overlay properties are covered separately by the repository regression tests.
