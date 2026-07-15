export interface Dictionary {
  nav: {
    dashboard: string
    map: string
    reports: string
    reportNew: string
    settings: string
  }
  dashboard: {
    title: string
    subtitle: string
    totalCrops: string
    activeAlerts: string
    regionsWatch: string
    overallRisk: string
    topDistricts: string
    outbreakTrend: string
    district: string
    riskLevel: string
    activeReports: string
    weeklyActivity: string
    geoTitle: string
    pestRisk: string
    pestRiskSub: string
    allStates: string
    yourSelection: string
    temp: string
    tempCool: string
    tempWarm: string
    tempHot: string
    tempExtreme: string
    days7: string
    days30: string
    daysAll: string
    riskFactors: string
    source: string
  }
  map: {
    title: string
    subtitle: string
    selectDistrict: string
    allDistricts: string
    legend: string
    highSeverity: string
    mediumSeverity: string
    lowSeverity: string
    healthy: string
    recentReports: string
    riskScore: string
    activeReportsLabel: string
  }
  upload: {
    title: string
    subtitle: string
    dragDrop: string
    analyzing: string
    confidence: string
    submit: string
    discard: string
    cropGuess: string
    recommendedAction: string
    pestDetected: string
    noPestDetected: string
  }
  reports: {
    title: string
    subtitle: string
    date: string
    crop: string
    pest: string
    severity: string
    status: string
    district: string
    allSeverities: string
    allDistricts: string
    noReports: string
  }
  settings: {
    title: string
    subtitle: string
    language: string
    languageDescription: string
    theme: string
  }
  common: {
    loading: string
    error: string
    success: string
    critical: string
    high: string
    medium: string
    low: string
    unverified: string
    verified: string
    pending: string
    increase: string
    decrease: string
    reports: string
  }
  landing: {
    pestIntelligence: string
    heroDesc: string
    scroll: string
    whyTitle: string
    whyDesc: string
    featureAiTitle: string
    featureAiDesc: string
    featureMapTitle: string
    featureMapDesc: string
    featureLangTitle: string
    featureLangDesc: string
    featureAlertTitle: string
    featureAlertDesc: string
    howTitle: string
    step1Title: string
    step1Desc: string
    step2Title: string
    step2Desc: string
    step3Title: string
    step3Desc: string
    step4Title: string
    step4Desc: string
    ctaTitle: string
    ctaDesc: string
    ctaButton: string
    footerTagline: string
    dashboard: string
    getStarted: string
    signIn: string
  }
  auth: {
    signInTitle: string
    signInSubtitle: string
    email: string
    password: string
    signingIn: string
    signIn: string
    forgotPassword: string
    register: string
    or: string
    signInWithGoogle: string
    signUpWithGoogle: string
    createAccount: string
    registering: string
    registerTitle: string
    registerSubtitle: string
    confirmPassword: string
    repeatPassword: string
    atLeast6Chars: string
    alreadyHaveAccount: string
    resetPasswordTitle: string
    resetPasswordDesc: string
    sendResetLink: string
    sending: string
    backToSignIn: string
    checkEmail: string
    setNewPassword: string
    setNewPasswordDesc: string
    newPassword: string
    updatePassword: string
    updating: string
    verifyingResetLink: string
    passwordUpdated: string
    strengthWeak: string
    strengthFair: string
    strengthGood: string
    strengthStrong: string
    strengthVeryStrong: string
  }
  onboarding: {
    next: string
    done: string
    welcomeTitle: string
    welcomeBody: string
    stepLabel: string
    step1Title: string
    step1Body: string
    step1Tip: string
    step2Title: string
    step2Body: string
    step2Tip: string
    step3Title: string
    step3Body: string
    step3Tip: string
    step4Title: string
    step4Body: string
    step4Tip: string
    step5Title: string
    step5Body: string
    step5Tip: string
    finalTitle: string
    finalBody: string
  }
  errors: {
    notFoundTitle: string
    notFoundBody: string
    goToDashboard: string
    somethingWentWrong: string
    unexpectedError: string
    tryAgain: string
  }
  ui: {
    searchDistrict: string
    allDistricts: string
    noDistrictsFound: string
    unsupportedFile: string
    loadingMap: string
    back: string
    continue: string
    done: string
    confirm: string
    cancel: string
    installTitle: string
    installDesc: string
    install: string
    loading: string
    availableProducts: string
    nearbyStores: string
    pricesMayVary: string
  }
  chat: {
    placeholder: string
    nonFarmingWarning: string
    farmingAI: string
    send: string
  }
}

export const dictionary: Record<string, Dictionary> = {
  en: {
    nav: {
      dashboard: 'Dashboard',
      map: 'Map View',
      reports: 'Reports',
      reportNew: 'New Report',
      settings: 'Settings',
    },
    dashboard: {
      title: 'Monitoring Dashboard',
      subtitle: 'Real-time agricultural pest monitoring overview',
      totalCrops: 'Total Crops',
      activeAlerts: 'Active Alerts',
      regionsWatch: 'Regions',
      overallRisk: 'Overall Risk',
      topDistricts: 'Top Districts by Risk',
      outbreakTrend: 'Outbreak Trend',
      district: 'District',
      riskLevel: 'Risk Level',
      activeReports: 'Active Reports',
      weeklyActivity: 'Weekly report activity',
      geoTitle: 'Geospatial Overview',
      pestRisk: 'Pest Risk Forecast',
      pestRiskSub: '3-day forecast \u00b7 temp + season + reports',
      allStates: 'All states',
      yourSelection: 'your selection',
      temp: 'Temp',
      tempCool: '\u2264 27\u00b0',
      tempWarm: '28\u201332\u00b0',
      tempHot: '33\u201337\u00b0',
      tempExtreme: '\u2265 38\u00b0',
      days7: '7 days',
      days30: '30 days',
      daysAll: 'All',
      riskFactors: 'Risk Factors',
      source: 'Source',
    },
    map: {
      title: 'Geospatial Monitoring',
      subtitle: 'Outbreak heatmap across monitored districts',
      selectDistrict: 'Select District',
      allDistricts: 'All Districts',
      legend: 'Legend',
      highSeverity: 'High Severity',
      mediumSeverity: 'Medium Severity',
      lowSeverity: 'Low Severity',
      healthy: 'Healthy',
      recentReports: 'Recent Reports',
      riskScore: 'Risk Score',
      activeReportsLabel: 'Active Reports',
    },
    upload: {
      title: 'Submit Pest Report',
      subtitle: 'Upload a crop image for AI-powered pest detection',
      dragDrop: 'Drag & drop an image here, or click to select',
      analyzing: 'Analyzing image with AI...',
      confidence: 'AI Confidence',
      submit: 'Submit Report',
      discard: 'Discard',
      cropGuess: 'Crop',
      recommendedAction: 'Recommended Action',
      pestDetected: 'Pest Detected',
      noPestDetected: 'No Pest Detected',
    },
    reports: {
      title: 'Pest Reports',
      subtitle: 'Browse and filter pest outbreak reports',
      date: 'Date',
      crop: 'Crop',
      pest: 'Pest',
      severity: 'Severity',
      status: 'Status',
      district: 'District',
      allSeverities: 'All Severities',
      allDistricts: 'All Districts',
      noReports: 'No reports found',
    },
    settings: {
      title: 'Settings',
      subtitle: 'Configure your application preferences',
      language: 'Language',
      languageDescription: 'Choose your preferred language for the interface',
      theme: 'Theme',
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Operation successful',
      critical: 'Critical',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      unverified: 'Unverified',
      verified: 'Verified',
      pending: 'Pending',
      increase: 'increase',
      decrease: 'decrease',
      reports: 'reports',
    },
    landing: {
      pestIntelligence: 'Pest Intelligence System',
      heroDesc: 'AI-powered early warning for crop pests and diseases. Protect your harvest with real-time detection, live outbreak maps, and instant alerts.',
      scroll: 'Scroll',
      whyTitle: 'Why Apentomos?',
      whyDesc: 'Built for Indian agriculture. From AI-powered diagnostics to community-driven outbreak tracking.',
      featureAiTitle: 'AI Crop Detection',
      featureAiDesc: 'Snap a photo of an affected crop. Our AI identifies pests and diseases instantly with Gemini-powered analysis.',
      featureMapTitle: 'Live Outbreak Map',
      featureMapDesc: 'Track pest outbreaks in real time across India. Colour-coded markers show severity at a glance.',
      featureLangTitle: 'Multi-Language',
      featureLangDesc: 'Available in English, Hindi, Marathi, Telugu, and Kannada. Built for Indian farmers.',
      featureAlertTitle: 'Early Alerts',
      featureAlertDesc: 'Get notified when pests threaten your region. Email and SMS alerts when outbreaks are detected near you.',
      howTitle: 'How It Works',
      step1Title: 'Upload a Photo',
      step1Desc: 'Take a picture of the affected crop using your phone.',
      step2Title: 'AI Analysis',
      step2Desc: 'Gemini AI identifies the pest, disease, and severity instantly.',
      step3Title: 'View on Map',
      step3Desc: 'The report appears on the live map so others in your area stay informed.',
      step4Title: 'Get Alerts',
      step4Desc: 'Receive notifications when outbreaks are detected near your district.',
      ctaTitle: 'Ready to protect your crops?',
      ctaDesc: 'Join farmers and agricultural officers using Apentomos to detect and respond to pest outbreaks.',
      ctaButton: 'Get Started Free',
      footerTagline: 'Pest Intelligence System',
      dashboard: 'Dashboard',
      getStarted: 'Get Started',
      signIn: 'Sign In',
    },
    auth: {
      signInTitle: 'Sign In',
      signInSubtitle: 'Access your Apentomos dashboard',
      email: 'Email',
      password: 'Password',
      signingIn: 'Signing in...',
      signIn: 'Sign In',
      forgotPassword: 'Forgot password?',
      register: 'Register',
      or: 'or',
      signInWithGoogle: 'Sign in with Google',
      signUpWithGoogle: 'Sign up with Google',
      createAccount: 'Create Account',
      registering: 'Registering...',
      registerTitle: 'Register',
      registerSubtitle: 'Create your Apentomos account',
      confirmPassword: 'Confirm Password',
      repeatPassword: 'Repeat password',
      atLeast6Chars: 'At least 6 characters',
      alreadyHaveAccount: 'Already have an account?',
      resetPasswordTitle: 'Reset Password',
      resetPasswordDesc: 'Enter your email to receive a reset link',
      sendResetLink: 'Send Reset Link',
      sending: 'Sending...',
      backToSignIn: 'Back to Sign In',
      checkEmail: 'Check your email for a password reset link.',
      setNewPassword: 'Set New Password',
      setNewPasswordDesc: 'Choose a new password for your account',
      newPassword: 'New Password',
      updatePassword: 'Update Password',
      updating: 'Updating...',
      verifyingResetLink: 'Verifying reset link...',
      passwordUpdated: 'Password updated successfully!',
      strengthWeak: 'Weak',
      strengthFair: 'Fair',
      strengthGood: 'Good',
      strengthStrong: 'Strong',
      strengthVeryStrong: 'Very Strong',
    },
    onboarding: {
      next: 'Next',
      done: 'Done',
      welcomeTitle: 'Welcome to Apentomos',
      welcomeBody: 'Your AI-powered pest intelligence system. This short guide will walk you through the key features so you can start protecting your crops right away.',
      stepLabel: 'Step',
      step1Title: 'Your Dashboard',
      step1Body: 'The dashboard gives you a snapshot of current pest activity. You will see key metrics — active alerts, regions under watch, and overall risk — plus a live map and top affected districts.',
      step1Tip: 'Tip: The risk score updates automatically as new reports come in.',
      step2Title: 'Upload & Detect',
      step2Body: 'Snap a photo of an affected crop and upload it. Apentomos uses Gemini AI to identify the pest or disease, estimate severity, and suggest the affected crop — all in seconds.',
      step2Tip: 'Tip: Good lighting and a clear close-up of the affected area gives the best results.',
      step3Title: 'Explore the Map',
      step3Body: 'The outbreak map shows all reported pest incidents across India. Each marker is colour-coded by severity.',
      step3Tip: 'Tip: Use the district filter to zoom in on your area.',
      step4Title: 'Browse Reports',
      step4Body: 'The reports page lists every pest report with filters for severity, status, district, and date. Expand any row to see the full diagnosis.',
      step4Tip: 'Tip: Toggle "My Reports" to see only reports you have submitted.',
      step5Title: 'Alerts & Settings',
      step5Body: 'Configure SMS and email alerts so you never miss an outbreak in your region. You can also switch between 5 supported languages.',
      step5Tip: 'Tip: Enable Critical Only mode to receive alerts only for high-severity outbreaks.',
      finalTitle: 'You are all set',
      finalBody: 'You are ready to start using Apentomos. Begin by exploring your dashboard or upload your first crop photo for AI analysis.',
    },
    errors: {
      notFoundTitle: 'Page not found',
      notFoundBody: "The page you're looking for doesn't exist.",
      goToDashboard: 'Go to Dashboard',
      somethingWentWrong: 'Something went wrong',
      unexpectedError: 'An unexpected error occurred. Please try again.',
      tryAgain: 'Try again',
    },
    ui: {
      searchDistrict: 'Search district...',
      allDistricts: 'All Districts',
      noDistrictsFound: 'No districts found',
      unsupportedFile: 'Only image files are supported',
      loadingMap: 'Loading map...',
      back: 'Back',
      continue: 'Continue',
      done: 'Done',
      confirm: 'Confirm',
      cancel: 'Cancel',
      installTitle: 'Install Apentomos',
      installDesc: 'Get faster access & offline support',
      install: 'Install',
      loading: 'Loading...',
      availableProducts: 'Available Products',
      nearbyStores: 'Nearby stores in',
      pricesMayVary: 'Prices may vary by store location',
    },
    chat: {
      placeholder: 'Ask about crops, pests...',
      nonFarmingWarning: 'Only farming & agriculture questions are supported.',
      farmingAI: 'Farming AI',
      send: 'Send',
    },
  },
  hi: {
    nav: {
      dashboard: 'डैशबोर्ड',
      map: 'नक्शा',
      reports: 'रिपोर्ट्स',
      reportNew: 'नई रिपोर्ट',
      settings: 'सेटिंग्स',
    },
    dashboard: {
      title: 'निगरानी डैशबोर्ड',
      subtitle: 'वास्तविक समय कृषि कीट निगरानी अवलोकन',
      totalCrops: 'कुल फसलें',
      activeAlerts: 'सक्रिय अलर्ट',
      regionsWatch: 'क्षेत्र',
      overallRisk: 'समग्र जोखिम',
      topDistricts: 'जोखिम के अनुसार शीर्ष जिले',
      outbreakTrend: 'प्रकोप प्रवृत्ति',
      district: 'जिला',
      riskLevel: 'जोखिम स्तर',
      activeReports: 'सक्रिय रिपोर्ट्स',
      weeklyActivity: 'साप्ताहिक रिपोर्ट गतिविधि',
      geoTitle: 'भू-स्थानिक अवलोकन',
      pestRisk: 'कीट जोखिम पूर्वानुमान',
      pestRiskSub: '3 दिन का पूर्वानुमान · तापमान + मौसम + रिपोर्ट',
      allStates: 'सभी राज्य',
      yourSelection: 'आपका चयन',
      temp: 'तापमान',
      tempCool: '≤ 27°',
      tempWarm: '28–32°',
      tempHot: '33–37°',
      tempExtreme: '≥ 38°',
      days7: '7 दिन',
      days30: '30 दिन',
      daysAll: 'सभी',
      riskFactors: 'जोखिम कारक',
      source: 'स्रोत',
    },
    map: {
      title: 'भू-स्थानिक निगरानी',
      subtitle: 'निगरानी जिलों में प्रकोप हीटमैप',
      selectDistrict: 'जिला चुनें',
      allDistricts: 'सभी जिले',
      legend: 'किंवदंती',
      highSeverity: 'उच्च गंभीरता',
      mediumSeverity: 'मध्यम गंभीरता',
      lowSeverity: 'निम्न गंभीरता',
      healthy: 'स्वस्थ',
      recentReports: 'हाल की रिपोर्ट्स',
      riskScore: 'जोखिम स्कोर',
      activeReportsLabel: 'सक्रिय रिपोर्ट्स',
    },
    upload: {
      title: 'कीट रिपोर्ट जमा करें',
      subtitle: 'AI-संचालित कीट पहचान के लिए फसल की छवि अपलोड करें',
      dragDrop: 'छवि यहाँ खींचें और छोड़ें, या चुनने के लिए क्लिक करें',
      analyzing: 'AI के साथ छवि का विश्लेषण...',
      confidence: 'AI आत्मविश्वास',
      submit: 'रिपोर्ट जमा करें',
      discard: 'रद्द करें',
      cropGuess: 'फसल',
      recommendedAction: 'अनुशंसित कार्रवाई',
      pestDetected: 'कीट का पता चला',
      noPestDetected: 'कोई कीट नहीं मिला',
    },
    reports: {
      title: 'कीट रिपोर्ट्स',
      subtitle: 'कीट प्रकोप रिपोर्ट ब्राउज़ और फ़िल्टर करें',
      date: 'तारीख',
      crop: 'फसल',
      pest: 'कीट',
      severity: 'गंभीरता',
      status: 'स्थिति',
      district: 'जिला',
      allSeverities: 'सभी गंभीरताएं',
      allDistricts: 'सभी जिले',
      noReports: 'कोई रिपोर्ट नहीं मिली',
    },
    settings: {
      title: 'सेटिंग्स',
      subtitle: 'अपनी एप्लिकेशन प्राथमिकताएं कॉन्फ़िगर करें',
      language: 'भाषा',
      languageDescription: 'इंटरफ़ेस के लिए अपनी पसंदीदा भाषा चुनें',
      theme: 'थीम',
    },
    common: {
      loading: 'लोड हो रहा है...',
      error: 'एक त्रुटि हुई',
      success: 'ऑपरेशन सफल रहा',
      critical: 'अति गंभीर',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'निम्न',
      unverified: 'असत्यापित',
      verified: 'सत्यापित',
      pending: 'लंबित',
      increase: 'वृद्धि',
      decrease: 'कमी',
      reports: 'रिपोर्ट',
    },
    landing: {
      pestIntelligence: 'कीट पूर्वानुमान प्रणाली',
      heroDesc: 'AI की मदद से फसलों के कीड़ों और बीमारियों का पहले ही पता लगाएं। रियल-टाइम जानकारी, लाइव नक्शा और तुरंत सूचनाओं से अपनी फसल बचाएं।',
      scroll: 'नीचे जाएं',
      whyTitle: 'क्यों है Apentomos खास?',
      whyDesc: 'भारतीय खेती के लिए बना। AI से बीमारी पहचान से लेकर समुदाय के साथ मिलकर प्रकोप पर नज़र रखना।',
      featureAiTitle: 'AI से फसल पहचान',
      featureAiDesc: 'बीमार फसल की फोटो खींचें। हमारा AI Gemini की मदद से झटपट कीड़े और बीमारी पहचान लेता है।',
      featureMapTitle: 'लाइव प्रकोप नक्शा',
      featureMapDesc: 'पूरे भारत में कीटों के प्रकोप को रियल-टाइम में देखें। रंग-बिरंगे निशान बताते हैं कि हालात कितने गंभीर हैं।',
      featureLangTitle: 'कई भाषाएं',
      featureLangDesc: 'हिंदी, मराठी, तेलुगु, कन्नड़ और अंग्रेज़ी में उपलब्ध। भारतीय किसानों के लिए बना।',
      featureAlertTitle: 'पहले से सूचना',
      featureAlertDesc: 'जब आपके इलाके में कीटों का खतरा हो तो तुरंत सूचना पाएं। ईमेल और SMS से चेतावनी जब आपके नज़दीक प्रकोप दिखे।',
      howTitle: 'यह कैसे काम करता है',
      step1Title: 'फोटो अपलोड करें',
      step1Desc: 'अपने फ़ोन से प्रभावित फसल की तस्वीर लें।',
      step2Title: 'AI विश्लेषण',
      step2Desc: 'Gemini AI तुरंत कीट, बीमारी और गंभीरता की पहचान करता है।',
      step3Title: 'नक्शे पर देखें',
      step3Desc: 'रिपोर्ट लाइव नक्शे पर दिख जाती है ताकि आपके इलाके के दूसरे लोग भी जान सकें।',
      step4Title: 'सूचना पाएं',
      step4Desc: 'जब आपके जिले में प्रकोप दिखे तो सूचना मिल जाए।',
      ctaTitle: 'अपनी फसल बचाने के लिए तैयार हैं?',
      ctaDesc: 'दूसरे किसानों और कृषि अधिकारियों के साथ जुड़ें जो Apentomos से कीटों का पता लगाकर तुरंत कार्रवाई कर रहे हैं।',
      ctaButton: 'मुफ्त शुरू करें',
      footerTagline: 'कीट पूर्वानुमान प्रणाली',
      dashboard: 'डैशबोर्ड',
      getStarted: 'शुरू करें',
      signIn: 'साइन इन',
    },
    auth: {
      signInTitle: 'साइन इन',
      signInSubtitle: 'अपने Apentomos डैशबोर्ड में जाएं',
      email: 'ईमेल',
      password: 'पासवर्ड',
      signingIn: 'साइन इन हो रहा है...',
      signIn: 'साइन इन',
      forgotPassword: 'पासवर्ड भूल गए?',
      register: 'रजिस्टर',
      or: 'या',
      signInWithGoogle: 'Google से साइन इन करें',
      signUpWithGoogle: 'Google से रजिस्टर करें',
      createAccount: 'खाता बनाएं',
      registering: 'रजिस्टर हो रहा है...',
      registerTitle: 'रजिस्टर',
      registerSubtitle: 'अपना Apentomos खाता बनाएं',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      repeatPassword: 'पासवर्ड दोबारा डालें',
      atLeast6Chars: 'कम से कम 6 अक्षर',
      alreadyHaveAccount: 'पहले से खाता है?',
      resetPasswordTitle: 'पासवर्ड रीसेट करें',
      resetPasswordDesc: 'रीसेट लिंक पाने के लिए अपना ईमेल डालें',
      sendResetLink: 'रीसेट लिंक भेजें',
      sending: 'भेज रहा है...',
      backToSignIn: 'साइन इन पर वापस जाएं',
      checkEmail: 'पासवर्ड रीसेट लिंक के लिए अपना ईमेल देखें।',
      setNewPassword: 'नया पासवर्ड सेट करें',
      setNewPasswordDesc: 'अपने खाते के लिए नया पासवर्ड चुनें',
      newPassword: 'नया पासवर्ड',
      updatePassword: 'पासवर्ड अपडेट करें',
      updating: 'अपडेट हो रहा है...',
      verifyingResetLink: 'रीसेट लिंक की जांच हो रही है...',
      passwordUpdated: 'पासवर्ड सफलतापूर्वक अपडेट हो गया!',
      strengthWeak: 'कमज़ोर',
      strengthFair: 'ठीक',
      strengthGood: 'अच्छा',
      strengthStrong: 'मज़बूत',
      strengthVeryStrong: 'बहुत मज़बूत',
    },
    onboarding: {
      next: 'आगे',
      done: 'हो गया',
      welcomeTitle: 'Apentomos में आपका स्वागत है',
      welcomeBody: 'आपका AI-पावर्ड कीट इंटेलिजेंस सिस्टम। यह छोटी गाइड आपको सारी खास सुविधाओं से करवाएगी ताकि आप तुरंत अपनी फसलों की रक्षा करना शुरू कर सकें।',
      stepLabel: 'चरण',
      step1Title: 'आपका डैशबोर्ड',
      step1Body: 'डैशबोर्ड पर आपको कीट गतिविधि का तुरंत अंदाज़ा मिल जाता है। यहाँ सक्रिय अलर्ट, निगरानी वाले क्षेत्र, और समग्र जोखिम दिखता है — साथ ही लाइव नक्शा और सबसे ज़्यादा प्रभावित जिले भी।',
      step1Tip: 'सुझाव: नई रिपोर्ट आने पर जोखिम स्कोर अपने आप अपडेट हो जाता है।',
      step2Title: 'फोटो अपलोड करें और पहचानें',
      step2Body: 'प्रभावित फसल की फोटो लेकर अपलोड करें। Apentomos Gemini AI से सेकंडों में कीट या बीमारी की पहचान करता है, गंभीरता बताता है और प्रभावित फसल का अनुमान लगाता है।',
      step2Tip: 'सुझाव: अच्छी रोशनी और प्रभावित हिस्से का साफ क्लोज़-अप सबसे अच्छा नतीजा देता है।',
      step3Title: 'नक्शा देखें',
      step3Body: 'प्रकोप नक्शे पर पूरे भारत में रिपोर्ट की गई कीट घटनाएं दिखती हैं। हर निशान गंभीरता के अनुसार रंग-कोडित है।',
      step3Tip: 'सुझाव: अपने इलाके में ज़ूम करने के लिए जिला फ़िल्टर का उपयोग करें।',
      step4Title: 'रिपोर्ट देखें',
      step4Body: 'रिपोर्ट पेज पर हर कीट रिपोर्ट लिस्ट में दिखती है। गंभीरता, स्थिति, जिला और तारीख के हिसाब से छांट सकते हैं। पूरी जानकारी के लिए किसी भी रो को खोलें।',
      step4Tip: 'सुझाव: "मेरी रिपोर्ट" पर क्लिक करके सिर्फ अपनी सबमिट की गई रिपोर्ट देखें।',
      step5Title: 'अलर्ट और सेटिंग्स',
      step5Body: 'SMS और ईमेल अलर्ट सेट करें ताकि आपके इलाके में प्रकोप की कोई खबर न छूटे। पांच भाषाओं के बीच स्विच भी कर सकते हैं।',
      step5Tip: 'सुझाव: "सिर्फ गंभीर" मोड चालू करें ताकि सिर्फ उच्च गंभीरता वाले प्रकोपों की सूचना मिले।',
      finalTitle: 'आप तैयार हैं',
      finalBody: 'आप Apentomos का इस्तेमाल शुरू करने के लिए तैयार हैं। पहले डैशबोर्ड देखें या AI जांच के लिए अपनी पहली फसल फोटो अपलोड करें।',
    },
    errors: {
      notFoundTitle: 'पेज नहीं मिला',
      notFoundBody: 'जिस पेज को आप ढूंढ रहे हैं, वह मौजूद नहीं है।',
      goToDashboard: 'डैशबोर्ड पर जाएं',
      somethingWentWrong: 'कुछ गड़बड़ हो गई',
      unexpectedError: 'एक अनपेक्षित त्रुटि हुई। कृपया फिर से कोशिश करें।',
      tryAgain: 'फिर से कोशिश करें',
    },
    ui: {
      searchDistrict: 'जिला खोजें...',
      allDistricts: 'सभी जिले',
      noDistrictsFound: 'कोई जिला नहीं मिला',
      unsupportedFile: 'सिर्फ इमेज फ़ाइलें स्वीकार हैं',
      loadingMap: 'नक्शा लोड हो रहा है...',
      back: 'पीछे',
      continue: 'जारी रखें',
      done: 'हो गया',
      confirm: 'पुष्टि करें',
      cancel: 'रद्द करें',
      installTitle: 'Apentomos इंस्टॉल करें',
      installDesc: 'तेज़ पहुंच और ऑफलाइन समर्थन',
      install: 'इंस्टॉल करें',
      loading: 'लोड हो रहा है...',
      availableProducts: 'उपलब्ध उत्पाद',
      nearbyStores: 'आस-पास की दुकानें',
      pricesMayVary: 'दुकान के अनुसार कीमतें भिन्न हो सकती हैं',
    },
    chat: {
      placeholder: 'फसल, कीट के बारे में पूछें...',
      nonFarmingWarning: 'केवल खेती और कृषि संबंधी प्रश्नों का समर्थन किया जाता है।',
      farmingAI: 'कृषि AI',
      send: 'भेजें',
    },
  },
  mr: {
    nav: {
      dashboard: 'डॅशबोर्ड',
      map: 'नकाशा',
      reports: 'अहवाल',
      reportNew: 'नवीन अहवाल',
      settings: 'सेटिंग्ज',
    },
    dashboard: {
      title: 'निरीक्षण डॅशबोर्ड',
      subtitle: 'रिअल-टाइम कृषी कीड निरीक्षण विहंगावलोकन',
      totalCrops: 'एकूण पिके',
      activeAlerts: 'सक्रिय सूचना',
      regionsWatch: 'प्रदेश',
      overallRisk: 'एकूण धोका',
      topDistricts: 'धोक्यानुसार अव्वल जिल्हे',
      outbreakTrend: 'प्रादुर्भाव कल',
      district: 'जिल्हा',
      riskLevel: 'धोका पातळी',
      activeReports: 'सक्रिय अहवाल',
      weeklyActivity: 'साप्ताहिक अहवाल क्रियाकलाप',
      geoTitle: 'भौगोलिक विहंगावलोकन',
      pestRisk: 'कीड जोखीम अंदाज',
      pestRiskSub: '3 दिवसांचा अंदाज · तापमान + हंगाम + अहवाल',
      allStates: 'सर्व राज्य',
      yourSelection: 'तुमची निवड',
      temp: 'तापमान',
      tempCool: '≤ 27°',
      tempWarm: '28–32°',
      tempHot: '33–37°',
      tempExtreme: '≥ 38°',
      days7: '7 दिवस',
      days30: '30 दिवस',
      daysAll: 'सर्व',
      riskFactors: 'जोखीम घटक',
      source: 'स्त्रोत',
    },
    map: {
      title: 'भौगोलिक निरीक्षण',
      subtitle: 'निरीक्षण जिल्ह्यांमध्ये प्रादुर्भाव उष्मा नकाशा',
      selectDistrict: 'जिल्हा निवडा',
      allDistricts: 'सर्व जिल्हे',
      legend: 'दंतकथा',
      highSeverity: 'उच्च तीव्रता',
      mediumSeverity: 'मध्यम तीव्रता',
      lowSeverity: 'कमी तीव्रता',
      healthy: 'निरोगी',
      recentReports: 'अलीकडील अहवाल',
      riskScore: 'धोका गुण',
      activeReportsLabel: 'सक्रिय अहवाल',
    },
    upload: {
      title: 'कीड अहवाल सादर करा',
      subtitle: 'AI-समर्थित कीड ओळखीसाठी पिकाची प्रतिमा अपलोड करा',
      dragDrop: 'प्रतिमा येथे ड्रॅग आणि ड्रॉप करा किंवा निवडण्यासाठी क्लिक करा',
      analyzing: 'AI सह प्रतिमेचे विश्लेषण करीत आहे...',
      confidence: 'AI आत्मविश्वास',
      submit: 'अहवाल सादर करा',
      discard: 'रद्द करा',
      cropGuess: 'पीक',
      recommendedAction: 'शिफारस केलेली कारवाई',
      pestDetected: 'कीड आढळली',
      noPestDetected: 'कीड आढळली नाही',
    },
    reports: {
      title: 'कीड अहवाल',
      subtitle: 'कीड प्रादुर्भाव अहवाल ब्राउझ आणि फिल्टर करा',
      date: 'तारीख',
      crop: 'पीक',
      pest: 'कीड',
      severity: 'तीव्रता',
      status: 'स्थिती',
      district: 'जिल्हा',
      allSeverities: 'सर्व तीव्रता',
      allDistricts: 'सर्व जिल्हे',
      noReports: 'कोणतेही अहवाल आढळले नाहीत',
    },
    settings: {
      title: 'सेटिंग्ज',
      subtitle: 'तुमची अनुप्रयोग प्राधान्ये कॉन्फिगर करा',
      language: 'भाषा',
      languageDescription: 'इंटरफेससाठी तुमची पसंतीची भाषा निवडा',
      theme: 'थीम',
    },
    common: {
      loading: 'लोड होत आहे...',
      error: 'एक त्रुटी आली',
      success: 'ऑपरेशन यशस्वी',
      critical: 'गंभीर',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कमी',
      unverified: 'असत्यापित',
      verified: 'सत्यापित',
      pending: 'प्रलंबित',
      increase: 'वाढ',
      decrease: 'घट',
      reports: 'अहवाल',
    },
    landing: {
      pestIntelligence: 'कीड बुद्धिमत्ता प्रणाली',
      heroDesc: 'AI च्या साहाय्याने पिकांवरील कीड व रोगांची अगोदर सूचना. रिअल-टाइम शोध, लाइव प्रादुर्भाव नकाशा आणि झटपट सूचनांद्वारे आपले पीक वाचवा.',
      scroll: 'खाली सरकवा',
      whyTitle: 'Apentomos का खास आहे?',
      whyDesc: 'भारतीय शेतीसाठी बनवलं. AI च्या साहाय्याने रोगनिदानापासून समुदायाच्या सहभागाने प्रादुर्भाव ट्रॅकिंगपर्यंत.',
      featureAiTitle: 'AI पीक शोध',
      featureAiDesc: 'बाधित पिकाचा फोटो काढा. आमचं AI Gemini च्या साहाय्याने झटपट कीड आणि रोग ओळखतं.',
      featureMapTitle: 'लाइव प्रादुर्भाव नकाशा',
      featureMapDesc: 'संपूर्ण भारतभर कीड प्रादुर्भाव रिअल-टाइम ट्रॅक करा. रंग कोड केलेले निशाण तीव्रता दाखवतात.',
      featureLangTitle: 'अनेक भाषा',
      featureLangDesc: 'इंग्रजी, हिंदी, मराठी, तेलुगू आणि कन्नड मध्ये उपलब्ध. भारतीय शेतकऱ्यांसाठी बनवलं.',
      featureAlertTitle: 'अगोदर सूचना',
      featureAlertDesc: 'जेव्हा तुमच्या भागात कीड धोका निर्माण होईल तेव्हा सूचना मिळवा. तुमच्या जवळ प्रादुर्भाव आढळल्यास ईमेल आणि SMS अलर्ट.',
      howTitle: 'हे कसं काम करतं',
      step1Title: 'फोटो अपलोड करा',
      step1Desc: 'तुमच्या फोनने बाधित पिकाचा फोटो काढा.',
      step2Title: 'AI विश्लेषण',
      step2Desc: 'Gemini AI त्वरित कीड, रोग आणि तीव्रता ओळखतो.',
      step3Title: 'नकाशावर पहा',
      step3Desc: 'अहवाल लाइव नकाशावर दिसतो जेणेकरून तुमच्या भागातील इतरांनाही माहिती मिळते.',
      step4Title: 'सूचना मिळवा',
      step4Desc: 'तुमच्या जिल्ह्यात प्रादुर्भाव आढळल्यास सूचना मिळवा.',
      ctaTitle: 'तुमची पिकं वाचवायला तयार आहात?',
      ctaDesc: 'इतर शेतकरी आणि कृषी अधिकाऱ्यांसोबत जोडले जा जे Apentomos वापरून कीड प्रादुर्भाव शोधून कारवाई करत आहेत.',
      ctaButton: 'मोफत सुरू करा',
      footerTagline: 'कीड बुद्धिमत्ता प्रणाली',
      dashboard: 'डॅशबोर्ड',
      getStarted: 'सुरू करा',
      signIn: 'साइन इन',
    },
    auth: {
      signInTitle: 'साइन इन',
      signInSubtitle: 'तुमच्या Apentomos डॅशबोर्डमध्ये प्रवेश करा',
      email: 'ईमेल',
      password: 'पासवर्ड',
      signingIn: 'साइन इन होत आहे...',
      signIn: 'साइन इन',
      forgotPassword: 'पासवर्ड विसरलात?',
      register: 'नोंदणी',
      or: 'किंवा',
      signInWithGoogle: 'Google सह साइन इन',
      signUpWithGoogle: 'Google सह नोंदणी',
      createAccount: 'खाते तयार करा',
      registering: 'नोंदणी होत आहे...',
      registerTitle: 'नोंदणी',
      registerSubtitle: 'तुमचे Apentomos खाते तयार करा',
      confirmPassword: 'पासवर्डची पुष्टी करा',
      repeatPassword: 'पासवर्ड पुन्हा टाका',
      atLeast6Chars: 'किमान 6 अक्षरे',
      alreadyHaveAccount: 'आधीपासून खाते आहे?',
      resetPasswordTitle: 'पासवर्ड रीसेट करा',
      resetPasswordDesc: 'रीसेट लिंक मिळवण्यासाठी तुमचा ईमेल टाका',
      sendResetLink: 'रीसेट लिंक पाठवा',
      sending: 'पाठवत आहे...',
      backToSignIn: 'साइन इनकडे परत',
      checkEmail: 'पासवर्ड रीसेट लिंकसाठी तुमचा ईमेल तपासा.',
      setNewPassword: 'नवीन पासवर्ड सेट करा',
      setNewPasswordDesc: 'तुमच्या खात्यासाठी नवीन पासवर्ड निवडा',
      newPassword: 'नवीन पासवर्ड',
      updatePassword: 'पासवर्ड अपडेट करा',
      updating: 'अपडेट होत आहे...',
      verifyingResetLink: 'रीसेट लिंक तपासत आहे...',
      passwordUpdated: 'पासवर्ड यशस्वीपणे अपडेट झाला!',
      strengthWeak: 'कमकुवत',
      strengthFair: 'मध्यम',
      strengthGood: 'चांगला',
      strengthStrong: 'मजबूत',
      strengthVeryStrong: 'खूप मजबूत',
    },
    onboarding: {
      next: 'पुढे',
      done: 'झालं',
      welcomeTitle: 'Apentomos मध्ये आपले स्वागत आहे',
      welcomeBody: 'तुमची AI-समर्थित कीड बुद्धिमत्ता प्रणाली. ही छोटी मार्गदर्शिका तुम्हाला मुख्य वैशिष्ट्यांशी ओळख करून देईल जेणेकरून तुम्ही लगेचच तुमच्या पिकांचे संरक्षण सुरू करू शकाल.',
      stepLabel: 'पायरी',
      step1Title: 'तुमचा डॅशबोर्ड',
      step1Body: 'डॅशबोर्डवर तुम्हाला कीड क्रियाकलापाचा झटपट अंदाज मिळतो — सक्रिय अलर्ट, देखरेखीखालील प्रदेश आणि एकूण धोका, तसेच लाइव नकाशा आणि सर्वाधिक प्रभावित जिल्हे.',
      step1Tip: 'टीप: नवीन अहवाल येताच जोखीम गुण आपोआप अपडेट होतो.',
      step2Title: 'अपलोड आणि शोध',
      step2Body: 'बाधित पिकाचा फोटो काढून अपलोड करा. Apentomos Gemini AI वापरून सेकंदात कीड किंवा रोग ओळखतो, तीव्रता सांगतो आणि प्रभावित पिकाचा अंदाज लावतो.',
      step2Tip: 'टीप: चांगला प्रकाश आणि प्रभावित भागाचा स्पष्ट क्लोज-अप सर्वोत्तम परिणाम देतो.',
      step3Title: 'नकाशा एक्सप्लोर करा',
      step3Body: 'प्रादुर्भाव नकाशावर संपूर्ण भारतातील कीड घटना दाखवल्या जातात. प्रत्येक निशाण तीव्रतेनुसार रंग कोड केलेला आहे.',
      step3Tip: 'टीप: तुमच्या भागात झूम करण्यासाठी जिल्हा फिल्टर वापरा.',
      step4Title: 'अहवाल ब्राउझ करा',
      step4Body: 'अहवाल पेजवर सर्व कीड अहवाल तीव्रता, स्थिती, जिल्हा आणि तारीख या फिल्टरसह दिसतात. संपूर्ण निदान पाहण्यासाठी कोणतीही रो विस्तृत करा.',
      step4Tip: 'टीप: "माझे अहवाल" टॉगल करून फक्त तुमचे सादर केलेले अहवाल पहा.',
      step5Title: 'अलर्ट आणि सेटिंग्ज',
      step5Body: 'SMS आणि ईमेल अलर्ट सेट करा जेणेकरून तुमच्या भागातील प्रादुर्भाव कधीही चुकणार नाही. ५ समर्थित भाषांमध्ये स्विच करू शकता.',
      step5Tip: 'टीप: फक्त गंभीर प्रादुर्भावाच्याच सूचना मिळवण्यासाठी "फक्त गंभीर" मोड चालू करा.',
      finalTitle: 'तुम्ही तयार आहात',
      finalBody: 'तुम्ही Apentomos वापरण्यास सज्ज आहात. डॅशबोर्ड एक्सप्लोर करून सुरुवात करा किंवा AI विश्लेषणासाठी तुमचा पहिला पीक फोटो अपलोड करा.',
    },
    errors: {
      notFoundTitle: 'पेज सापडले नाही',
      notFoundBody: 'तुम्ही शोधत असलेले पेज अस्तित्वात नाही.',
      goToDashboard: 'डॅशबोर्डवर जा',
      somethingWentWrong: 'काहीतरी चूक झाली',
      unexpectedError: 'एक अनपेक्षित त्रुटी आली. कृपया पुन्हा प्रयत्न करा.',
      tryAgain: 'पुन्हा प्रयत्न करा',
    },
    ui: {
      searchDistrict: 'जिल्हा शोधा...',
      allDistricts: 'सर्व जिल्हे',
      noDistrictsFound: 'कोणताही जिल्हा आढळला नाही',
      unsupportedFile: 'फक्त इमेज फायलींना परवानगी आहे',
      loadingMap: 'नकाशा लोड होत आहे...',
      back: 'मागे',
      continue: 'पुढे',
      done: 'झालं',
      confirm: 'पुष्टी करा',
      cancel: 'रद्द करा',
      installTitle: 'Apentomos स्थापित करा',
      installDesc: 'जलद प्रवेश आणि ऑफलाइन समर्थन',
      install: 'स्थापित करा',
      loading: 'लोड होत आहे...',
      availableProducts: 'उपलब्ध उत्पादने',
      nearbyStores: 'जवळील दुकाने',
      pricesMayVary: 'दुकानानुसार किंमती बदलू शकतात',
    },
    chat: {
      placeholder: 'पीक, कीड याबद्दल विचारा...',
      nonFarmingWarning: 'केवळ शेती आणि कृषी प्रश्नांना समर्थन आहे.',
      farmingAI: 'कृषी AI',
      send: 'पाठवा',
    },
  },
  te: {
    nav: {
      dashboard: 'డాష్‌బోర్డ్',
      map: 'మ్యాప్ వీక్షణ',
      reports: 'నివేదికలు',
      reportNew: 'కొత్త నివేదిక',
      settings: 'సెట్టింగ్‌లు',
    },
    dashboard: {
      title: 'పర్యవేక్షణ డాష్‌బోర్డ్',
      subtitle: 'రియల్-టైమ్ వ్యవసాయ తెగులు పర్యవేక్షణ అవలోకనం',
      totalCrops: 'మొత్తం పంటలు',
      activeAlerts: 'చురుకైన హెచ్చరికలు',
      regionsWatch: 'ప్రాంతాలు',
      overallRisk: 'మొత్తం ప్రమాదం',
      topDistricts: 'ప్రమాదం ప్రకారం అగ్ర జిల్లాలు',
      outbreakTrend: 'వ్యాప్తి ధోరణి',
      district: 'జిల్లా',
      riskLevel: 'ప్రమాద స్థాయి',
      activeReports: 'చురుకైన నివేదికలు',
      weeklyActivity: 'వారపు నివేదిక కార్యకలాపం',
      geoTitle: 'భౌగోళిక అవలోకనం',
      pestRisk: 'పీడ ప్రమాద సూచన',
      pestRiskSub: '3-రోజుల సూచన · ఉష్ణోగ్రత + సీజన్ + నివేదికలు',
      allStates: 'అన్ని రాష్ట్రాలు',
      yourSelection: 'మీ ఎంపిక',
      temp: 'ఉష్ణోగ్రత',
      tempCool: '≤ 27°',
      tempWarm: '28–32°',
      tempHot: '33–37°',
      tempExtreme: '≥ 38°',
      days7: '7 రోజులు',
      days30: '30 రోజులు',
      daysAll: 'అన్నీ',
      riskFactors: 'ప్రమాద కారకాలు',
      source: 'మూలం',
    },
    map: {
      title: 'భూగోళ పర్యవేక్షణ',
      subtitle: 'పర్యవేక్షించబడుతున్న జిల్లాల్లో వ్యాప్తి హీట్‌మ్యాప్',
      selectDistrict: 'జిల్లా ఎంచుకోండి',
      allDistricts: 'అన్ని జిల్లాలు',
      legend: 'లెజెండ్',
      highSeverity: 'అధిక తీవ్రత',
      mediumSeverity: 'మధ్యస్థ తీవ్రత',
      lowSeverity: 'తక్కువ తీవ్రత',
      healthy: 'ఆరోగ్యకరమైన',
      recentReports: 'ఇటీవలి నివేదికలు',
      riskScore: 'ప్రమాద స్కోరు',
      activeReportsLabel: 'చురుకైన నివేదికలు',
    },
    upload: {
      title: 'తెగులు నివేదిక సమర్పించండి',
      subtitle: 'AI-శక్తితో తెగులు గుర్తింపు కోసం పంట చిత్రాన్ని అప్‌లోడ్ చేయండి',
      dragDrop: 'చిత్రాన్ని ఇక్కడ డ్రాగ్ & డ్రాప్ చేయండి లేదా ఎంచుకోవడానికి క్లిక్ చేయండి',
      analyzing: 'AI తో చిత్రాన్ని విశ్లేషిస్తోంది...',
      confidence: 'AI విశ్వాసం',
      submit: 'నివేదిక సమర్పించండి',
      discard: 'రద్దు చేయండి',
      cropGuess: 'పంట',
      recommendedAction: 'సిఫార్సు చేసిన చర్య',
      pestDetected: 'తెగులు కనుగొనబడింది',
      noPestDetected: 'తెగులు కనుగొనబడలేదు',
    },
    reports: {
      title: 'తెగులు నివేదికలు',
      subtitle: 'తెగులు వ్యాప్తి నివేదికలను బ్రౌజ్ చేయండి మరియు ఫిల్టర్ చేయండి',
      date: 'తేదీ',
      crop: 'పంట',
      pest: 'తెగులు',
      severity: 'తీవ్రత',
      status: 'స్థితి',
      district: 'జిల్లా',
      allSeverities: 'అన్ని తీవ్రతలు',
      allDistricts: 'అన్ని జిల్లాలు',
      noReports: 'నివేదికలు ఏవీ కనుగొనబడలేదు',
    },
    settings: {
      title: 'సెట్టింగ్‌లు',
      subtitle: 'మీ అప్లికేషన్ ప్రాధాన్యతలను కాన్ఫిగర్ చేయండి',
      language: 'భాష',
      languageDescription: 'ఇంటర్ఫేస్ కోసం మీకు ఇష్టమైన భాషను ఎంచుకోండి',
      theme: 'థీమ్',
    },
    common: {
      loading: 'లోడ్ అవుతోంది...',
      error: 'లోపం సంభవించింది',
      success: 'ఆపరేషన్ విజయవంతమైంది',
      critical: 'క్రిటికల్',
      high: 'అధిక',
      medium: 'మధ్యస్థ',
      low: 'తక్కువ',
      unverified: 'ధృవీకరించబడలేదు',
      verified: 'ధృవీకరించబడింది',
      pending: 'పెండింగ్',
      increase: 'పెరుగుదల',
      decrease: 'తగ్గుదల',
      reports: 'నివేదికలు',
    },
    landing: {
      pestIntelligence: 'కీటక నిఘా వ్యవస్థ',
      heroDesc: 'AI సాయంతో పంటల పురుగులు మరియు వ్యాధులకు ముందస్తు హెచ్చరిక. రియల్-టైమ్ గుర్తింపు, ప్రత్యక్ష మ్యాప్ మరియు తక్షణ అలర్ట్‌లతో మీ పంటను కాపాడుకోండి.',
      scroll: 'కిందికి జరపండి',
      whyTitle: 'Apentomos ఎందుకు ప్రత్యేకం?',
      whyDesc: 'భారతీయ వ్యవసాయం కోసం రూపొందించబడింది. AI నిర్ధారణ నుండి సమాజ భాగస్వామ్యంతో వ్యాప్తి ట్రాకింగ్ వరకు.',
      featureAiTitle: 'AI పంట గుర్తింపు',
      featureAiDesc: 'చెడిపోయిన పంట ఫోటో తీయండి. మా AI Gemini సహాయంతో వెంటనే పురుగులు మరియు వ్యాధులను గుర్తిస్తుంది.',
      featureMapTitle: 'ప్రత్యక్ష వ్యాప్తి మ్యాప్',
      featureMapDesc: 'భారతదేశం అంతటా పురుగుల వ్యాప్తిని రియల్-టైమ్‌లో ట్రాక్ చేయండి. రంగు కోడ్ చేసిన గుర్తులు తీవ్రతను చూపిస్తాయి.',
      featureLangTitle: 'బహుళ భాషలు',
      featureLangDesc: 'ఇంగ్లీష్, హిందీ, మరాఠీ, తెలుగు మరియు కన్నడలో అందుబాటులో ఉంది. భారతీయ రైతుల కోసం తయారు చేయబడింది.',
      featureAlertTitle: 'ముందస్తు అలర్ట్‌లు',
      featureAlertDesc: 'మీ ప్రాంతంలో పురుగులు ముప్పు కలిగించినప్పుడు తెలియజేయండి. మీ దగ్గర వ్యాప్తి కనుగొనబడినప్పుడు ఈమెయిల్ మరియు SMS అలర్ట్‌లు.',
      howTitle: 'ఇది ఎలా పనిచేస్తుంది',
      step1Title: 'ఫోటో అప్‌లోడ్ చేయండి',
      step1Desc: 'మీ ఫోన్‌తో చెడిపోయిన పంట ఫోటో తీయండి.',
      step2Title: 'AI విశ్లేషణ',
      step2Desc: 'Gemini AI వెంటనే పురుగు, వ్యాధి మరియు తీవ్రతను గుర్తిస్తుంది.',
      step3Title: 'మ్యాప్‌లో చూడండి',
      step3Desc: 'నివేదిక ప్రత్యక్ష మ్యాప్‌లో కనిపిస్తుంది, తద్వారా మీ ప్రాంతంలోని ఇతరులకు సమాచారం అందుతుంది.',
      step4Title: 'అలర్ట్‌లు పొందండి',
      step4Desc: 'మీ జిల్లాలో వ్యాప్తి కనుగొనబడినప్పుడు నోటిఫికేషన్‌లు అందుకోండి.',
      ctaTitle: 'మీ పంటలను కాపాడుకోవడానికి సిద్ధంగా ఉన్నారా?',
      ctaDesc: 'Apentomos ఉపయోగించి పురుగుల వ్యాప్తిని గుర్తించి స్పందించే రైతులు మరియు వ్యవసాయ అధికారులతో చేరండి.',
      ctaButton: 'ఉచితంగా ప్రారంభించండి',
      footerTagline: 'కీటక నిఘా వ్యవస్థ',
      dashboard: 'డాష్‌బోర్డ్',
      getStarted: 'ప్రారంభించండి',
      signIn: 'సైన్ ఇన్',
    },
    auth: {
      signInTitle: 'సైన్ ఇన్',
      signInSubtitle: 'మీ Apentomos డాష్‌బోర్డ్‌ను యాక్సెస్ చేయండి',
      email: 'ఈమెయిల్',
      password: 'పాస్‌వర్డ్',
      signingIn: 'సైన్ ఇన్ అవుతోంది...',
      signIn: 'సైన్ ఇన్',
      forgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
      register: 'రిజిస్టర్',
      or: 'లేదా',
      signInWithGoogle: 'Googleతో సైన్ ఇన్ చేయండి',
      signUpWithGoogle: 'Googleతో రిజిస్టర్ చేయండి',
      createAccount: 'ఖాతా సృష్టించండి',
      registering: 'రిజిస్టర్ అవుతోంది...',
      registerTitle: 'రిజిస్టర్',
      registerSubtitle: 'మీ Apentomos ఖాతాను సృష్టించండి',
      confirmPassword: 'పాస్‌వర్డ్ నిర్ధారించండి',
      repeatPassword: 'పాస్‌వర్డ్ మళ్లీ టైప్ చేయండి',
      atLeast6Chars: 'కనీసం 6 అక్షరాలు',
      alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
      resetPasswordTitle: 'పాస్‌వర్డ్ రీసెట్ చేయండి',
      resetPasswordDesc: 'రీసెట్ లింక్ పొందడానికి మీ ఈమెయిల్ నమోదు చేయండి',
      sendResetLink: 'రీసెట్ లింక్ పంపండి',
      sending: 'పంపుతోంది...',
      backToSignIn: 'సైన్ ఇన్‌కు తిరిగి వెళ్లండి',
      checkEmail: 'పాస్‌వర్డ్ రీసెట్ లింక్ కోసం మీ ఈమెయిల్ చెక్ చేయండి.',
      setNewPassword: 'కొత్త పాస్‌వర్డ్ సెట్ చేయండి',
      setNewPasswordDesc: 'మీ ఖాతా కోసం కొత్త పాస్‌వర్డ్ ఎంచుకోండి',
      newPassword: 'కొత్త పాస్‌వర్డ్',
      updatePassword: 'పాస్‌వర్డ్ అప్‌డేట్ చేయండి',
      updating: 'అప్‌డేట్ అవుతోంది...',
      verifyingResetLink: 'రీసెట్ లింక్ వెరిఫై అవుతోంది...',
      passwordUpdated: 'పాస్‌వర్డ్ విజయవంతంగా అప్‌డేట్ అయింది!',
      strengthWeak: 'బలహీనం',
      strengthFair: 'మామూలు',
      strengthGood: 'మంచిది',
      strengthStrong: 'బలమైనది',
      strengthVeryStrong: 'చాలా బలమైనది',
    },
    onboarding: {
      next: 'తర్వాత',
      done: 'పూర్తయింది',
      welcomeTitle: 'Apentomosకు స్వాగతం',
      welcomeBody: 'మీ AI-శక్తితో పనిచేసే కీటక నిఘా వ్యవస్థ. ఈ చిన్న గైడ్ మిమ్మల్ని ముఖ్యమైన ఫీచర్లతో పరిచయం చేస్తుంది, తద్వారా మీరు వెంటనే మీ పంటలను రక్షించుకోవడం ప్రారంభించవచ్చు.',
      stepLabel: 'దశ',
      step1Title: 'మీ డాష్‌బోర్డ్',
      step1Body: 'డాష్‌బోర్డ్ ప్రస్తుత పురుగుల కార్యకలాపాల స్నాప్‌షాట్ చూపిస్తుంది. యాక్టివ్ అలర్ట్‌లు, పర్యవేక్షణలో ఉన్న ప్రాంతాలు మరియు మొత్తం ప్రమాదం — లైవ్ మ్యాప్ మరియు టాప్ ప్రభావిత జిల్లాలతో సహా చూడవచ్చు.',
      step1Tip: 'చిట్కా: కొత్త నివేదికలు వచ్చినప్పుడు రిస్క్ స్కోర్ ఆటోమేటిక్‌గా అప్‌డేట్ అవుతుంది.',
      step2Title: 'అప్‌లోడ్ & డిటెక్ట్',
      step2Body: 'చెడిపోయిన పంట ఫోటో తీసి అప్‌లోడ్ చేయండి. Apentomos Gemini AI ఉపయోగించి సెకన్లలో పురుగు లేదా వ్యాధిని గుర్తించి, తీవ్రతను అంచనా వేసి, ప్రభావిత పంటను సూచిస్తుంది.',
      step2Tip: 'చిట్కా: మంచి వెలుతురు మరియు ప్రభావిత ప్రాంతం యొక్క స్పష్టమైన క్లోజ్-అప్ ఉత్తమ ఫలితాలను ఇస్తుంది.',
      step3Title: 'మ్యాప్‌ను అన్వేషించండి',
      step3Body: 'వ్యాప్తి మ్యాప్ భారతదేశం అంతటా నివేదించబడిన పురుగుల సంఘటనలను చూపిస్తుంది. ప్రతి మార్కర్ తీవ్రతను బట్టి రంగుతో గుర్తించబడింది.',
      step3Tip: 'చిట్కా: మీ ప్రాంతంలో జూమ్ చేయడానికి జిల్లా ఫిల్టర్ ఉపయోగించండి.',
      step4Title: 'నివేదికలను బ్రౌజ్ చేయండి',
      step4Body: 'నివేదికల పేజీ తీవ్రత, స్థితి, జిల్లా మరియు తేదీ ఫిల్టర్లతో ప్రతి పురుగుల నివేదికను జాబితా చేస్తుంది. పూర్తి నిర్ధారణ చూడటానికి ఏదైనా వరుసను విస్తరించండి.',
      step4Tip: 'చిట్కా: మీరు సమర్పించిన నివేదికలను మాత్రమే చూడటానికి "నా నివేదికలు" టోగుల్ చేయండి.',
      step5Title: 'అలర్ట్‌లు & సెట్టింగ్‌లు',
      step5Body: 'మీ ప్రాంతంలో వ్యాప్తి ఎప్పుడూ మిస్ కాకుండా SMS మరియు ఈమెయిల్ అలర్ట్‌లను కాన్ఫిగర్ చేయండి. మీరు 5 సపోర్టెడ్ భాషల మధ్య మారవచ్చు.',
      step5Tip: 'చిట్కా: అధిక తీవ్రత కలిగిన వ్యాప్తులకు మాత్రమే అలర్ట్‌లు పొందేందుకు "క్రిటికల్ ఓన్లీ" మోడ్ ఎనేబుల్ చేయండి.',
      finalTitle: 'మీరు సిద్ధంగా ఉన్నారు',
      finalBody: 'మీరు Apentomos ఉపయోగించడం ప్రారంభించడానికి సిద్ధంగా ఉన్నారు. మీ డాష్‌బోర్డ్‌ను అన్వేషించడం లేదా AI విశ్లేషణ కోసం మీ మొదటి పంట ఫోటోను అప్‌లోడ్ చేయడం ద్వారా ప్రారంభించండి.',
    },
    errors: {
      notFoundTitle: 'పేజీ కనుగొనబడలేదు',
      notFoundBody: 'మీరు వెతుకుతున్న పేజీ లేదు.',
      goToDashboard: 'డాష్‌బోర్డ్‌కు వెళ్లండి',
      somethingWentWrong: 'ఏదో తప్పు జరిగింది',
      unexpectedError: 'ఊహించని లోపం సంభవించింది. దయచేసి మళ్లీ ప్రయత్నించండి.',
      tryAgain: 'మళ్లీ ప్రయత్నించండి',
    },
    ui: {
      searchDistrict: 'జిల్లా శోధించండి...',
      allDistricts: 'అన్ని జిల్లాలు',
      noDistrictsFound: 'జిల్లాలు ఏవీ కనుగొనబడలేదు',
      unsupportedFile: 'చిత్ర ఫైల్‌లు మాత్రమే అనుమతించబడతాయి',
      loadingMap: 'మ్యాప్ లోడ్ అవుతోంది...',
      back: 'వెనక్కి',
      continue: 'కొనసాగించు',
      done: 'పూర్తయింది',
      confirm: 'నిర్ధారించు',
      cancel: 'రద్దు చేయి',
      installTitle: 'Apentomos ఇన్‌స్టాల్ చేయండి',
      installDesc: 'వేగవంతమైన యాక్సెస్ & ఆఫ్‌లైన్ మద్దతు',
      install: 'ఇన్‌స్టాల్ చేయండి',
      loading: 'లోడ్ అవుతోంది...',
      availableProducts: 'అందుబాటులో ఉన్న ఉత్పత్తులు',
      nearbyStores: 'సమీపంలోని దుకాణాలు',
      pricesMayVary: 'దుకాణాన్ని బట్టి ధరలు మారవచ్చు',
    },
    chat: {
      placeholder: 'పంటలు, తెగుళ్ళ గురించి అడగండి...',
      nonFarmingWarning: 'వ్యవసాయం మరియు సాగు సంబంధిత ప్రశ్నలకు మాత్రమే మద్దతు ఉంటుంది.',
      farmingAI: 'వ్యవసాయ AI',
      send: 'పంపు',
    },
  },
  kn: {
    nav: {
      dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      map: 'ನಕ್ಷೆ ನೋಟ',
      reports: 'ವರದಿಗಳು',
      reportNew: 'ಹೊಸ ವರದಿ',
      settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    },
    dashboard: {
      title: 'ಮೇಲ್ವಿಚಾರಣಾ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      subtitle: 'ನೈಜ-ಸಮಯದ ಕೃಷಿ ಕೀಟ ಮೇಲ್ವಿಚಾರಣೆ ಅವಲೋಕನ',
      totalCrops: 'ಒಟ್ಟು ಬೆಳೆಗಳು',
      activeAlerts: 'ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳು',
      regionsWatch: 'ಪ್ರದೇಶಗಳು',
      overallRisk: 'ಒಟ್ಟಾರೆ ಅಪಾಯ',
      topDistricts: 'ಅಪಾಯದಿಂದ ಅಗ್ರ ಜಿಲ್ಲೆಗಳು',
      outbreakTrend: 'ಹಾವಳಿ ಪ್ರವೃತ್ತಿ',
      district: 'ಜಿಲ್ಲೆ',
      riskLevel: 'ಅಪಾಯದ ಮಟ್ಟ',
      activeReports: 'ಸಕ್ರಿಯ ವರದಿಗಳು',
      weeklyActivity: 'ಸಾಪ್ತಾಹಿಕ ವರದಿ ಚಟುವಟಿಕೆ',
      geoTitle: 'ಭೌಗೋಳಿಕ ಅವಲೋಕನ',
      pestRisk: 'ಕೀಟ ಅಪಾಯ ಮುನ್ಸೂಚನೆ',
      pestRiskSub: '3-ದಿನಗಳ ಮುನ್ಸೂಚನೆ · ತಾಪಮಾನ + ಋತು + ವರದಿಗಳು',
      allStates: 'ಎಲ್ಲ ರಾಜ್ಯಗಳು',
      yourSelection: 'ನಿಮ್ಮ ಆಯ್ಕೆ',
      temp: 'ತಾಪಮಾನ',
      tempCool: '≤ 27°',
      tempWarm: '28–32°',
      tempHot: '33–37°',
      tempExtreme: '≥ 38°',
      days7: '7 ದಿನಗಳು',
      days30: '30 ದಿನಗಳು',
      daysAll: 'ಎಲ್ಲ',
      riskFactors: 'ಅಪಾಯದ ಅಂಶಗಳು',
      source: 'ಮೂಲ',
    },
    map: {
      title: 'ಭೌಗೋಳಿಕ ಮೇಲ್ವಿಚಾರಣೆ',
      subtitle: 'ಮೇಲ್ವಿಚಾರಣಾ ಜಿಲ್ಲೆಗಳಲ್ಲಿ ಹಾವಳಿ ಶಾಖ ನಕ್ಷೆ',
      selectDistrict: 'ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ',
      allDistricts: 'ಎಲ್ಲ ಜಿಲ್ಲೆಗಳು',
      legend: 'ದಂತಕಥೆ',
      highSeverity: 'ಅಧಿಕ ತೀವ್ರತೆ',
      mediumSeverity: 'ಮಧ್ಯಮ ತೀವ್ರತೆ',
      lowSeverity: 'ಕಡಿಮೆ ತೀವ್ರತೆ',
      healthy: 'ಆರೋಗ್ಯಕರ',
      recentReports: 'ಇತ್ತೀಚಿನ ವರದಿಗಳು',
      riskScore: 'ಅಪಾಯ ಸ್ಕೋರ್',
      activeReportsLabel: 'ಸಕ್ರಿಯ ವರದಿಗಳು',
    },
    upload: {
      title: 'ಕೀಟ ವರದಿ ಸಲ್ಲಿಸಿ',
      subtitle: 'AI-ಚಾಲಿತ ಕೀಟ ಪತ್ತೆಗಾಗಿ ಬೆಳೆ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      dragDrop: 'ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ ಮತ್ತು ಬಿಡಿ, ಅಥವಾ ಆಯ್ಕೆ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
      analyzing: 'AI ನೊಂದಿಗೆ ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      confidence: 'AI ವಿಶ್ವಾಸ',
      submit: 'ವರದಿ ಸಲ್ಲಿಸಿ',
      discard: 'ತಿರಸ್ಕರಿಸಿ',
      cropGuess: 'ಬೆಳೆ',
      recommendedAction: 'ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ',
      pestDetected: 'ಕೀಟ ಪತ್ತೆಯಾಗಿದೆ',
      noPestDetected: 'ಕೀಟ ಪತ್ತೆಯಾಗಿಲ್ಲ',
    },
    reports: {
      title: 'ಕೀಟ ವರದಿಗಳು',
      subtitle: 'ಕೀಟ ಹಾವಳಿ ವರದಿಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ ಮತ್ತು ಫಿಲ್ಟರ್ ಮಾಡಿ',
      date: 'ದಿನಾಂಕ',
      crop: 'ಬೆಳೆ',
      pest: 'ಕೀಟ',
      severity: 'ತೀವ್ರತೆ',
      status: 'ಸ್ಥಿತಿ',
      district: 'ಜಿಲ್ಲೆ',
      allSeverities: 'ಎಲ್ಲ ತೀವ್ರತೆಗಳು',
      allDistricts: 'ಎಲ್ಲ ಜಿಲ್ಲೆಗಳು',
      noReports: 'ಯಾವುದೇ ವರದಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
    },
    settings: {
      title: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
      subtitle: 'ನಿಮ್ಮ ಅಪ್ಲಿಕೇಶನ್ ಆದ್ಯತೆಗಳನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ',
      language: 'ಭಾಷೆ',
      languageDescription: 'ಇಂಟರ್ಫೇಸ್ಗಾಗಿ ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      theme: 'ಥೀಮ್',
    },
    common: {
      loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      error: 'ದೋಷ ಸಂಭವಿಸಿದೆ',
      success: 'ಕಾರ್ಯಾಚರಣೆ ಯಶಸ್ವಿಯಾಗಿದೆ',
      critical: 'ನಿರ್ಣಾಯಕ',
      high: 'ಅಧಿಕ',
      medium: 'ಮಧ್ಯಮ',
      low: 'ಕಡಿಮೆ',
      unverified: 'ಪರಿಶೀಲಿಸಲಾಗಿಲ್ಲ',
      verified: 'ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
      pending: 'ಬಾಕಿ ಇದೆ',
      increase: 'ಹೆಚ್ಚಳ',
      decrease: 'ಇಳಿಕೆ',
      reports: 'ವರದಿಗಳು',
    },
    landing: {
      pestIntelligence: 'ಕೀಟ ಬುದ್ಧಿಮತ್ತೆ ವ್ಯವಸ್ಥೆ',
      heroDesc: 'AI ಸಹಾಯದಿಂದ ಬೆಳೆ ಕೀಟಗಳು ಮತ್ತು ರೋಗಗಳಿಗೆ ಮುಂಚಿನ ಎಚ್ಚರಿಕೆ. ನೈಜ-ಸಮಯದ ಪತ್ತೆ, ಲೈವ್ ಹಾವಳಿ ನಕ್ಷೆ ಮತ್ತು ತಕ್ಷಣದ ಎಚ್ಚರಿಕೆಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಸುಗ್ಗಿಯನ್ನು ರಕ್ಷಿಸಿ.',
      scroll: 'ಕೆಳಗೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ',
      whyTitle: 'Apentomos ಏಕೆ ವಿಶೇಷ?',
      whyDesc: 'ಭಾರತೀಯ ಕೃಷಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ. AI-ಚಾಲಿತ ರೋಗನಿರ್ಣಯದಿಂದ ಸಮುದಾಯ-ಚಾಲಿತ ಹಾವಳಿ ಟ್ರ್ಯಾಕಿಂಗ್ ವರೆಗೆ.',
      featureAiTitle: 'AI ಬೆಳೆ ಪತ್ತೆ',
      featureAiDesc: 'ಬಾಧಿತ ಬೆಳೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ. ನಮ್ಮ AI Gemini ಸಹಾಯದಿಂದ ತಕ್ಷಣ ಕೀಟಗಳು ಮತ್ತು ರೋಗಗಳನ್ನು ಗುರುತಿಸುತ್ತದೆ.',
      featureMapTitle: 'ಲೈವ್ ಹಾವಳಿ ನಕ್ಷೆ',
      featureMapDesc: 'ಭಾರತದಾದ್ಯಂತ ಕೀಟ ಹಾವಳಿಯನ್ನು ನೈಜ-ಸಮಯದಲ್ಲಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ. ಬಣ್ಣ-ಕೋಡ್ ಮಾಡಿದ ಗುರುತುಗಳು ತೀವ್ರತೆಯನ್ನು ಸೂಚಿಸುತ್ತವೆ.',
      featureLangTitle: 'ಬಹು ಭಾಷೆ',
      featureLangDesc: 'ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ, ಮರಾಠಿ, ತೆಲುಗು ಮತ್ತು ಕನ್ನಡದಲ್ಲಿ ಲಭ್ಯವಿದೆ. ಭಾರತೀಯ ರೈತರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.',
      featureAlertTitle: 'ಮುಂಚಿನ ಎಚ್ಚರಿಕೆಗಳು',
      featureAlertDesc: 'ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಕೀಟಗಳು ಅಪಾಯ ಉಂಟುಮಾಡಿದಾಗ ತಿಳಿಯಿರಿ. ನಿಮ್ಮ ಹತ್ತಿರ ಹಾವಳಿ ಪತ್ತೆಯಾದಾಗ ಈಮೇಲ್ ಮತ್ತು SMS ಎಚ್ಚರಿಕೆಗಳು.',
      howTitle: 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
      step1Title: 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      step1Desc: 'ನಿಮ್ಮ ಫೋನ್‌ನಿಂದ ಬಾಧಿತ ಬೆಳೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ.',
      step2Title: 'AI ವಿಶ್ಲೇಷಣೆ',
      step2Desc: 'Gemini AI ತಕ್ಷಣ ಕೀಟ, ರೋಗ ಮತ್ತು ತೀವ್ರತೆಯನ್ನು ಗುರುತಿಸುತ್ತದೆ.',
      step3Title: 'ನಕ್ಷೆಯಲ್ಲಿ ವೀಕ್ಷಿಸಿ',
      step3Desc: 'ವರದಿಯು ಲೈವ್ ನಕ್ಷೆಯಲ್ಲಿ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತದೆ, ಇದರಿಂದ ನಿಮ್ಮ ಪ್ರದೇಶದ ಇತರರಿಗೂ ಮಾಹಿತಿ ಸಿಗುತ್ತದೆ.',
      step4Title: 'ಎಚ್ಚರಿಕೆಗಳನ್ನು ಪಡೆಯಿರಿ',
      step4Desc: 'ನಿಮ್ಮ ಜಿಲ್ಲೆಯಲ್ಲಿ ಹಾವಳಿ ಪತ್ತೆಯಾದಾಗ ಅಧಿಸೂಚನೆಗಳನ್ನು ಸ್ವೀಕರಿಸಿ.',
      ctaTitle: 'ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?',
      ctaDesc: 'Apentomos ಬಳಸಿಕೊಂಡು ಕೀಟ ಹಾವಳಿಯನ್ನು ಪತ್ತೆಹಚ್ಚಿ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತಿರುವ ರೈತರು ಮತ್ತು ಕೃಷಿ ಅಧಿಕಾರಿಗಳೊಂದಿಗೆ ಸೇರಿ.',
      ctaButton: 'ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ',
      footerTagline: 'ಕೀಟ ಬುದ್ಧಿಮತ್ತೆ ವ್ಯವಸ್ಥೆ',
      dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      getStarted: 'ಪ್ರಾರಂಭಿಸಿ',
      signIn: 'ಸೈನ್ ಇನ್',
    },
    auth: {
      signInTitle: 'ಸೈನ್ ಇನ್',
      signInSubtitle: 'ನಿಮ್ಮ Apentomos ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರವೇಶಿಸಿ',
      email: 'ಈಮೇಲ್',
      password: 'ಪಾಸ್‌ವರ್ಡ್',
      signingIn: 'ಸೈನ್ ಇನ್ ಆಗುತ್ತಿದೆ...',
      signIn: 'ಸೈನ್ ಇನ್',
      forgotPassword: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?',
      register: 'ನೋಂದಾಯಿಸಿ',
      or: 'ಅಥವಾ',
      signInWithGoogle: 'Google ಮೂಲಕ ಸೈನ್ ಇನ್',
      signUpWithGoogle: 'Google ಮೂಲಕ ನೋಂದಾಯಿಸಿ',
      createAccount: 'ಖಾತೆ ರಚಿಸಿ',
      registering: 'ನೋಂದಾಯಿಸಲಾಗುತ್ತಿದೆ...',
      registerTitle: 'ನೋಂದಾಯಿಸಿ',
      registerSubtitle: 'ನಿಮ್ಮ Apentomos ಖಾತೆಯನ್ನು ರಚಿಸಿ',
      confirmPassword: 'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ',
      repeatPassword: 'ಪಾಸ್‌ವರ್ಡ್ ಮತ್ತೆ ಟೈಪ್ ಮಾಡಿ',
      atLeast6Chars: 'ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳು',
      alreadyHaveAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
      resetPasswordTitle: 'ಪಾಸ್‌ವರ್ಡ್ ರೀಸೆಟ್',
      resetPasswordDesc: 'ರೀಸೆಟ್ ಲಿಂಕ್ ಪಡೆಯಲು ನಿಮ್ಮ ಈಮೇಲ್ ನಮೂದಿಸಿ',
      sendResetLink: 'ರೀಸೆಟ್ ಲಿಂಕ್ ಕಳುಹಿಸಿ',
      sending: 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...',
      backToSignIn: 'ಸೈನ್ ಇನ್‌ಗೆ ಹಿಂತಿರುಗಿ',
      checkEmail: 'ಪಾಸ್‌ವರ್ಡ್ ರೀಸೆಟ್ ಲಿಂಕ್‌ಗಾಗಿ ನಿಮ್ಮ ಈಮೇಲ್ ಪರಿಶೀಲಿಸಿ.',
      setNewPassword: 'ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ಹೊಂದಿಸಿ',
      setNewPasswordDesc: 'ನಿಮ್ಮ ಖಾತೆಗೆ ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ಆಯ್ಕೆಮಾಡಿ',
      newPassword: 'ಹೊಸ ಪಾಸ್‌ವರ್ಡ್',
      updatePassword: 'ಪಾಸ್‌ವರ್ಡ್ ಅಪ್‌ಡೇಟ್ ಮಾಡಿ',
      updating: 'ಅಪ್‌ಡೇಟ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
      verifyingResetLink: 'ರೀಸೆಟ್ ಲಿಂಕ್ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
      passwordUpdated: 'ಪಾಸ್‌ವರ್ಡ್ ಯಶಸ್ವಿಯಾಗಿ ಅಪ್‌ಡೇಟ್ ಆಗಿದೆ!',
      strengthWeak: 'ದುರ್ಬಲ',
      strengthFair: 'ಸಾಧಾರಣ',
      strengthGood: 'ಉತ್ತಮ',
      strengthStrong: 'ಬಲವಾದ',
      strengthVeryStrong: 'ತುಂಬಾ ಬಲವಾದ',
    },
    onboarding: {
      next: 'ಮುಂದೆ',
      done: 'ಮುಗಿಯಿತು',
      welcomeTitle: 'Apentomos ಗೆ ಸುಸ್ವಾಗತ',
      welcomeBody: 'ನಿಮ್ಮ AI-ಚಾಲಿತ ಕೀಟ ಬುದ್ಧಿಮತ್ತೆ ವ್ಯವಸ್ಥೆ. ಈ ಚಿಕ್ಕ ಮಾರ್ಗದರ್ಶಿ ನಿಮ್ಮನ್ನು ಪ್ರಮುಖ ವೈಶಿಷ್ಟ್ಯಗಳಿಗೆ ಪರಿಚಯಿಸುತ್ತದೆ, ಆದ್ದರಿಂದ ನೀವು ತಕ್ಷಣವೇ ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಲು ಪ್ರಾರಂಭಿಸಬಹುದು.',
      stepLabel: 'ಹಂತ',
      step1Title: 'ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      step1Body: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರಸ್ತುತ ಕೀಟ ಚಟುವಟಿಕೆಯ ಸ್ನ್ಯಾಪ್‌ಶಾಟ್ ನೀಡುತ್ತದೆ. ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳು, ವೀಕ್ಷಣೆಯಲ್ಲಿರುವ ಪ್ರದೇಶಗಳು ಮತ್ತು ಒಟ್ಟಾರೆ ಅಪಾಯ — ಜೊತೆಗೆ ಲೈವ್ ನಕ್ಷೆ ಮತ್ತು ಅಗ್ರ ಬಾಧಿತ ಜಿಲ್ಲೆಗಳನ್ನು ನೋಡುತ್ತೀರಿ.',
      step1Tip: 'ಸಲಹೆ: ಹೊಸ ವರದಿಗಳು ಬಂದಂತೆ ಅಪಾಯ ಸ್ಕೋರ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಅಪ್‌ಡೇಟ್ ಆಗುತ್ತದೆ.',
      step2Title: 'ಅಪ್‌ಲೋಡ್ ಮತ್ತು ಪತ್ತೆ',
      step2Body: 'ಬಾಧಿತ ಬೆಳೆಯ ಫೋಟೋ ತೆಗೆದು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. Apentomos Gemini AI ಬಳಸಿಕೊಂಡು ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಕೀಟ ಅಥವಾ ರೋಗವನ್ನು ಗುರುತಿಸಿ, ತೀವ್ರತೆಯನ್ನು ಅಂದಾಜು ಮಾಡಿ, ಬಾಧಿತ ಬೆಳೆಯನ್ನು ಸೂಚಿಸುತ್ತದೆ.',
      step2Tip: 'ಸಲಹೆ: ಉತ್ತಮ ಬೆಳಕು ಮತ್ತು ಬಾಧಿತ ಪ್ರದೇಶದ ಸ್ಪಷ್ಟ ಕ್ಲೋಸ್-ಅಪ್ ಉತ್ತಮ ಫಲಿತಾಂಶ ನೀಡುತ್ತದೆ.',
      step3Title: 'ನಕ್ಷೆಯನ್ನು ಅನ್ವೇಷಿಸಿ',
      step3Body: 'ಹಾವಳಿ ನಕ್ಷೆಯು ಭಾರತದಾದ್ಯಂತ ವರದಿಯಾದ ಎಲ್ಲ ಕೀಟ ಘಟನೆಗಳನ್ನು ತೋರಿಸುತ್ತದೆ. ಪ್ರತಿ ಗುರುತು ತೀವ್ರತೆಯಿಂದ ಬಣ್ಣ-ಕೋಡ್ ಆಗಿದೆ.',
      step3Tip: 'ಸಲಹೆ: ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಜೂಮ್ ಮಾಡಲು ಜಿಲ್ಲಾ ಫಿಲ್ಟರ್ ಬಳಸಿ.',
      step4Title: 'ವರದಿಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ',
      step4Body: 'ವರದಿಗಳ ಪುಟವು ತೀವ್ರತೆ, ಸ್ಥಿತಿ, ಜಿಲ್ಲೆ ಮತ್ತು ದಿನಾಂಕ ಫಿಲ್ಟರ್‌ಗಳೊಂದಿಗೆ ಪ್ರತಿ ಕೀಟ ವರದಿಯನ್ನು ಪಟ್ಟಿ ಮಾಡುತ್ತದೆ. ಸಂಪೂರ್ಣ ರೋಗನಿರ್ಣಯ ನೋಡಲು ಯಾವುದೇ ಸಾಲನ್ನು ವಿಸ್ತರಿಸಿ.',
      step4Tip: 'ಸಲಹೆ: ನೀವು ಸಲ್ಲಿಸಿದ ವರದಿಗಳನ್ನು ಮಾತ್ರ ನೋಡಲು "ನನ್ನ ವರದಿಗಳು" ಟೋಗಲ್ ಮಾಡಿ.',
      step5Title: 'ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
      step5Body: 'ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಹಾವಳಿಯನ್ನು ಎಂದಿಗೂ ತಪ್ಪಿಸಿಕೊಳ್ಳದಂತೆ SMS ಮತ್ತು ಈಮೇಲ್ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ. ನೀವು 5 ಬೆಂಬಲಿತ ಭಾಷೆಗಳ ನಡುವೆ ಬದಲಾಯಿಸಬಹುದು.',
      step5Tip: 'ಸಲಹೆ: ಅತಿ ತೀವ್ರತೆಯ ಹಾವಳಿಗಳಿಗೆ ಮಾತ್ರ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಸ್ವೀಕರಿಸಲು "ಕ್ರಿಟಿಕಲ್ ಓನ್ಲಿ" ಮೋಡ್ ಅನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ.',
      finalTitle: 'ನೀವು ಸಿದ್ಧರು',
      finalBody: 'ನೀವು Apentomos ಬಳಸಲು ಸಿದ್ಧರಾಗಿದ್ದೀರಿ. ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಅನ್ನು ಅನ್ವೇಷಿಸುವ ಮೂಲಕ ಅಥವಾ AI ವಿಶ್ಲೇಷಣೆಗಾಗಿ ನಿಮ್ಮ ಮೊದಲ ಬೆಳೆ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡುವ ಮೂಲಕ ಪ್ರಾರಂಭಿಸಿ.',
    },
    errors: {
      notFoundTitle: 'ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ',
      notFoundBody: 'ನೀವು ಹುಡುಕುತ್ತಿರುವ ಪುಟ ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ.',
      goToDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹೋಗಿ',
      somethingWentWrong: 'ಏನೋ ತಪ್ಪಾಗಿದೆ',
      unexpectedError: 'ಅನಿರೀಕ್ಷಿತ ದೋಷ ಸಂಭವಿಸಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      tryAgain: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
    },
    ui: {
      searchDistrict: 'ಜಿಲ್ಲೆ ಹುಡುಕಿ...',
      allDistricts: 'ಎಲ್ಲ ಜಿಲ್ಲೆಗಳು',
      noDistrictsFound: 'ಯಾವುದೇ ಜಿಲ್ಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
      unsupportedFile: 'ಚಿತ್ರದ ಫೈಲ್‌ಗಳು ಮಾತ್ರ ಬೆಂಬಲಿತವಾಗಿವೆ',
      loadingMap: 'ನಕ್ಷೆ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      back: 'ಹಿಂದೆ',
      continue: 'ಮುಂದುವರಿಸಿ',
      done: 'ಮುಗಿಯಿತು',
      confirm: 'ದೃಢಪಡಿಸಿ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      installTitle: 'Apentomos ಸ್ಥಾಪಿಸಿ',
      installDesc: 'ವೇಗದ ಪ್ರವೇಶ ಮತ್ತು ಆಫ್‌ಲೈನ್ ಬೆಂಬಲ',
      install: 'ಸ್ಥಾಪಿಸಿ',
      loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      availableProducts: 'ಲಭ್ಯವಿರುವ ಉತ್ಪನ್ನಗಳು',
      nearbyStores: 'ಹತ್ತಿರದ ಅಂಗಡಿಗಳು',
      pricesMayVary: 'ಅಂಗಡಿಯನ್ನು ಅವಲಂಬಿಸಿ ಬೆಲೆಗಳು ಬದಲಾಗಬಹುದು',
    },
    chat: {
      placeholder: 'ಬೆಳೆಗಳು, ಕೀಟಗಳ ಬಗ್ಗೆ ಕೇಳಿ...',
      nonFarmingWarning: 'ಕೃಷಿ ಮತ್ತು ವ್ಯವಸಾಯ ಸಂಬಂಧಿತ ಪ್ರಶ್ನೆಗಳನ್ನು ಮಾತ್ರ ಬೆಂಬಲಿಸಲಾಗುತ್ತದೆ.',
      farmingAI: 'ಕೃಷಿ AI',
      send: 'ಕಳುಹಿಸು',
    },
  },
}
