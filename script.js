/* KnightAI educational prototype. All account and assessment data stays in this browser. */
const STORAGE_KEY = "knightai-prototype-v1";
const THEME_KEY = "knightai-theme";
const DEMO_EMAIL = "demo@knightai.example";
const DEMO_PASSWORD = "KnightDemo2026!";

const industryNames = {
  professional: "Professional & Financial Services",
  realestate: "Real Estate",
  marketing: "Marketing & Creative Services"
};

const industryActivities = {
  professional: ["Client communication", "Research", "Preparing reports", "Document preparation", "Data entry", "Scheduling", "Reviewing information", "Creating presentations", "Other"],
  realestate: ["Client communication", "Property research", "Listing preparation", "Scheduling showings", "Follow-ups", "Document preparation", "Market research", "Data entry", "Other"],
  marketing: ["Writing content", "Social media", "Client communication", "Research", "Creating campaigns", "Brainstorming", "Editing", "Reports/analytics", "Other"]
};

const scale = (labels) => labels.map((label, index) => ({ value: String(index + 1), label: `${index + 1} — ${label}` }));
const frequencyOptions = scale(["Rarely", "Occasionally", "Weekly", "Daily", "Multiple times per day"]);
const amountOptions = scale(["Very little", "A little", "A moderate amount", "A lot", "A very large amount"]);

const generalQuestions = [
  { id: "industry", number: 1, title: "What industry best describes your business?", type: "single", options: Object.entries(industryNames).map(([value, label]) => ({ value, label })) },
  { id: "employees", number: 2, title: "How many employees does your business have?", type: "single", options: ["1–5", "6–20", "21–50", "51–100"].map((label, index) => ({ value: ["1-5", "6-20", "21-50", "51-100"][index], label })) },
  { id: "digitalTools", number: 3, title: "How would you describe your current use of digital tools?", type: "single", options: scale(["Very limited", "Somewhat limited", "Moderate", "Extensive", "Highly integrated"]) },
  { id: "processes", number: 4, title: "How standardized are your business processes?", type: "single", options: scale(["Most employees do tasks differently", "A few processes are standardized", "Important processes are generally consistent", "Most processes are standardized", "Processes are clearly documented and consistently followed"]) },
  { id: "repetitiveWork", number: 5, title: "How much of your employees' work involves repetitive tasks?", type: "single", options: scale(["Very little", "A small amount", "A moderate amount", "A large amount", "A very large amount"]) },
  { id: "taskFrequency", number: 6, title: "How often do employees perform the same or similar tasks?", type: "single", options: frequencyOptions },
  { id: "information", number: 7, title: "How organized is the information your business uses?", type: "single", options: scale(["Very difficult to organize or access", "Somewhat disorganized", "Moderately organized", "Well organized", "Highly organized and easy to access"]) },
  { id: "techComfort", number: 8, title: "How comfortable are employees with using new technology?", type: "single", options: scale(["Not comfortable", "Slightly comfortable", "Somewhat comfortable", "Very comfortable", "Extremely comfortable"]) },
  { id: "changeWillingness", number: 9, title: "How willing is your business to change an existing workflow if a new technology could improve it?", type: "single", options: scale(["Not willing", "Slightly willing", "Somewhat willing", "Very willing", "Extremely willing"]) },
  { id: "testWillingness", number: 10, title: "How likely would your business be to test an AI solution within the next 30 days?", type: "single", options: scale(["Very unlikely", "Unlikely", "Unsure", "Likely", "Very likely"]) },
  { id: "timeConsuming", number: 11, title: "What is the most time-consuming task in your business?", type: "text", placeholder: "Describe the task..." },
  { id: "mostRepeated", number: 12, title: "What task do you or your employees repeat most often?", type: "text", placeholder: "For example, answering common customer questions" },
  { id: "lessTime", number: 13, title: "What task would you most like to spend less time doing?", type: "text", placeholder: "Describe the task..." },
  { id: "currentMethod", number: 14, title: "Briefly describe how you currently complete that task.", type: "text", placeholder: "What tools and steps do you use now?", multiline: true }
];

const industryQuestionSets = {
  professional: [
    { id: "activities", number: 15, title: "Which activities take up the most time?", type: "multi", options: industryActivities.professional },
    { id: "similarWork", number: 16, title: "How much of your client-related work involves creating similar documents, emails, or reports?", type: "single", options: scale(["Very little", "A little", "A moderate amount", "A lot", "A very large amount"]) },
    { id: "researchFrequency", number: 17, title: "How often do employees need to research or summarize information for clients?", type: "single", options: frequencyOptions },
    { id: "desiredImprovement", number: 18, title: "What type of client work would you most like to make faster or easier?", type: "text" },
    { id: "requiredInformation", number: 19, title: "What information do employees usually need to gather before completing that task?", type: "text", multiline: true }
  ],
  realestate: [
    { id: "activities", number: 15, title: "Which activities take up the most time?", type: "multi", options: industryActivities.realestate },
    { id: "similarWork", number: 16, title: "How often do you send similar messages or follow-ups to clients?", type: "single", options: frequencyOptions },
    { id: "researchFrequency", number: 17, title: "How much time do you spend researching properties or market information?", type: "single", options: amountOptions },
    { id: "desiredImprovement", number: 18, title: "What part of the real estate process would you most like to make faster?", type: "text" },
    { id: "requiredInformation", number: 19, title: "What information do you usually need to gather for that process?", type: "text", multiline: true }
  ],
  marketing: [
    { id: "activities", number: 15, title: "Which activities take up the most time?", type: "multi", options: industryActivities.marketing },
    { id: "similarWork", number: 16, title: "How often do you create similar types of content for clients?", type: "single", options: frequencyOptions },
    { id: "researchFrequency", number: 17, title: "How much time is spent researching topics, audiences, competitors, or trends?", type: "single", options: amountOptions },
    { id: "desiredImprovement", number: 18, title: "What part of your creative or marketing workflow would you most like to make faster?", type: "text" },
    { id: "requiredInformation", number: 19, title: "What information or materials do you usually need before starting that task?", type: "text", multiline: true }
  ]
};

const closingQuestions = [
  { id: "aiExperience", number: 20, title: "How is your business currently using AI?", type: "single", options: scale(["We don't use AI", "Employees occasionally experiment with AI", "We regularly use AI for a few tasks", "AI is integrated into several workflows", "AI is an established part of our operations"]) },
  { id: "aiTools", number: 21, title: "What AI tools, if any, does your business currently use?", type: "text", optional: true, placeholder: "Leave blank if none" },
  { id: "aiWish", number: 22, title: "If AI could improve one part of your business, what would you want it to help with?", type: "text", optional: true, placeholder: "Your biggest wish for AI" }
];

const readinessFactors = [
  { id: "digitalTools", label: "Digital infrastructure", weight: 20 },
  { id: "processes", label: "Process consistency", weight: 15 },
  { id: "information", label: "Information organization", weight: 20 },
  { id: "techComfort", label: "Employee technology comfort", weight: 15 },
  { id: "changeWillingness", label: "Willingness to change", weight: 10 },
  { id: "testWillingness", label: "Willingness to test", weight: 10 },
  { id: "aiExperience", label: "Current AI familiarity", weight: 10 }
];

const opportunityTypes = [
  { id: "communication", title: "AI-assisted client communication", keywords: ["communication", "follow-up", "follow up", "email", "client", "customer", "message", "respond"] },
  { id: "research", title: "AI-assisted research and summaries", keywords: ["research", "market", "property", "information", "summar", "review", "competitor", "trend"] },
  { id: "documents", title: "AI-assisted document drafting", keywords: ["document", "report", "presentation", "proposal", "listing", "draft", "paperwork"] },
  { id: "content", title: "AI-assisted content planning", keywords: ["content", "social", "creative", "campaign", "writing", "brainstorm", "editing", "post"] },
  { id: "operations", title: "AI-assisted administrative workflows", keywords: ["data entry", "schedule", "analytics", "organize", "admin", "calendar", "tracking"] }
];

const defaultState = () => ({ users: {}, activeEmail: null, theme: "dark" });
let appState = loadState();
let activeQuestionIndex = 0;
let authMode = "signup";
let notificationTimeout;
let pendingProfilePhoto = null;

function loadState() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return data && typeof data === "object" && data.users ? { ...defaultState(), ...data } : defaultState();
  } catch { return defaultState(); }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(appState)); }
function currentUser() { return appState.activeEmail ? appState.users[appState.activeEmail] : null; }
function currentQuestions() {
  const industry = currentUser()?.answers?.industry || currentUser()?.profile?.industry || "professional";
  return [...generalQuestions, ...industryQuestionSets[industry], ...closingQuestions];
}
function notify(message) {
  const element = document.getElementById("announcement");
  element.textContent = message;
  element.hidden = false;
  clearTimeout(notificationTimeout);
  notificationTimeout = setTimeout(() => { element.hidden = true; }, 3500);
}
function setTheme(theme) {
  const next = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem(THEME_KEY, next);
  document.querySelector('meta[name="theme-color"]').content = next === "dark" ? "#09162b" : "#f4f7fc";
  const button = document.getElementById("themeToggle");
  button.setAttribute("aria-label", `Switch to ${next === "dark" ? "light" : "dark"} mode`);
  button.innerHTML = next === "dark" ? '☀ <span>Light</span>' : '☾ <span>Dark</span>';
}
function updateNavigation() {
  const loggedIn = !!currentUser();
  document.querySelectorAll(".member-only").forEach(element => { element.hidden = !loggedIn; });
  const button = document.getElementById("accountButton");
  document.getElementById("headerAccountLabel").textContent = loggedIn ? appState.activeEmail : "Sign in";
  button.dataset.view = loggedIn ? "settings" : "signin";
  button.setAttribute("aria-label", loggedIn ? `Account settings, signed in as ${appState.activeEmail}` : "Sign in");
  const avatar = document.getElementById("headerAvatar");
  avatar.hidden = !loggedIn;
  if (loggedIn) updateAvatar(avatar, currentUser().photo, appState.activeEmail);
  const start = document.querySelector(".header-start");
  start.hidden = loggedIn;
  const startAssessment = document.querySelector(".home-start-button");
  startAssessment.dataset.view = loggedIn ? "dashboard" : "signup";
  startAssessment.textContent = loggedIn ? "Go to my dashboard" : "Start free assessment";
}
function updateAvatar(element, photo, email) {
  element.replaceChildren();
  if (photo) {
    const image = document.createElement("img");
    image.src = photo;
    image.alt = "";
    element.append(image);
  } else {
    element.textContent = (email || "K").slice(0, 1).toUpperCase();
  }
}
function showView(requestedView, updateHistory = true) {
  let view = requestedView;
  if (["how-it-works", "features"].includes(view)) view = "home";
  if (["signup", "signin"].includes(view)) { authMode = view; view = "auth"; }
  const protectedViews = ["profile", "assessment", "results", "plan", "workbench", "dashboard", "settings"];
  if (protectedViews.includes(view) && !currentUser()) { authMode = "signin"; view = "auth"; }
  if (!document.querySelector(`[data-view-name="${view}"]`)) view = "home";
  if (["results", "plan", "workbench"].includes(view) && !currentUser()?.completed) view = "assessment";
  document.querySelectorAll(".view").forEach(element => element.classList.toggle("active", element.dataset.viewName === view));
  if (view === "auth") renderAuth();
  if (view === "profile") renderProfile();
  if (view === "assessment") renderQuestion();
  if (view === "results") renderResults();
  if (view === "plan") renderPlan();
  if (view === "workbench") renderWorkbench();
  if (view === "dashboard") renderDashboard();
  if (view === "settings") renderSettings();
  updateNavigation();
  const hash = requestedView === "how-it-works" || requestedView === "features" ? requestedView : view;
  if (updateHistory) history.pushState({ view: hash }, "", `#${hash}`);
  document.title = view === "home" ? "KnightAI | Find your next move with AI" : `${view.charAt(0).toUpperCase() + view.slice(1)} | KnightAI`;
  if (requestedView === "how-it-works" || requestedView === "features") document.getElementById(requestedView).scrollIntoView();
  else window.scrollTo({ top: 0, behavior: "instant" });
}

/* Demo account authentication. Never use this browser-only design for real accounts. */
async function hashPassword(password, salt) {
  if (!crypto?.subtle) throw new Error("This browser requires a secure local origin for the account demo. Run a local web server if needed.");
  const input = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", input);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
}
async function demoAccount() {
  if (appState.users[DEMO_EMAIL]) return;
  const salt = "knightai-public-demo";
  appState.users[DEMO_EMAIL] = { salt, passwordHash: await hashPassword(DEMO_PASSWORD, salt), profile: {}, answers: {}, completed: false, checklist: [false, false, false, false], savedPrompt: "" };
  saveState();
}
function renderAuth() {
  const signup = authMode === "signup";
  document.getElementById("authEyebrow").textContent = signup ? "CREATE YOUR ACCOUNT" : "WELCOME BACK";
  document.getElementById("authHeading").textContent = signup ? "Let's get started." : "Sign in to KnightAI.";
  document.getElementById("authDescription").textContent = signup ? "Create a local demo account to save your assessment in this browser." : "Continue your demo assessment and pick up where you left off.";
  document.getElementById("authSubmit").textContent = signup ? "Create demo account" : "Sign in";
  document.getElementById("authSwitchDescription").textContent = signup ? "Already have an account?" : "New to KnightAI?";
  document.getElementById("authSwitchButton").textContent = signup ? "Sign in" : "Create account";
  document.getElementById("authMessage").hidden = true;
  document.getElementById("accountPassword").autocomplete = signup ? "new-password" : "current-password";
}
async function submitAuth(event) {
  event.preventDefault();
  const email = document.getElementById("accountEmail").value.trim().toLowerCase();
  const password = document.getElementById("accountPassword").value;
  const message = document.getElementById("authMessage");
  const invalid = (text) => { message.textContent = text; message.hidden = false; };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return invalid("Enter a valid email address.");
  if (password.length < 8) return invalid("Enter a password with at least 8 characters.");
  const button = document.getElementById("authSubmit");
  button.disabled = true;
  try {
    await demoAccount();
    if (authMode === "signup") {
      if (appState.users[email]) return invalid("This demo email is already registered. Please sign in.");
      const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, "0")).join("");
      appState.users[email] = { salt, passwordHash: await hashPassword(password, salt), profile: {}, answers: {}, completed: false, checklist: [false, false, false, false], savedPrompt: "" };
    } else {
      const user = appState.users[email];
      if (!user || (await hashPassword(password, user.salt)) !== user.passwordHash) return invalid("Email or password doesn't match this browser's demo account.");
    }
    appState.activeEmail = email;
    saveState();
    document.getElementById("authForm").reset();
    const user = currentUser();
    showView(user.completed ? "dashboard" : Object.keys(user.profile).length ? "assessment" : "profile");
  } catch (error) { invalid(error.message || "Unable to open the demo account."); }
  finally { button.disabled = false; }
}
function renderProfile() {
  const profile = currentUser().profile || {};
  document.getElementById("businessName").value = profile.businessName || "";
  document.getElementById("industry").value = profile.industry || currentUser().answers.industry || "";
  document.getElementById("employeeCount").value = profile.employees || currentUser().answers.employees || "";
  document.getElementById("businessDescription").value = profile.description || "";
}
function submitProfile(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const user = currentUser();
  const oldIndustry = user.answers.industry;
  const industry = document.getElementById("industry").value;
  user.profile = { businessName: document.getElementById("businessName").value.trim(), industry, employees: document.getElementById("employeeCount").value, description: document.getElementById("businessDescription").value.trim() };
  user.answers.industry = industry;
  user.answers.employees = user.profile.employees;
  if (oldIndustry && oldIndustry !== industry) ["activities", "activityOther", "similarWork", "researchFrequency", "desiredImprovement", "requiredInformation"].forEach(id => delete user.answers[id]);
  activeQuestionIndex = 0;
  user.completed = false;
  saveState();
  showView("assessment");
}

/* Assessment: a single question per screen, with branch-specific questions. */
function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}
function renderQuestion() {
  const questions = currentQuestions();
  activeQuestionIndex = Math.max(0, Math.min(activeQuestionIndex, questions.length - 1));
  const question = questions[activeQuestionIndex];
  const answer = currentUser().answers[question.id];
  const content = document.getElementById("questionContent");
  content.replaceChildren();
  content.appendChild(makeElement("h2", "", question.title));
  document.getElementById("assessmentCategory").textContent = question.number <= 14 ? "YOUR BUSINESS & WORKFLOW" : question.number <= 19 ? industryNames[currentUser().answers.industry].toUpperCase() : "YOUR AI EXPERIENCE";
  document.getElementById("assessmentHeading").textContent = question.number <= 14 ? "Understand your starting point." : question.number <= 19 ? "Find your biggest opportunities." : "Almost there.";
  document.getElementById("stepCount").textContent = `${activeQuestionIndex + 1} of ${questions.length}`;
  const progress = Math.round(((activeQuestionIndex + 1) / questions.length) * 100);
  document.getElementById("assessmentProgressFill").style.width = `${progress}%`;
  document.getElementById("assessmentProgress").setAttribute("aria-valuenow", progress);
  document.getElementById("assessmentMessage").hidden = true;
  if (question.optional) content.appendChild(makeElement("p", "question-description", "Optional — you can skip this question."));
  if (question.type === "multi") content.appendChild(makeElement("p", "question-description", "Choose up to 3 activities."));
  if (question.type === "single" || question.type === "multi") {
    const group = makeElement("div", "answer-options");
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", question.title);
    const options = question.options.map(option => typeof option === "string" ? { value: option, label: option } : option);
    options.forEach(option => {
      const label = makeElement("label", "answer-option");
      const input = document.createElement("input");
      input.type = question.type === "single" ? "radio" : "checkbox";
      input.name = "answerOption";
      input.value = option.value;
      input.checked = question.type === "single" ? String(answer) === option.value : Array.isArray(answer) && answer.includes(option.value);
      label.append(input, makeElement("span", "", option.label));
      group.appendChild(label);
    });
    content.appendChild(group);
    if (question.type === "multi") {
      const field = makeElement("div", "form-field");
      const label = makeElement("label", "", "If other, specify:"); label.htmlFor = "activityOther";
      const input = document.createElement("input"); input.type = "text"; input.id = "activityOther"; input.maxLength = 200; input.placeholder = "Other activity"; input.value = currentUser().answers.activityOther || "";
      field.append(label, input); content.appendChild(field);
    }
  } else {
    const field = makeElement("div", "form-field");
    const input = document.createElement(question.multiline ? "textarea" : "input");
    if (!question.multiline) input.type = "text";
    input.id = "textAnswer"; input.name = "textAnswer"; input.maxLength = 600; input.placeholder = question.placeholder || "Your answer...";
    input.value = answer || "";
    field.appendChild(input); content.appendChild(field);
  }
  document.getElementById("previousQuestion").textContent = activeQuestionIndex === 0 ? "Business profile" : "Back";
  document.getElementById("nextQuestion").textContent = activeQuestionIndex === questions.length - 1 ? "See my results" : "Continue";
}
function collectAnswer(validate = true) {
  const question = currentQuestions()[activeQuestionIndex];
  const user = currentUser();
  let answer;
  if (question.type === "single") answer = document.querySelector('input[name="answerOption"]:checked')?.value;
  else if (question.type === "multi") answer = [...document.querySelectorAll('input[name="answerOption"]:checked')].map(element => element.value);
  else answer = document.getElementById("textAnswer").value.trim();
  const error = document.getElementById("assessmentMessage");
  if (validate && (!answer || (Array.isArray(answer) && answer.length === 0)) && !question.optional) { error.textContent = "Please answer this question before continuing."; error.hidden = false; return false; }
  if (validate && question.type === "multi" && answer.length > 3) { error.textContent = "Choose no more than 3 activities."; error.hidden = false; return false; }
  if (validate && question.type === "multi" && answer.includes("Other") && !document.getElementById("activityOther").value.trim()) { error.textContent = "Please specify the other activity."; error.hidden = false; return false; }
  if (answer !== undefined) user.answers[question.id] = answer;
  if (question.type === "multi") user.answers.activityOther = document.getElementById("activityOther").value.trim();
  if (question.id === "industry" && answer !== user.profile.industry) {
    user.profile.industry = answer;
    ["activities", "activityOther", "similarWork", "researchFrequency", "desiredImprovement", "requiredInformation"].forEach(id => delete user.answers[id]);
  }
  if (question.id === "employees") user.profile.employees = answer;
  user.completed = false;
  saveState();
  return true;
}
function moveQuestion(direction) {
  if (direction < 0) {
    collectAnswer(false);
    if (activeQuestionIndex === 0) return showView("profile");
    activeQuestionIndex--; return renderQuestion();
  }
  if (!collectAnswer()) return;
  if (activeQuestionIndex === currentQuestions().length - 1) {
    currentUser().completed = true;
    saveState();
    return showView("results");
  }
  activeQuestionIndex++;
  renderQuestion();
}

/* Transparent illustrative scoring. All values are 1–5, mapped to 0–100. */
function normalizedAnswer(value) { return Math.max(0, Math.min(100, ((Number(value) || 1) - 1) * 25)); }
function calculateScores(answers) {
  const readiness = Math.round(readinessFactors.reduce((sum, factor) => sum + normalizedAnswer(answers[factor.id]) * factor.weight / 100, 0));
  const opportunityComponents = [
    { score: normalizedAnswer(answers.repetitiveWork), weight: .25 },
    { score: normalizedAnswer(answers.taskFrequency), weight: .25 },
    { score: normalizedAnswer(answers.similarWork), weight: .20 },
    { score: normalizedAnswer(answers.researchFrequency), weight: .10 },
    { score: normalizedAnswer(answers.processes), weight: .10 },
    { score: Math.min(100, (answers.activities?.length || 0) / 3 * 100), weight: .10 }
  ];
  const opportunity = Math.round(opportunityComponents.reduce((sum, component) => sum + component.score * component.weight, 0));
  return { readiness, opportunity };
}
function findOpportunities(answers) {
  const freeText = [answers.timeConsuming, answers.mostRepeated, answers.lessTime, answers.desiredImprovement, answers.aiWish].filter(Boolean).join(" ").toLowerCase();
  const activities = (answers.activities || []).concat(answers.activityOther || "").join(" ").toLowerCase();
  const ranked = opportunityTypes.map((item, order) => {
    const freeTextMatches = item.keywords.filter(keyword => freeText.includes(keyword)).length;
    const activityMatches = item.keywords.filter(keyword => activities.includes(keyword)).length;
    return { ...item, order, relevance: freeTextMatches * 3 + activityMatches * 2 };
  });
  ranked.sort((a, b) => b.relevance - a.relevance || a.order - b.order);
  if (ranked[0].relevance === 0) {
    const fallback = answers.industry === "marketing" ? "content" : "communication";
    ranked.sort((a, b) => Number(b.id === fallback) - Number(a.id === fallback) || a.order - b.order);
  }
  return ranked;
}
function getRecommendation() { return findOpportunities(currentUser().answers)[0]; }
function readinessLabel(score) { return score < 40 ? "Build your foundation" : score < 70 ? "Developing readiness" : "Ready to pilot carefully"; }
function opportunityLabel(score) { return score < 40 ? "A focused opportunity" : score < 70 ? "Promising areas to explore" : "Strong potential to investigate"; }
function setText(id, value) { document.getElementById(id).textContent = value; }
function renderResults() {
  const answers = currentUser().answers;
  const { readiness, opportunity } = calculateScores(answers);
  const ranked = findOpportunities(answers);
  setText("resultsSubtitle", `Based on your answers for ${currentUser().profile.businessName || "your business"}.`);
  setText("readinessScore", readiness); setText("opportunityScore", opportunity);
  setText("readinessStatus", readinessLabel(readiness)); setText("opportunityStatus", opportunityLabel(opportunity));
  document.getElementById("readinessRing").style.setProperty("--gauge-progress", readiness);
  document.getElementById("opportunityRing").style.setProperty("--gauge-progress", opportunity);
  setText("readinessExplanation", "How prepared your team may be to adopt new AI-supported workflows.");
  setText("opportunityExplanation", "How strongly your answers suggest repetitive, frequent tasks worth exploring.");
  const factorList = document.getElementById("readinessFactors"); factorList.replaceChildren();
  readinessFactors.forEach(factor => {
    const score = normalizedAnswer(answers[factor.id]);
    const wrapper = makeElement("div");
    const header = makeElement("div", "factor-top");
    header.append(makeElement("span", "", factor.label), makeElement("strong", "", `${score}/100`));
    const track = makeElement("div", "factor-track"); const fill = makeElement("span"); fill.style.width = `${score}%`; track.append(fill);
    wrapper.append(header, track); factorList.append(wrapper);
  });
  const opportunities = document.getElementById("opportunityList"); opportunities.replaceChildren();
  ranked.slice(0, 3).forEach((item, index) => {
    const row = makeElement("div", "recommendation-item");
    row.append(makeElement("span", "", "✦"));
    const text = makeElement("div"); text.append(makeElement("strong", "", item.title), makeElement("small", "", index === 0 ? "Best starting match for your answers" : "Additional workflow to consider"));
    row.append(text); opportunities.append(row);
  });
  setText("resultRecommendation", `Start with ${ranked[0].title.toLowerCase()}.`);
  const processComment = readiness < 40 ? "First, organize the information and steps involved in that task before trying an AI tool." : "Your current digital setup may support a small, supervised pilot.";
  const task = answers.lessTime || answers.desiredImprovement || answers.mostRepeated || "your selected recurring work";
  setText("resultReason", `You identified “${task}” as work worth improving. ${processComment} Begin with one low-risk example and review every output.`);
}

function renderPlan() {
  const recommendation = getRecommendation();
  const { readiness } = calculateScores(currentUser().answers);
  setText("planHeading", recommendation.title);
  const task = currentUser().answers.lessTime || currentUser().answers.desiredImprovement || "a recurring task";
  setText("planIntroduction", `Use “${task}” as a starting case. This plan is a suggested experiment, not a guarantee of results.`);
  const phases = [
    { name: "Week 1 · Map the task", description: "Write down the inputs, steps, time spent, and what a successful output looks like. Avoid confidential data." },
    { name: "Week 2 · Try a small pilot", description: readiness < 40 ? "Standardize a sample workflow, then test one non-sensitive example in an approved tool." : "Try one non-sensitive example with an approved AI tool and compare it with your current method." },
    { name: "Week 3 · Review and improve", description: "Check accuracy, consistency, privacy, and the time spent reviewing results. Adjust your prompt." },
    { name: "Week 4 · Decide what comes next", description: "Document your findings, ask the team for feedback, and decide whether to continue, adjust, or stop." }
  ];
  const list = document.getElementById("planTimeline"); list.replaceChildren();
  phases.forEach(phase => { const item = makeElement("div", "timeline-item"); item.append(makeElement("span", "", "✦")); const text = makeElement("div"); text.append(makeElement("strong", "", phase.name), makeElement("p", "", phase.description)); item.append(text); list.append(item); });
}
function suggestedPrompt() {
  const answers = currentUser().answers;
  const recommendation = getRecommendation();
  return `You are a careful business assistant supporting ${currentUser().profile.businessName || "my business"} (${industryNames[answers.industry]}).\n\nTask: Help me with ${answers.lessTime || answers.desiredImprovement || answers.mostRepeated || recommendation.title.toLowerCase()}.\n\nCurrent workflow: ${answers.currentMethod || "[Describe how this task is done today]"}\n\nInformation or materials available: ${answers.requiredInformation || "[List approved, non-sensitive inputs]"}\n\nInstructions:\n1. Suggest a clear, practical first draft or process for this task.\n2. Ask clarifying questions if important information is missing.\n3. Do not invent facts, sources, or client details. Mark anything that needs verification.\n4. Present the result in a concise, editable format.\n5. Include a short quality-control checklist for a human reviewer.\n\nDo not process confidential, financial, legal, or personal information unless the tool and workflow are approved for it.`;
}
function renderWorkbench() {
  setText("workbenchTitle", getRecommendation().title);
  setText("workbenchContext", `Use a small sample of ${currentUser().answers.lessTime || "your chosen workflow"} to test whether AI helps. This workbench edits text; it does not run an AI model.`);
  document.getElementById("promptEditor").value = currentUser().savedPrompt || suggestedPrompt();
  document.getElementById("workbenchMessage").hidden = true;
}
function savePrompt() {
  const prompt = document.getElementById("promptEditor").value.trim();
  if (!prompt) return notify("Write a prompt before saving it.");
  currentUser().savedPrompt = prompt;
  saveState();
  setText("workbenchMessage", "Prompt saved to this browser's demo dashboard.");
  document.getElementById("workbenchMessage").hidden = false;
}
function renderDashboard() {
  const user = currentUser();
  setText("dashboardGreeting", `Welcome back${user.profile.businessName ? `, ${user.profile.businessName}` : ""}.`);
  if (user.completed) {
    const scores = calculateScores(user.answers);
    setText("dashboardAssessmentTitle", `Readiness ${scores.readiness}/100 · Opportunity ${scores.opportunity}/100`);
    setText("dashboardAssessmentDescription", "Your assessment is complete. Review results or update your responses anytime.");
    setText("dashboardAssessmentButton", "View results");
    setText("dashboardNextMove", getRecommendation().title);
    setText("dashboardNextMoveDescription", "Your suggested starting workflow is ready to explore.");
  } else {
    setText("dashboardAssessmentTitle", "Your assessment is in progress");
    setText("dashboardAssessmentDescription", "Continue where you left off to unlock your scores and recommendations.");
    setText("dashboardAssessmentButton", "Continue assessment");
    setText("dashboardNextMove", "Discover your next opportunity");
    setText("dashboardNextMoveDescription", "Complete the assessment to see your recommendation.");
  }
  document.getElementById("dashboardPlanButton").disabled = !user.completed;
  updateDashboardProgress();
  setText("dashboardPromptStatus", user.savedPrompt ? "You have an editable prompt saved in this browser." : "No prompt saved yet.");
  const checklist = document.getElementById("dashboardChecklist"); checklist.replaceChildren();
  const steps = ["Map your current workflow", "Try one low-risk example", "Review and improve the result", "Evaluate whether to continue"];
  steps.forEach((step, index) => {
    const label = document.createElement("label"); const box = document.createElement("input"); box.type = "checkbox"; box.checked = !!user.checklist[index];
    box.disabled = !user.completed;
    box.addEventListener("change", () => { user.checklist[index] = box.checked; saveState(); updateDashboardProgress(); });
    label.append(box, makeElement("span", "", step)); checklist.append(label);
  });
}
function updateDashboardProgress() {
  const user = currentUser();
  const readiness = user.completed ? calculateScores(user.answers).readiness : 0;
  const completedTasks = (user.checklist || []).filter(Boolean).length;
  const taskPercentage = Math.round(completedTasks / 4 * 100);
  setText("dashboardReadinessValue", user.completed ? `${readiness} / 100` : "Not assessed");
  setText("dashboardTaskValue", `${completedTasks} of 4 complete (${taskPercentage}%)`);
  document.getElementById("dashboardReadinessFill").style.width = `${readiness}%`;
  document.getElementById("dashboardTaskFill").style.width = `${taskPercentage}%`;
  document.getElementById("dashboardReadinessProgress").setAttribute("aria-valuenow", readiness);
  document.getElementById("dashboardTaskProgress").setAttribute("aria-valuenow", taskPercentage);
}

function renderSettings() {
  const user = currentUser();
  const profile = user.profile || {};
  pendingProfilePhoto = user.photo || "";
  document.getElementById("settingsEmail").value = appState.activeEmail;
  document.getElementById("settingsBusinessName").value = profile.businessName || "";
  document.getElementById("settingsIndustry").value = profile.industry || user.answers.industry || "professional";
  document.getElementById("settingsEmployees").value = profile.employees || user.answers.employees || "1-5";
  document.getElementById("settingsDescription").value = profile.description || "";
  document.getElementById("settingsPassword").value = "";
  document.getElementById("profilePhoto").value = "";
  document.getElementById("settingsMessage").hidden = true;
  updateAvatar(document.getElementById("settingsAvatar"), pendingProfilePhoto, appState.activeEmail);
}
async function saveSettings(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const user = currentUser();
  const previousEmail = appState.activeEmail;
  const updatedEmail = document.getElementById("settingsEmail").value.trim().toLowerCase();
  const updatedIndustry = document.getElementById("settingsIndustry").value;
  const newPassword = document.getElementById("settingsPassword").value;
  const message = document.getElementById("settingsMessage");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedEmail)) { message.textContent = "Please enter a valid email."; message.hidden = false; return; }
  if (updatedEmail !== previousEmail && appState.users[updatedEmail]) { message.textContent = "That email is already being used by a demo account."; message.hidden = false; return; }
  if (newPassword && newPassword.length < 8) { message.textContent = "New passwords must be at least 8 characters."; message.hidden = false; return; }
  try {
    if (newPassword) {
      user.salt = Array.from(crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, "0")).join("");
      user.passwordHash = await hashPassword(newPassword, user.salt);
    }
    const industryChanged = user.profile.industry && user.profile.industry !== updatedIndustry;
    user.profile = {
      businessName: document.getElementById("settingsBusinessName").value.trim(),
      industry: updatedIndustry,
      employees: document.getElementById("settingsEmployees").value,
      description: document.getElementById("settingsDescription").value.trim()
    };
    user.photo = pendingProfilePhoto;
    user.answers.industry = updatedIndustry;
    user.answers.employees = user.profile.employees;
    if (industryChanged) {
      ["activities", "activityOther", "similarWork", "researchFrequency", "desiredImprovement", "requiredInformation"].forEach(id => delete user.answers[id]);
      user.completed = false;
      user.savedPrompt = "";
      user.checklist = [false, false, false, false];
      activeQuestionIndex = 14;
    }
    if (updatedEmail !== previousEmail) { delete appState.users[previousEmail]; appState.users[updatedEmail] = user; appState.activeEmail = updatedEmail; }
    saveState();
    updateNavigation();
    renderSettings();
    notify(industryChanged ? "Changes saved. Please complete your updated industry questions." : "Account changes saved.");
  } catch (error) { message.textContent = error.message || "Couldn't save changes."; message.hidden = false; }
}
function handleProfilePhoto(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 1024 * 1024) {
    event.target.value = "";
    return notify("Choose a JPG, PNG or WebP image smaller than 1 MB.");
  }
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result !== "string" || !reader.result.startsWith("data:image/")) return;
    pendingProfilePhoto = reader.result;
    updateAvatar(document.getElementById("settingsAvatar"), pendingProfilePhoto, appState.activeEmail);
    notify("Picture selected. Choose Save changes to keep it.");
  };
  reader.readAsDataURL(file);
}
function restartAssessment() {
  if (!confirm("Restart the assessment? Your previous answers, scores, and implementation checklist will be cleared. Your account and business profile will stay.")) return;
  const user = currentUser();
  user.answers = { industry: user.profile.industry, employees: user.profile.employees };
  user.completed = false;
  user.savedPrompt = "";
  user.checklist = [false, false, false, false];
  activeQuestionIndex = 0;
  saveState();
  showView("assessment");
  notify("Your assessment has been restarted.");
}
function deleteAccount() {
  const email = appState.activeEmail;
  const confirmation = prompt(`Permanently delete your local KnightAI account (${email}) and all of its saved data? Type DELETE to confirm.`);
  if (confirmation !== "DELETE") return;
  delete appState.users[email];
  appState.activeEmail = null;
  saveState();
  showView("home");
  notify("Your demo account and its saved data were deleted.");
}

/* Wire the page together. */
document.getElementById("themeToggle").addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
document.getElementById("authForm").addEventListener("submit", submitAuth);
document.getElementById("authSwitchButton").addEventListener("click", () => { authMode = authMode === "signup" ? "signin" : "signup"; renderAuth(); });
document.getElementById("fillDemoCredentials").addEventListener("click", () => { authMode = "signin"; renderAuth(); document.getElementById("accountEmail").value = DEMO_EMAIL; document.getElementById("accountPassword").value = DEMO_PASSWORD; });
document.getElementById("profileForm").addEventListener("submit", submitProfile);
document.getElementById("assessmentForm").addEventListener("submit", event => { event.preventDefault(); moveQuestion(1); });
document.getElementById("previousQuestion").addEventListener("click", () => moveQuestion(-1));
document.getElementById("editAnswersButton").addEventListener("click", () => { activeQuestionIndex = 0; showView("assessment"); });
document.getElementById("savePromptButton").addEventListener("click", savePrompt);
document.getElementById("copyPromptButton").addEventListener("click", async () => { try { await navigator.clipboard.writeText(document.getElementById("promptEditor").value); notify("Prompt copied."); } catch { notify("Copy not available here. Select the prompt and copy it manually."); } });
document.getElementById("dashboardAssessmentButton").addEventListener("click", () => showView(currentUser().completed ? "results" : Object.keys(currentUser().profile).length ? "assessment" : "profile"));
document.getElementById("dashboardPlanButton").addEventListener("click", () => showView("plan"));
document.getElementById("signOutButton").addEventListener("click", () => { appState.activeEmail = null; saveState(); showView("home"); notify("Signed out of the demo account."); });
document.getElementById("settingsForm").addEventListener("submit", saveSettings);
document.getElementById("profilePhoto").addEventListener("change", handleProfilePhoto);
document.getElementById("removeProfilePhoto").addEventListener("click", () => { pendingProfilePhoto = ""; updateAvatar(document.getElementById("settingsAvatar"), "", appState.activeEmail); notify("Picture removed. Choose Save changes to keep it."); });
document.getElementById("restartAssessmentButton").addEventListener("click", restartAssessment);
document.getElementById("deleteAccountButton").addEventListener("click", deleteAccount);
document.addEventListener("click", event => {
  const button = event.target.closest("[data-view]");
  if (button) { event.preventDefault(); showView(button.dataset.view); }
});
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener("click", event => {
  const target = link.getAttribute("href").slice(1);
  if (target === "home" || target === "dashboard" || target === "how-it-works" || target === "features") { event.preventDefault(); showView(target); }
}));
window.addEventListener("popstate", () => { const page = location.hash.slice(1) || "home"; showView(page, false); });
setTheme(localStorage.getItem(THEME_KEY) || "dark");
showView(location.hash.slice(1) || "home", false);
