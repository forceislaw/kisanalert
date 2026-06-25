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
      whyTitle: 'Why KisanAlert?',
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
      ctaDesc: 'Join farmers and agricultural officers using KisanAlert to detect and respond to pest outbreaks.',
      ctaButton: 'Get Started Free',
      footerTagline: 'Pest Intelligence System',
      dashboard: 'Dashboard',
      getStarted: 'Get Started',
      signIn: 'Sign In',
    },
    auth: {
      signInTitle: 'Sign In',
      signInSubtitle: 'Access your KisanAlert dashboard',
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
      registerSubtitle: 'Create your KisanAlert account',
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
      welcomeTitle: 'Welcome to KisanAlert',
      welcomeBody: 'Your AI-powered pest intelligence system. This short guide will walk you through the key features so you can start protecting your crops right away.',
      stepLabel: 'Step',
      step1Title: 'Your Dashboard',
      step1Body: 'The dashboard gives you a snapshot of current pest activity. You will see key metrics — active alerts, regions under watch, and overall risk — plus a live map and top affected districts.',
      step1Tip: 'Tip: The risk score updates automatically as new reports come in.',
      step2Title: 'Upload & Detect',
      step2Body: 'Snap a photo of an affected crop and upload it. KisanAlert uses Gemini AI to identify the pest or disease, estimate severity, and suggest the affected crop — all in seconds.',
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
      finalBody: 'You are ready to start using KisanAlert. Begin by exploring your dashboard or upload your first crop photo for AI analysis.',
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
      pestIntelligence: 'Pest Intelligence System',
      heroDesc: 'AI-powered early warning for crop pests and diseases. Protect your harvest with real-time detection, live outbreak maps, and instant alerts.',
      scroll: 'Scroll',
      whyTitle: 'Why KisanAlert?',
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
      ctaDesc: 'Join farmers and agricultural officers using KisanAlert to detect and respond to pest outbreaks.',
      ctaButton: 'Get Started Free',
      footerTagline: 'Pest Intelligence System',
      dashboard: 'Dashboard',
      getStarted: 'Get Started',
      signIn: 'Sign In',
    },
    auth: {
      signInTitle: 'Sign In',
      signInSubtitle: 'Access your KisanAlert dashboard',
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
      registerSubtitle: 'Create your KisanAlert account',
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
      welcomeTitle: 'Welcome to KisanAlert',
      welcomeBody: 'Your AI-powered pest intelligence system. This short guide will walk you through the key features so you can start protecting your crops right away.',
      stepLabel: 'Step',
      step1Title: 'Your Dashboard',
      step1Body: 'The dashboard gives you a snapshot of current pest activity. You will see key metrics — active alerts, regions under watch, and overall risk — plus a live map and top affected districts.',
      step1Tip: 'Tip: The risk score updates automatically as new reports come in.',
      step2Title: 'Upload & Detect',
      step2Body: 'Snap a photo of an affected crop and upload it. KisanAlert uses Gemini AI to identify the pest or disease, estimate severity, and suggest the affected crop — all in seconds.',
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
      finalBody: 'You are ready to start using KisanAlert. Begin by exploring your dashboard or upload your first crop photo for AI analysis.',
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
      pestIntelligence: 'Pest Intelligence System',
      heroDesc: 'AI-powered early warning for crop pests and diseases. Protect your harvest with real-time detection, live outbreak maps, and instant alerts.',
      scroll: 'Scroll',
      whyTitle: 'Why KisanAlert?',
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
      ctaDesc: 'Join farmers and agricultural officers using KisanAlert to detect and respond to pest outbreaks.',
      ctaButton: 'Get Started Free',
      footerTagline: 'Pest Intelligence System',
      dashboard: 'Dashboard',
      getStarted: 'Get Started',
      signIn: 'Sign In',
    },
    auth: {
      signInTitle: 'Sign In',
      signInSubtitle: 'Access your KisanAlert dashboard',
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
      registerSubtitle: 'Create your KisanAlert account',
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
      welcomeTitle: 'Welcome to KisanAlert',
      welcomeBody: 'Your AI-powered pest intelligence system. This short guide will walk you through the key features so you can start protecting your crops right away.',
      stepLabel: 'Step',
      step1Title: 'Your Dashboard',
      step1Body: 'The dashboard gives you a snapshot of current pest activity. You will see key metrics — active alerts, regions under watch, and overall risk — plus a live map and top affected districts.',
      step1Tip: 'Tip: The risk score updates automatically as new reports come in.',
      step2Title: 'Upload & Detect',
      step2Body: 'Snap a photo of an affected crop and upload it. KisanAlert uses Gemini AI to identify the pest or disease, estimate severity, and suggest the affected crop — all in seconds.',
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
      finalBody: 'You are ready to start using KisanAlert. Begin by exploring your dashboard or upload your first crop photo for AI analysis.',
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
      pestIntelligence: 'Pest Intelligence System',
      heroDesc: 'AI-powered early warning for crop pests and diseases. Protect your harvest with real-time detection, live outbreak maps, and instant alerts.',
      scroll: 'Scroll',
      whyTitle: 'Why KisanAlert?',
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
      ctaDesc: 'Join farmers and agricultural officers using KisanAlert to detect and respond to pest outbreaks.',
      ctaButton: 'Get Started Free',
      footerTagline: 'Pest Intelligence System',
      dashboard: 'Dashboard',
      getStarted: 'Get Started',
      signIn: 'Sign In',
    },
    auth: {
      signInTitle: 'Sign In',
      signInSubtitle: 'Access your KisanAlert dashboard',
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
      registerSubtitle: 'Create your KisanAlert account',
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
      welcomeTitle: 'Welcome to KisanAlert',
      welcomeBody: 'Your AI-powered pest intelligence system. This short guide will walk you through the key features so you can start protecting your crops right away.',
      stepLabel: 'Step',
      step1Title: 'Your Dashboard',
      step1Body: 'The dashboard gives you a snapshot of current pest activity. You will see key metrics — active alerts, regions under watch, and overall risk — plus a live map and top affected districts.',
      step1Tip: 'Tip: The risk score updates automatically as new reports come in.',
      step2Title: 'Upload & Detect',
      step2Body: 'Snap a photo of an affected crop and upload it. KisanAlert uses Gemini AI to identify the pest or disease, estimate severity, and suggest the affected crop — all in seconds.',
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
      finalBody: 'You are ready to start using KisanAlert. Begin by exploring your dashboard or upload your first crop photo for AI analysis.',
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
      pestIntelligence: 'Pest Intelligence System',
      heroDesc: 'AI-powered early warning for crop pests and diseases. Protect your harvest with real-time detection, live outbreak maps, and instant alerts.',
      scroll: 'Scroll',
      whyTitle: 'Why KisanAlert?',
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
      ctaDesc: 'Join farmers and agricultural officers using KisanAlert to detect and respond to pest outbreaks.',
      ctaButton: 'Get Started Free',
      footerTagline: 'Pest Intelligence System',
      dashboard: 'Dashboard',
      getStarted: 'Get Started',
      signIn: 'Sign In',
    },
    auth: {
      signInTitle: 'Sign In',
      signInSubtitle: 'Access your KisanAlert dashboard',
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
      registerSubtitle: 'Create your KisanAlert account',
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
      welcomeTitle: 'Welcome to KisanAlert',
      welcomeBody: 'Your AI-powered pest intelligence system. This short guide will walk you through the key features so you can start protecting your crops right away.',
      stepLabel: 'Step',
      step1Title: 'Your Dashboard',
      step1Body: 'The dashboard gives you a snapshot of current pest activity. You will see key metrics — active alerts, regions under watch, and overall risk — plus a live map and top affected districts.',
      step1Tip: 'Tip: The risk score updates automatically as new reports come in.',
      step2Title: 'Upload & Detect',
      step2Body: 'Snap a photo of an affected crop and upload it. KisanAlert uses Gemini AI to identify the pest or disease, estimate severity, and suggest the affected crop — all in seconds.',
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
      finalBody: 'You are ready to start using KisanAlert. Begin by exploring your dashboard or upload your first crop photo for AI analysis.',
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
    },
  },
}
