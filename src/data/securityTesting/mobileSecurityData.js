/**
 * Authentic Mobile Security Vulnerability Database
 * Adheres strictly to OWASP Mobile Application Security (MASVS v2.0) and MASTG.
 * Split into Android, iOS, and Cross-Platform/Mobile API testing.
 * Zero-fabrication policy: strictly technical, educational, and authorized testing methodologies.
 */

export const mobileVulnerabilities = [
  // ==========================================
  // ANDROID PLATFORM
  // ==========================================
  {
    slug: "android-insecure-local-storage-shared-preferences",
    name: "Insecure Local Storage & SharedPreferences Data Leakage (Android)",
    shortDefinition: "Occurs when Android applications store unencrypted authentication tokens, passwords, or personal data in standard SharedPreferences XML files or unencrypted SQLite databases on the device filesystem.",
    category: "mobile-security",
    categoryName: "Mobile Security",
    applicablePlatform: "Android",
    mobilePlatform: "Android",
    owaspClassification: "OWASP Mobile Top 10 M2:2024 — Insecure Data Storage (MASVS-STORAGE)",
    cweClassification: "CWE-922: Insecure Storage of Sensitive Information",
    severity: "Contextual: High (Enables token theft, credential extraction, or privacy violations if the device is rooted, backed up, or physically accessed)",
    difficulty: "Beginner",
    rootCause: "Using standard `getSharedPreferences(\"user_prefs\", Context.MODE_PRIVATE)` without hardware-backed cryptographic encryption, or storing sensitive data in world-readable storage directories.",
    whereTestersLook: "`/data/data/<package_name>/shared_prefs/`, `/data/data/<package_name>/databases/`, and external storage (`/sdcard/Android/data/`).",
    authorizedTestingMethodology: [
      "Install the target test APK on a dedicated authorized Android testing emulator or rooted test device.",
      "Log in with a test account and perform typical application workflows.",
      "Inspect the internal sandbox directory via ADB shell (`adb shell run-as <package_name> ls -la shared_prefs/`).",
      "Review the contents of `.xml` and `.db` files for cleartext session tokens, passwords, or PII."
    ],
    safeTestExample: {
      requestMethod: "ADB Inspection",
      endpoint: "/data/data/<LAB_PACKAGE_NAME>/shared_prefs/auth_data.xml",
      headers: {},
      payload: "<map><string name=\"auth_token\">SAFE_TEST_TOKEN_VALUE</string></map>"
    },
    safeTestInput: {
      input: "Inspecting SharedPreferences XML file in test sandbox",
      purpose: "Verify whether stored tokens and credentials are encrypted using EncryptedSharedPreferences.",
      expectedSecureBehavior: "Tokens are stored as AES-256 encrypted ciphertexts backed by the Android Keystore, or absent from persistent storage.",
      vulnerableBehaviorIndicators: [
        "Plaintext JWT tokens, passwords, or PII visible in standard XML files (`<string name=\"jwt_token\">...`).",
        "SQLite databases unencrypted without SQLCipher."
      ]
    },
    evidenceToCollect: "ADB shell file dump showing cleartext token XML elements in a lab environment. Tokens redacted.",
    developerRemediation: "Use Android Jetpack Security's `EncryptedSharedPreferences` and `EncryptedFile` backed by `MasterKey` in the Android Keystore. For databases, implement SQLCipher.",
    preventionChecklist: [
      "Use `EncryptedSharedPreferences.create()` with `AES256_GCM` encryption.",
      "Avoid storing user passwords locally; store only short-lived session tokens.",
      "Disable auto-backup for sensitive files in `AndroidManifest.xml` (`android:allowBackup=\"false\"`)."
    ],
    references: [
      { name: "OWASP MASVS-STORAGE: Data Storage and Privacy", url: "https://mas.owasp.org/MASVS/03-MASVS-STORAGE/", type: "OWASP" },
      { name: "Android Developers: EncryptedSharedPreferences", url: "https://developer.android.com/reference/androidx/security/crypto/EncryptedSharedPreferences", type: "Official Docs" },
      { name: "CWE-922: Insecure Storage of Sensitive Information", url: "https://cwe.mitre.org/data/definitions/922.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "android-exported-components-access-control",
    name: "Exported Android Activities & Components (Improper Access Control)",
    shortDefinition: "Occurs when Android components (Activities, Services, Broadcast Receivers, Content Providers) are declared with `android:exported=\"true\"` without permission checks, allowing other apps on the device to invoke them directly.",
    category: "mobile-security",
    categoryName: "Mobile Security",
    applicablePlatform: "Android",
    mobilePlatform: "Android",
    owaspClassification: "OWASP Mobile Top 10 M1:2024 — Improper Platform Usage (MASVS-PLATFORM)",
    cweClassification: "CWE-926: Improper Export of Android Application Components",
    severity: "Contextual: High (Enables authentication bypass, sensitive screen display, or unauthorized data modification)",
    difficulty: "Beginner",
    rootCause: "Failing to set `android:exported=\"false\"` on internal Activities, or adding an `<intent-filter>` which defaults `exported` to `true` on Android versions prior to Android 12 without setting permission requirements.",
    whereTestersLook: "`AndroidManifest.xml` decompiled via `jadx-gui` or `apktool`, reviewing `<activity>`, `<service>`, `<receiver>`, and `<provider>` tags.",
    authorizedTestingMethodology: [
      "Decompile the APK manifest using `jadx` or `apktool` and list all components with `android:exported=\"true\"`.",
      "In an authorized lab emulator, attempt to invoke internal activities directly via ADB activity manager: `adb shell am start -n <package_name>/.InternalAdminActivity`.",
      "Observe if the activity launches without requiring authentication or passing prior security checks."
    ],
    safeTestExample: {
      requestMethod: "ADB Activity Manager",
      endpoint: "adb shell am start -n <LAB_PACKAGE_NAME>/.PinBypassTestActivity",
      headers: {},
      payload: null
    },
    safeTestInput: {
      input: "adb shell am start -n <LAB_PACKAGE_NAME>/.InternalDashboardActivity",
      purpose: "Check if sensitive internal activities can be invoked directly from external processes.",
      expectedSecureBehavior: "Security exception thrown (`java.lang.SecurityException: Permission Denial`) or activity verifies session state on `onCreate` and terminates.",
      vulnerableBehaviorIndicators: [
        "Internal activity displays sensitive user screens without requiring the master PIN or biometric authentication."
      ]
    },
    evidenceToCollect: "Manifest excerpt showing `android:exported=\"true\"` alongside screen capture of launched internal activity in test lab.",
    developerRemediation: "Explicitly set `android:exported=\"false\"` for all components not intended for external invocation. If an external component is necessary, protect it with custom signature-level permissions (`android:protectionLevel=\"signature\"`).",
    preventionChecklist: [
      "Explicitly declare `android:exported` on every component in `AndroidManifest.xml`.",
      "Verify session and authentication state on `onResume()` in all sensitive activities.",
      "Use `android:protectionLevel=\"signature\"` for inter-app communications within the same developer ecosystem."
    ],
    references: [
      { name: "OWASP MASTG: Testing Android Exported Components", url: "https://mas.owasp.org/MASTG/tests/android/MASVS-PLATFORM/MASTG-TEST-0028/", type: "OWASP" },
      { name: "CWE-926: Improper Export of Android Application Components", url: "https://cwe.mitre.org/data/definitions/926.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "android-intent-filters-deep-link-manipulation",
    name: "Vulnerable Android Intent Filters & Deep Link Manipulation",
    shortDefinition: "Flaws where deep links (`myapp://`) or App Links accept untrusted URI parameters that navigate to internal WebViews, trigger unauthorized actions, or leak tokens.",
    category: "mobile-security",
    categoryName: "Mobile Security",
    applicablePlatform: "Android",
    mobilePlatform: "Android",
    owaspClassification: "OWASP Mobile Top 10 M1:2024 — Improper Platform Usage (MASVS-PLATFORM)",
    cweClassification: "CWE-939: Improper Authorization in Handler for Custom URL Scheme",
    severity: "Contextual: High (Can lead to account takeover, CSRF-like actions, or open redirects within the app)",
    difficulty: "Intermediate",
    rootCause: "Deep link handlers parsing URI parameters (e.g. `myapp://open?url=...` or `myapp://token?val=...`) and executing state changes without validating the origin or parameter authenticity.",
    whereTestersLook: "`AndroidManifest.xml` `<intent-filter>` blocks containing `<data android:scheme=\"...\" />`, and `onNewIntent()` / `onCreate()` URI parsing methods.",
    authorizedTestingMethodology: [
      "Extract all custom URL schemes from `AndroidManifest.xml`.",
      "In a test emulator, trigger deep links using ADB: `adb shell am start -a android.intent.action.VIEW -d \"myapp://test-link?target=https://lab.example\" <package_name>`.",
      "Check if the deep link opens untrusted external URLs in an internal privileged WebView or performs sensitive state modifications without user confirmation."
    ],
    safeTestExample: {
      requestMethod: "ADB Intent Broadcast",
      endpoint: "adb shell am start -a android.intent.action.VIEW -d \"myapp://view?url=https://test-controlled-lab.example\" <LAB_PACKAGE_NAME>",
      headers: {},
      payload: null
    },
    safeTestInput: {
      input: "myapp://view?url=https://test-controlled-lab.example",
      purpose: "Check if the deep link handler validates target URL domains against a strict allowlist.",
      expectedSecureBehavior: "The application rejects untrusted domains or opens external links in the system default browser without passing private tokens.",
      vulnerableBehaviorIndicators: [
        "Internal WebView navigates to arbitrary third-party domains with active JavaScript bridges.",
        "Account actions executed automatically upon deep link receipt without confirmation."
      ]
    },
    evidenceToCollect: "Decompiled deep link router code and emulator log demonstrating unvalidated URL navigation.",
    developerRemediation: "Implement Android App Links with verified `assetlinks.json` domain association. Validate all incoming URI parameters against strict allowlists. Require user confirmation for any state-changing actions.",
    preventionChecklist: [
      "Use Android App Links (`https://`) with digital asset link verification rather than custom schemes.",
      "Never pass authentication tokens or sensitive data via deep link query strings.",
      "Require explicit user confirmation for sensitive actions initiated via deep links."
    ],
    references: [
      { name: "OWASP MASTG: Testing Deep Links in Android", url: "https://mas.owasp.org/MASTG/tests/android/MASVS-PLATFORM/MASTG-TEST-0027/", type: "OWASP" },
      { name: "Android Developers: Handling Android App Links", url: "https://developer.android.com/training/app-links", type: "Official Docs" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "android-insecure-webviews-javascript-interfaces",
    name: "Insecure Android WebViews & JavaScript Interfaces",
    shortDefinition: "Misconfigured WebViews with enabled JavaScript, file access (`setAllowFileAccess`), or vulnerable `@JavascriptInterface` bridges exposed to untrusted web content.",
    category: "mobile-security",
    categoryName: "Mobile Security",
    applicablePlatform: "Android",
    mobilePlatform: "Android",
    owaspClassification: "OWASP Mobile Top 10 M1:2024 — Improper Platform Usage (MASVS-PLATFORM)",
    cweClassification: "CWE-749: Exposed Dangerous Method or Function",
    severity: "Contextual: High to Critical (Enables local file theft, native code execution, or token extraction from the app)",
    difficulty: "Intermediate",
    rootCause: "Enabling `setAllowFileAccess(true)`, `setAllowUniversalAccessFromFileURLs(true)`, or exposing Java object bridges (`addJavascriptInterface`) to WebViews loading external untrusted URLs.",
    whereTestersLook: "Java/Kotlin source code calling `WebView.getSettings()`, `addJavascriptInterface()`, and `shouldOverrideUrlLoading()`.",
    authorizedTestingMethodology: [
      "Decompile the APK and search for WebView configuration calls in `jadx`.",
      "Check if `setAllowFileAccess(true)` is present alongside dynamic URL loading.",
      "Inspect exposed `@JavascriptInterface` methods to see if native functionality (file system, device sensors, auth tokens) is exposed to web contexts.",
      "Verify whether the WebView restricts navigation to trusted domains."
    ],
    safeTestExample: {
      requestMethod: "Static Code Analysis",
      endpoint: "WebView.addJavascriptInterface(new SafeBridge(), \"AndroidApp\")",
      headers: {},
      payload: null
    },
    safeTestInput: {
      input: "Checking JavascriptInterface methods for exposed native functions",
      purpose: "Ensure native bridge methods validate calling origin and do not expose sensitive APIs.",
      expectedSecureBehavior: "WebViews disable file access (`setAllowFileAccess(false)`), restrict loading strictly to allowlisted domains, and use `WebViewAssetLoader` for local assets.",
      vulnerableBehaviorIndicators: [
        "`setAllowUniversalAccessFromFileURLs(true)` enabled.",
        "Untrusted web content can call native Java methods to read device files or tokens."
      ]
    },
    evidenceToCollect: "Decompiled source code showing dangerous WebView settings and exposed interface methods.",
    developerRemediation: "Use `androidx.webkit.WebViewAssetLoader` for secure local content loading. Disable file access (`setAllowFileAccess(false)`). Expose JavaScript interfaces only to strictly allowlisted HTTPS origins.",
    preventionChecklist: [
      "Disable universal file access and file access from file URLs.",
      "Validate URL origins in `shouldOverrideUrlLoading()`.",
      "Avoid exposing native interfaces to WebViews that load external web content."
    ],
    references: [
      { name: "OWASP MASTG: Testing Android WebViews", url: "https://mas.owasp.org/MASTG/tests/android/MASVS-PLATFORM/MASTG-TEST-0025/", type: "OWASP" },
      { name: "Android Developers: Building web apps in WebView", url: "https://developer.android.com/develop/ui/views/layout/web-apps/webview", type: "Official Docs" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "android-network-security-config-cleartext-traffic",
    name: "Improper Android Network Security Configuration & Cleartext Traffic",
    shortDefinition: "Misconfigured network security configuration files allowing unencrypted HTTP traffic or permitting user-installed CA certificates in release builds.",
    category: "mobile-security",
    categoryName: "Mobile Security",
    applicablePlatform: "Android",
    mobilePlatform: "Android",
    owaspClassification: "OWASP Mobile Top 10 M5:2024 — Insecure Communication (MASVS-NETWORK)",
    cweClassification: "CWE-319: Cleartext Transmission of Sensitive Information",
    severity: "Contextual: High (Allows traffic interception, token sniffing, and man-in-the-middle attacks on public networks)",
    difficulty: "Beginner",
    rootCause: "Setting `android:usesCleartextTraffic=\"true\"` in `AndroidManifest.xml` or including `<certificates src=\"user\" />` inside `<base-config>` in production `network_security_config.xml`.",
    whereTestersLook: "`res/xml/network_security_config.xml` and `AndroidManifest.xml` `android:networkSecurityConfig` attribute.",
    authorizedTestingMethodology: [
      "Inspect `res/xml/network_security_config.xml` in the decompiled APK.",
      "Check if `<trust-anchors>` permits user certificates in the release configuration.",
      "Test network interception in a lab: install a proxy CA on a test device and observe whether release builds connect or reject the untrusted CA.",
      "Verify whether any API calls use plain unencrypted `http://` URLs."
    ],
    safeTestExample: {
      requestMethod: "Static XML Inspection",
      endpoint: "res/xml/network_security_config.xml",
      headers: {},
      payload: "<network-security-config><base-config cleartextTrafficPermitted=\"false\"><trust-anchors><certificates src=\"system\" /></trust-anchors></base-config></network-security-config>"
    },
    safeTestInput: {
      input: "Inspecting network_security_config.xml",
      purpose: "Verify that cleartext traffic is blocked and only system CAs are trusted in production.",
      expectedSecureBehavior: "Cleartext traffic is disabled (`cleartextTrafficPermitted=\"false\"`) and only system CAs are trusted in release builds.",
      vulnerableBehaviorIndicators: [
        "`cleartextTrafficPermitted=\"true\"` configured for sensitive domains.",
        "User certificates trusted globally in production builds without `<debug-overrides>`."
      ]
    },
    evidenceToCollect: "Decompiled XML configuration demonstrating permissive cleartext or trust-anchor rules.",
    developerRemediation: "Enforce `cleartextTrafficPermitted=\"false\"`. Separate debug proxy configurations into `<debug-overrides>` so user CAs are only trusted in debuggable builds.",
    preventionChecklist: [
      "Enforce HTTPS across all network requests.",
      "Use `<debug-overrides>` strictly for development test proxies.",
      "Implement certificate pinning for high-security endpoints."
    ],
    references: [
      { name: "Android Developers: Network Security Configuration", url: "https://developer.android.com/privacy-and-security/security-config", type: "Official Docs" },
      { name: "OWASP MASVS-NETWORK: Network Communication", url: "https://mas.owasp.org/MASVS/05-MASVS-NETWORK/", type: "OWASP" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "android-debuggable-backup-flag-enabled",
    name: "Android Debuggable & Backup Flags Enabled",
    shortDefinition: "Release APKs deployed with `android:debuggable=\"true\"` or `android:allowBackup=\"true\"`, allowing local debugger attachment, memory inspection, or ADB data extraction.",
    category: "mobile-security",
    categoryName: "Mobile Security",
    applicablePlatform: "Android",
    mobilePlatform: "Android",
    owaspClassification: "OWASP Mobile Top 10 M7:2024 — Insecure Application Resilience",
    cweClassification: "CWE-489: Active Debug Code (also CWE-200: Exposure of Sensitive Information)",
    severity: "Contextual: Medium to High (Enables full application memory dumps, runtime manipulation, or ADB backup extraction)",
    difficulty: "Beginner",
    rootCause: "Failing to disable debug flags in Gradle release build types (`debuggable false`) or leaving default `android:allowBackup=\"true\"` active without backup rules.",
    whereTestersLook: "`AndroidManifest.xml` `<application>` tag attributes (`android:debuggable`, `android:allowBackup`).",
    authorizedTestingMethodology: [
      "Decompile the APK manifest and check the `<application>` tag for `android:debuggable` and `android:allowBackup`.",
      "In an authorized lab, attempt to attach JDWP debugger via ADB: `adb jdwp`.",
      "Test ADB backup extraction: `adb backup -f test_backup.ab -noapk <package_name>` on a non-rooted test device to verify if app data is exported."
    ],
    safeTestExample: {
      requestMethod: "ADB Command",
      endpoint: "adb jdwp (checks for attachable JDWP processes)",
      headers: {},
      payload: null
    },
    safeTestInput: {
      input: "Checking android:debuggable in release manifest",
      purpose: "Verify that production binaries disable debugging and unencrypted ADB backups.",
      expectedSecureBehavior: "`android:debuggable=\"false\"` and `android:allowBackup=\"false\"` in release builds.",
      vulnerableBehaviorIndicators: [
        "JDWP debugger attaches successfully to the release APK.",
        "ADB backup exports unencrypted private databases and session files."
      ]
    },
    evidenceToCollect: "Manifest excerpt showing `android:debuggable=\"true\"` or successful ADB backup archive output in test lab.",
    developerRemediation: "Ensure `build.gradle` defines `debuggable false` in the `release` build type. Set `android:allowBackup=\"false\"` or define specific `<full-backup-content>` exclusion rules.",
    preventionChecklist: [
      "Set `minifyEnabled true` and `debuggable false` in release build types.",
      "Explicitly disable `android:allowBackup` unless required for cloud restore.",
      "Verify release build manifests before publishing."
    ],
    references: [
      { name: "OWASP MASTG: Testing Android Debuggable Flag", url: "https://mas.owasp.org/MASTG/tests/android/MASVS-RESILIENCE/MASTG-TEST-0036/", type: "OWASP" },
      { name: "CWE-489: Active Debug Code", url: "https://cwe.mitre.org/data/definitions/489.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },

  // ==========================================
  // IOS PLATFORM
  // ==========================================
  {
    slug: "ios-insecure-keychain-usage",
    name: "Insecure iOS Keychain Usage & Missing Accessibility Attributes",
    shortDefinition: "Improper storage of sensitive authentication credentials in the iOS Keychain using permissive accessibility attributes (such as `kSecAttrAccessibleAlways`), allowing data access while the device is locked.",
    category: "mobile-security",
    categoryName: "Mobile Security",
    applicablePlatform: "iOS",
    mobilePlatform: "iOS",
    owaspClassification: "OWASP Mobile Top 10 M2:2024 — Insecure Data Storage (MASVS-STORAGE)",
    cweClassification: "CWE-922: Insecure Storage of Sensitive Information",
    severity: "Contextual: High (Enables extraction of stored credentials from locked or compromised devices)",
    difficulty: "Intermediate",
    rootCause: "Storing secrets in the Keychain with deprecated or weak accessibility flags like `kSecAttrAccessibleAlways` rather than `kSecAttrAccessibleWhenUnlockedThisDeviceOnly`.",
    whereTestersLook: "Swift / Objective-C source files calling `SecItemAdd()` or third-party wrapper libraries (e.g. KeychainAccess, SwiftKeychainWrapper).",
    authorizedTestingMethodology: [
      "Review Keychain item creation code for the assigned `kSecAttrAccessible` accessibility constant.",
      "On a jailbroken iOS test device, inspect the application's Keychain entries using security tools (e.g. `keychain-dumper`) in an authorized lab.",
      "Verify whether the items are restricted to the local device (`ThisDeviceOnly`) to prevent extraction via unencrypted iCloud backups."
    ],
    safeTestExample: {
      requestMethod: "Static Code Review",
      endpoint: "SecItemAdd(query as CFDictionary, nil)",
      headers: {},
      payload: "kSecAttrAccessible: kSecAttrAccessibleWhenUnlockedThisDeviceOnly"
    },
    safeTestInput: {
      input: "Reviewing Keychain accessibility attributes in Swift source",
      purpose: "Verify that Keychain items are accessible only when the device is unlocked and restricted to the local hardware.",
      expectedSecureBehavior: "Keychain items use `kSecAttrAccessibleWhenUnlockedThisDeviceOnly` or require Secure Enclave biometric evaluation.",
      vulnerableBehaviorIndicators: [
        "Use of `kSecAttrAccessibleAlways` or `kSecAttrAccessibleAlwaysThisDeviceOnly`.",
        "Storing sensitive credentials in `UserDefaults` instead of the Keychain."
      ]
    },
    evidenceToCollect: "Source code excerpt showing permissive Keychain accessibility constant or Keychain dump from authorized test device.",
    developerRemediation: "Use `kSecAttrAccessibleWhenUnlockedThisDeviceOnly` or `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly` for Keychain items. Protect high-value keys with `SecAccessControl` requiring user biometric authentication backed by the Secure Enclave.",
    preventionChecklist: [
      "Always use `ThisDeviceOnly` accessibility flags to prevent extraction via backups.",
      "Never store credentials, private keys, or PII in `UserDefaults` (standard Plist).",
      "Leverage the Secure Enclave (`kSecAttrTokenIDSecureEnclave`) for cryptographic key generation."
    ],
    references: [
      { name: "Apple Platform Security: Keychain Data Protection", url: "https://support.apple.com/guide/security/keychain-data-protection-secb06949a34/web", type: "Official Docs" },
      { name: "OWASP MASTG: Testing Keychain Storage on iOS", url: "https://mas.owasp.org/MASTG/tests/ios/MASVS-STORAGE/MASTG-TEST-0056/", type: "OWASP" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "ios-custom-url-schemes-universal-links",
    name: "iOS Custom URL Schemes & Universal Link Hijacking",
    shortDefinition: "Vulnerabilities in custom URL schemes (`myapp://`) where any application on the device can claim the same scheme, intercept parameters, or invoke internal screens without origin validation.",
    category: "mobile-security",
    categoryName: "Mobile Security",
    applicablePlatform: "iOS",
    mobilePlatform: "iOS",
    owaspClassification: "OWASP Mobile Top 10 M1:2024 — Improper Platform Usage (MASVS-PLATFORM)",
    cweClassification: "CWE-939: Improper Authorization in Handler for Custom URL Scheme",
    severity: "Contextual: High (Enables parameter hijacking, OAuth code interception, or unauthorized action execution)",
    difficulty: "Intermediate",
    rootCause: "Relying on custom URL schemes without unique domain binding, and executing sensitive actions in `application(_:open:options:)` without origin or signature checks.",
    whereTestersLook: "`Info.plist` under `CFBundleURLTypes`, `application:openURL:options:` in `AppDelegate.swift`, or `scene(_:openURLContexts:)` in `SceneDelegate.swift`.",
    authorizedTestingMethodology: [
      "Inspect `Info.plist` for registered `CFBundleURLSchemes`.",
      "In an authorized iOS simulator, test invoking the scheme using the command line: `xcrun simctl openurl booted \"myapp://action?target=lab_test\"`.",
      "Check if the handler processes parameters and executes actions without user confirmation.",
      "Verify whether Universal Links (`apple-app-site-association`) are used for OAuth callbacks instead of custom schemes."
    ],
    safeTestExample: {
      requestMethod: "iOS Simulator CLI",
      endpoint: "xcrun simctl openurl booted \"myapp://payment/transfer?amount=10&to=lab_user\"",
      headers: {},
      payload: null
    },
    safeTestInput: {
      input: "xcrun simctl openurl booted \"myapp://transfer?amount=10\"",
      purpose: "Check if sensitive state changes can be triggered via URL schemes without user confirmation.",
      expectedSecureBehavior: "The app prompts the user with an interactive confirmation dialog or uses Universal Links with cryptographic domain verification.",
      vulnerableBehaviorIndicators: [
        "Action executed automatically in the background upon receiving the custom scheme URL."
      ]
    },
    evidenceToCollect: "Swift code excerpt showing `openURL` handler lacking parameter validation or confirmation dialogs.",
    developerRemediation: "Migrate from custom URL schemes to Universal Links backed by a verified `apple-app-site-association` file on your HTTPS domain. Require explicit user authentication before executing state changes.",
    preventionChecklist: [
      "Use Universal Links for OAuth redirects and inter-app communication.",
      "Never transmit sensitive tokens or execute destructive actions via URL schemes.",
      "Require interactive user confirmation for all link-initiated workflows."
    ],
    references: [
      { name: "Apple Developer: Allowing Apps and Websites to Link to Your Content", url: "https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content", type: "Official Docs" },
      { name: "OWASP MASTG: Testing iOS Custom URL Schemes", url: "https://mas.owasp.org/MASTG/tests/ios/MASVS-PLATFORM/MASTG-TEST-0063/", type: "OWASP" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "ios-app-transport-security-ats-exceptions",
    name: "Insecure iOS App Transport Security (ATS) Exceptions",
    shortDefinition: "Disabling Apple's App Transport Security (ATS) in `Info.plist` (`NSAllowsArbitraryLoads = true`), permitting the app to communicate over unencrypted HTTP or use obsolete TLS versions.",
    category: "mobile-security",
    categoryName: "Mobile Security",
    applicablePlatform: "iOS",
    mobilePlatform: "iOS",
    owaspClassification: "OWASP Mobile Top 10 M5:2024 — Insecure Communication (MASVS-NETWORK)",
    cweClassification: "CWE-319: Cleartext Transmission of Sensitive Information",
    severity: "Contextual: High (Enables network eavesdropping and token interception on untrusted Wi-Fi networks)",
    difficulty: "Beginner",
    rootCause: "Adding global `NSAllowsArbitraryLoads: true` to `NSAppTransportSecurity` in `Info.plist` to bypass HTTPS certificate requirements during development and leaving it in production.",
    whereTestersLook: "`Info.plist` dictionary under `NSAppTransportSecurity` (`NSAllowsArbitraryLoads`, `NSExceptionDomains`).",
    authorizedTestingMethodology: [
      "Decompile the IPA or inspect `Info.plist` within the application bundle.",
      "Check whether `NSAllowsArbitraryLoads` is set to `true`.",
      "Review `NSExceptionDomains` for overly broad exceptions (e.g. `NSIncludesSubdomains` with `NSTemporaryExceptionAllowsInsecureHTTPLoads`)."
    ],
    safeTestExample: {
      requestMethod: "Static Plist Inspection",
      endpoint: "Info.plist (NSAppTransportSecurity dictionary)",
      headers: {},
      payload: "<key>NSAppTransportSecurity</key><dict><key>NSAllowsArbitraryLoads</key><false/></dict>"
    },
    safeTestInput: {
      input: "Inspecting Info.plist for NSAllowsArbitraryLoads",
      purpose: "Verify that ATS is strictly enforced without global exemptions.",
      expectedSecureBehavior: "`NSAllowsArbitraryLoads` is `false` or completely omitted (defaulting to strict ATS requirements).",
      vulnerableBehaviorIndicators: [
        "`<key>NSAllowsArbitraryLoads</key><true/>` present in production release build."
      ]
    },
    evidenceToCollect: "`Info.plist` excerpt showing `NSAllowsArbitraryLoads: true` in a release application bundle.",
    developerRemediation: "Remove `NSAllowsArbitraryLoads` from production `Info.plist`. If specific legacy third-party domains require exceptions, configure narrow domain-specific rules under `NSExceptionDomains` with strict justification.",
    preventionChecklist: [
      "Enforce standard ATS requirements (TLS 1.2+, forward secrecy, secure ciphers).",
      "Avoid global ATS disable flags.",
      "Audit `Info.plist` in release CI/CD builds."
    ],
    references: [
      { name: "Apple Developer: Preventing Insecure Network Connections", url: "https://developer.apple.com/documentation/security/preventing_insecure_network_connections", type: "Official Docs" },
      { name: "OWASP MASTG: Testing iOS ATS", url: "https://mas.owasp.org/MASTG/tests/ios/MASVS-NETWORK/MASTG-TEST-0065/", type: "OWASP" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },

  // ==========================================
  // CROSS-PLATFORM & MOBILE API SECURITY
  // ==========================================
  {
    slug: "mobile-ssl-tls-certificate-pinning",
    name: "Mobile SSL/TLS Certificate Pinning & Interception Weaknesses",
    shortDefinition: "Failure to implement or validate SSL/TLS certificate pinning on mobile applications handling high-value data, allowing network attackers who compromise or install a CA certificate to decrypt traffic.",
    category: "mobile-security",
    categoryName: "Mobile Security",
    applicablePlatform: "Mobile / API",
    mobilePlatform: "Multiple",
    owaspClassification: "OWASP Mobile Top 10 M5:2024 — Insecure Communication (MASVS-NETWORK)",
    cweClassification: "CWE-295: Improper Certificate Validation",
    severity: "Contextual: Medium to High (Enables man-in-the-middle decryption of mobile API requests when combined with installed proxy certificates)",
    difficulty: "Intermediate",
    rootCause: "Trusting any valid certificate issued by any system-trusted Certificate Authority without verifying the server's specific public key hash (SPKI pinning).",
    whereTestersLook: "Network stack configuration (OkHttp `CertificatePinner` in Android, `URLSessionDelegate` in iOS, or TrustKit).",
    authorizedTestingMethodology: [
      "In an authorized lab, install a custom test CA certificate on the mobile test device.",
      "Route device traffic through an authorized testing proxy (e.g. mitmproxy).",
      "Launch the application and observe whether API connections succeed (indicating missing pinning) or fail immediately with certificate validation errors."
    ],
    safeTestExample: {
      requestMethod: "Network Proxy Test",
      endpoint: "https://api.lab-environment.example/v1/user",
      headers: {
        "User-Agent": "MobileApp/1.0 (Android/iOS Test Lab)"
      },
      payload: null
    },
    safeTestInput: {
      input: "Connecting through test proxy with custom lab CA certificate",
      purpose: "Check if the mobile application enforces public key pinning against production endpoints.",
      expectedSecureBehavior: "The application aborts the TLS handshake (`javax.net.ssl.SSLPeerUnverifiedException` or `NSURLErrorServerCertificateUntrusted`).",
      vulnerableBehaviorIndicators: [
        "HTTPS API traffic is intercepted in cleartext without certificate verification errors."
      ]
    },
    evidenceToCollect: "Proxy log showing accepted custom CA connection in an authorized test environment.",
    developerRemediation: "Implement Subject Public Key Info (SPKI) pinning using standard frameworks (OkHttp `CertificatePinner` on Android, `URLSession` `serverTrust` evaluation on iOS, or Android Network Security Config `<pin-set>`). Include backup pin hashes to prevent service lockouts during certificate rotation.",
    preventionChecklist: [
      "Pin against the public key hash (SPKI) rather than the entire leaf certificate.",
      "Always configure at least one backup pin hash from a secondary CA or intermediate key.",
      "Implement remote configuration mechanisms to update pinned hashes if needed."
    ],
    references: [
      { name: "OWASP Certificate Pinning Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Pinning_Cheat_Sheet.html", type: "OWASP" },
      { name: "CWE-295: Improper Certificate Validation", url: "https://cwe.mitre.org/data/definitions/295.html", type: "MITRE" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  },
  {
    slug: "mobile-client-side-authorization-assumptions",
    name: "Mobile Client-Side Authorization Assumptions",
    shortDefinition: "Relying on client-side boolean flags (such as `isPremium = true` or `isAdmin = true`) stored locally to unlock features without verifying entitlements on the backend server.",
    category: "mobile-security",
    categoryName: "Mobile Security",
    applicablePlatform: "Mobile / API",
    mobilePlatform: "Multiple",
    owaspClassification: "OWASP Mobile Top 10 M1:2024 & OWASP API1:2023",
    cweClassification: "CWE-602: Client-Side Enforcement of Server-Side Security",
    severity: "Contextual: High (Enables full feature unlock, unauthorized content access, or subscription bypass via runtime hooking)",
    difficulty: "Beginner",
    rootCause: "Assuming that code running on a mobile device is tamper-proof and executing critical authorization logic locally instead of gating sensitive content behind server-side API authorization.",
    whereTestersLook: "Decompiled Kotlin/Swift logic controlling feature locks, in-app purchase verification handlers, and API endpoints returning all content before client filtering.",
    authorizedTestingMethodology: [
      "In an authorized lab, decompile the mobile binary and trace how feature gating is enforced.",
      "Check if the backend API returns premium/restricted content to non-paying users and relies on the mobile app UI to hide it.",
      "In a test environment, use runtime instrumentation (e.g. Frida in a lab) to toggle client boolean return values and observe whether the backend serves restricted data."
    ],
    safeTestExample: {
      requestMethod: "API & Client Evaluation",
      endpoint: "/api/v1/articles/premium-content",
      headers: {
        "Authorization": "Bearer <FREE_TIER_TEST_TOKEN>"
      },
      payload: null
    },
    safeTestInput: {
      input: "Requesting premium endpoint with free-tier test token",
      purpose: "Verify that access control is enforced by the backend API server, not client-side UI flags.",
      expectedSecureBehavior: "HTTP 403 Forbidden with message indicating active premium entitlement required.",
      vulnerableBehaviorIndicators: [
        "The API returns the full premium article body in the JSON payload, relying on the mobile app to blur or hide it."
      ]
    },
    evidenceToCollect: "API response showing restricted content returned to unprivileged free-tier test tokens.",
    developerRemediation: "Never rely on the client device for security or business logic decisions. Enforce all entitlement checks and content gating strictly on the server-side API before returning data.",
    preventionChecklist: [
      "Gate all premium data and capabilities server-side.",
      "Validate In-App Purchase receipts server-side with Apple App Store Server API and Google Play Developer API.",
      "Treat all client-supplied state flags as untrusted."
    ],
    references: [
      { name: "CWE-602: Client-Side Enforcement of Server-Side Security", url: "https://cwe.mitre.org/data/definitions/602.html", type: "MITRE" },
      { name: "OWASP Mobile Top 10", url: "https://owasp.org/www-project-mobile-top-10/", type: "OWASP" }
    ],
    lastReviewedDate: "2024-10-15",
    editorialStatus: "CONFIRMED",
    isPaidAdvancedAvailable: false
  }
];
