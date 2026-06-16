/* ==========================================================================
   Chronos — Premium Age Logic & Calculations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- State Variables ---
    let profiles = [];
    let activeProfileId = null;
    let tickerInterval = null;
    let colorTheme = 'indigo'; // Default

    // --- DOM Elements ---
    const profilesList = document.getElementById('profiles-list');
    const addProfileBtn = document.getElementById('add-profile-btn');
    const configTitle = document.getElementById('config-title');
    const profileForm = document.getElementById('profile-form');
    const profileNameInput = document.getElementById('profile-name');
    const birthDateInput = document.getElementById('birth-date');
    const birthTimeInput = document.getElementById('birth-time');
    const saveBtn = document.getElementById('save-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const accentDots = document.querySelectorAll('.accent-dot');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const darkIcon = themeToggleBtn.querySelector('.dark-icon');
    const lightIcon = themeToggleBtn.querySelector('.light-icon');

    const emptyState = document.getElementById('empty-state');
    const createFirstProfileBtn = document.getElementById('create-first-profile-btn');
    const dashboardGrid = document.getElementById('dashboard-grid');

    // Dashboard Elements
    const activeProfileName = document.getElementById('active-profile-name');
    const todayDateBadge = document.getElementById('today-date-badge');
    const ageYears = document.getElementById('age-years');
    const ageMonths = document.getElementById('age-months');
    const ageDays = document.getElementById('age-days');
    const ageHours = document.getElementById('age-hours');
    const ageMinutes = document.getElementById('age-minutes');
    const ageSeconds = document.getElementById('age-seconds');

    // Next Birthday Elements
    const bdayDaysLeft = document.getElementById('bday-days-left');
    const bdayProgressCircle = document.getElementById('bday-progress-circle');
    const nextAgeVal = document.getElementById('next-age-val');
    const nextBdayDate = document.getElementById('next-bday-date');
    const bdayHoursLeft = document.getElementById('bday-hours-left');
    const bdayMinsLeft = document.getElementById('bday-mins-left');
    const bdaySecsLeft = document.getElementById('bday-secs-left');

    // Journey Elements
    const lifeProgressBar = document.getElementById('life-progress-bar');
    const lifeProgressPercent = document.getElementById('life-progress-percent');

    // Breakdown Elements
    const breakdownMonths = document.getElementById('breakdown-months');
    const breakdownWeeks = document.getElementById('breakdown-weeks');
    const breakdownDays = document.getElementById('breakdown-days');
    const breakdownHours = document.getElementById('breakdown-hours');
    const breakdownMinutes = document.getElementById('breakdown-minutes');
    const breakdownSeconds = document.getElementById('breakdown-seconds');

    // Astrology Elements
    const westernSymbol = document.getElementById('western-zodiac-symbol');
    const westernName = document.getElementById('western-zodiac-name');
    const westernElement = document.getElementById('western-zodiac-element');
    const westernDates = document.getElementById('western-zodiac-dates');

    const chineseSymbol = document.getElementById('chinese-zodiac-symbol');
    const chineseName = document.getElementById('chinese-zodiac-name');
    const chineseElement = document.getElementById('chinese-zodiac-element');
    const chineseYears = document.getElementById('chinese-zodiac-years');

    // Bio Elements
    const bioHeartbeats = document.getElementById('bio-heartbeats');
    const bioBreaths = document.getElementById('bio-breaths');
    const bioSleep = document.getElementById('bio-sleep');
    const bioBirthDay = document.getElementById('bio-birth-day');
    const bioDayPoem = document.getElementById('bio-day-poem');

    // Planet Elements
    const planetMercuryAge = document.getElementById('planet-mercury-age');
    const planetMercuryCountdown = document.getElementById('planet-mercury-countdown');
    const planetVenusAge = document.getElementById('planet-venus-age');
    const planetVenusCountdown = document.getElementById('planet-venus-countdown');
    const planetMarsAge = document.getElementById('planet-mars-age');
    const planetMarsCountdown = document.getElementById('planet-mars-countdown');
    const planetJupiterAge = document.getElementById('planet-jupiter-age');
    const planetJupiterCountdown = document.getElementById('planet-jupiter-countdown');
    const planetSaturnAge = document.getElementById('planet-saturn-age');
    const planetSaturnCountdown = document.getElementById('planet-saturn-countdown');
    const planetUranusAge = document.getElementById('planet-uranus-age');
    const planetUranusCountdown = document.getElementById('planet-uranus-countdown');
    const planetNeptuneAge = document.getElementById('planet-neptune-age');
    const planetNeptuneCountdown = document.getElementById('planet-neptune-countdown');

    // Travel Elements
    const travelFutureDate = document.getElementById('travel-future-date');
    const calculateTravelBtn = document.getElementById('calculate-travel-btn');
    const travelResult1 = document.getElementById('travel-result-1');

    const travelMilestoneSelect = document.getElementById('travel-milestone-select');
    const calculateMilestoneBtn = document.getElementById('calculate-milestone-btn');
    const travelResult2 = document.getElementById('travel-result-2');

    // --- Astronomical Data (Orbital periods in Earth Days) ---
    const PLANET_PERIODS = {
        mercury: 87.969,
        venus: 224.701,
        mars: 686.971,
        jupiter: 4332.59,
        saturn: 10759.22,
        uranus: 30687.15,
        neptune: 60190.03
    };

    // --- Zodiac Reference Data ---
    const WESTERN_ZODIAC = [
        { name: 'Capricorn', symbol: '♑', element: 'Earth', start: [12, 22], end: [1, 19] },
        { name: 'Aquarius', symbol: '♒', element: 'Air', start: [1, 20], end: [2, 18] },
        { name: 'Pisces', symbol: '♓', element: 'Water', start: [2, 19], end: [3, 20] },
        { name: 'Aries', symbol: '♈', element: 'Fire', start: [3, 21], end: [4, 19] },
        { name: 'Taurus', symbol: '♉', element: 'Earth', start: [4, 20], end: [5, 20] },
        { name: 'Gemini', symbol: '♊', element: 'Air', start: [5, 21], end: [6, 20] },
        { name: 'Cancer', symbol: '♋', element: 'Water', start: [6, 21], end: [7, 22] },
        { name: 'Leo', symbol: '♌', element: 'Fire', start: [7, 23], end: [8, 22] },
        { name: 'Virgo', symbol: '♍', element: 'Earth', start: [8, 23], end: [9, 22] },
        { name: 'Libra', symbol: '♎', element: 'Air', start: [9, 23], end: [10, 22] },
        { name: 'Scorpio', symbol: '♏', element: 'Water', start: [10, 23], end: [11, 21] },
        { name: 'Sagittarius', symbol: '♐', element: 'Fire', start: [11, 22], end: [12, 21] }
    ];

    const CHINESE_ZODIAC = [
        { name: 'Rat', symbol: '🐀' },
        { name: 'Ox', symbol: '🐂' },
        { name: 'Tiger', symbol: '🐅' },
        { name: 'Rabbit', symbol: '🐇' },
        { name: 'Dragon', symbol: '🐉' },
        { name: 'Snake', symbol: '🐍' },
        { name: 'Horse', symbol: '🐎' },
        { name: 'Goat', symbol: '🐐' },
        { name: 'Monkey', symbol: '🐒' },
        { name: 'Rooster', symbol: '🐓' },
        { name: 'Dog', symbol: '🐕' },
        { name: 'Pig', symbol: '🐖' }
    ];

    const CHINESE_ELEMENTS = ['Metal', 'Metal', 'Water', 'Water', 'Wood', 'Wood', 'Fire', 'Fire', 'Earth', 'Earth'];

    // Day of the week poems/descriptions
    const BIRTH_DAY_METRICS = {
        0: { name: 'Sunday', poem: 'Sunday\'s child is bonny and blithe, good and gay.' },
        1: { name: 'Monday', poem: 'Monday\'s child is fair of face.' },
        2: { name: 'Tuesday', poem: 'Tuesday\'s child is full of grace.' },
        3: { name: 'Wednesday', poem: 'Wednesday\'s child is full of woe (Sensitive & caring).' },
        4: { name: 'Thursday', poem: 'Thursday\'s child has far to go (Adventurous & ambitious).' },
        5: { name: 'Friday', poem: 'Friday\'s child is loving and giving.' },
        6: { name: 'Saturday', poem: 'Saturday\'s child works hard for a living.' }
    };

    // Limit maximum birth date to today
    const todayStr = new Date().toISOString().split('T')[0];
    birthDateInput.max = todayStr;
    if (travelFutureDate) {
        travelFutureDate.min = todayStr;
    }

    // --- Core Startup & Storage ---
    function init() {
        // Load settings from localStorage
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'light') {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
        }

        const storedProfiles = localStorage.getItem('chronos_profiles');
        if (storedProfiles) {
            profiles = JSON.parse(storedProfiles);
        }

        const storedActiveId = localStorage.getItem('chronos_active_profile_id');
        if (storedActiveId && profiles.some(p => p.id === storedActiveId)) {
            activeProfileId = storedActiveId;
        } else if (profiles.length > 0) {
            activeProfileId = profiles[0].id;
        }

        renderProfiles();
        if (activeProfileId) {
            loadActiveProfile();
        } else {
            showEmptyState();
        }
    }

    // --- Profile UI Renderers ---
    function renderProfiles() {
        profilesList.innerHTML = '';
        profiles.forEach(profile => {
            const badge = document.createElement('div');
            badge.className = `profile-badge ${profile.id === activeProfileId ? 'active' : ''}`;
            badge.style.setProperty('color', `var(--color-${profile.accentColor})`);
            badge.innerHTML = `
                <div class="profile-badge-info">
                    <span class="profile-dot" style="background-color: var(--color-${profile.accentColor});"></span>
                    <div>
                        <div class="profile-name">${escapeHTML(profile.name)}</div>
                        <div class="profile-bday">${formatSimpleDate(profile.birthDate)}</div>
                    </div>
                </div>
                <div class="profile-badge-actions">
                    <button class="icon-btn edit-prof-btn" title="Edit Profile" data-id="${profile.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                    </button>
                </div>
            `;

            // Click badge to select profile (excluding edit click)
            badge.addEventListener('click', (e) => {
                if (e.target.closest('.edit-prof-btn')) return;
                selectProfile(profile.id);
            });

            // Click edit button inside badge
            const editBtn = badge.querySelector('.edit-prof-btn');
            editBtn.addEventListener('click', () => {
                openEditState(profile);
            });

            profilesList.appendChild(badge);
        });
    }

    function selectProfile(id) {
        activeProfileId = id;
        localStorage.setItem('chronos_active_profile_id', id);
        renderProfiles();
        loadActiveProfile();
        triggerConfetti(0.25, { spread: 60, startVelocity: 30 });
    }

    function loadActiveProfile() {
        const profile = profiles.find(p => p.id === activeProfileId);
        if (!profile) {
            showEmptyState();
            return;
        }

        emptyState.classList.add('hidden');
        dashboardGrid.classList.remove('hidden');

        // Apply profile theme color
        setAccentTheme(profile.accentColor);

        activeProfileName.textContent = profile.name;
        
        // Reset Time Travel forms
        if (travelResult1) travelResult1.classList.add('hidden');
        if (travelResult2) travelResult2.classList.add('hidden');
        if (travelFutureDate) travelFutureDate.value = '';

        // Start real-time calculations
        if (tickerInterval) clearInterval(tickerInterval);
        
        // Calculate immediately
        updateCalculations(profile);
        
        // Tick every second
        tickerInterval = setInterval(() => {
            updateCalculations(profile);
        }, 1000);

        // Prep form for editing if they click edit
        openEditState(profile);
    }

    function openEditState(profile) {
        configTitle.textContent = `Edit: ${profile.name}`;
        profileNameInput.value = profile.name;
        birthDateInput.value = profile.birthDate;
        birthTimeInput.value = profile.birthTime || '00:00';
        
        // Set accent dots
        accentDots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.color === profile.accentColor);
        });
        colorTheme = profile.accentColor;

        deleteBtn.classList.remove('hidden');
        saveBtn.querySelector('span').textContent = 'Update Profile';
    }

    function openNewState() {
        configTitle.textContent = 'New Profile';
        profileNameInput.value = '';
        
        // Default to today minus 25 years just for a friendly placeholder date
        const defaultDate = new Date();
        defaultDate.setFullYear(defaultDate.getFullYear() - 25);
        birthDateInput.value = defaultDate.toISOString().split('T')[0];
        birthTimeInput.value = '00:00';
        
        colorTheme = 'indigo';
        accentDots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.color === 'indigo');
        });

        deleteBtn.classList.add('hidden');
        saveBtn.querySelector('span').textContent = 'Create Profile';
        profileNameInput.focus();
    }

    function showEmptyState() {
        if (tickerInterval) clearInterval(tickerInterval);
        emptyState.classList.remove('hidden');
        dashboardGrid.classList.add('hidden');
        openNewState();
    }

    // --- Calculation Core ---
    function updateCalculations(profile) {
        const now = new Date();
        const birthStr = `${profile.birthDate}T${profile.birthTime || '00:00'}`;
        const birth = new Date(birthStr);

        // Safety check if birthdate is in the future
        if (birth > now) {
            showFutureDateWarning();
            return;
        }

        // 1. Ticker Header Today
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        todayDateBadge.textContent = now.toLocaleDateString(undefined, dateOptions);

        // 2. Exact Age ( Gregorian Calendar components )
        const age = getDetailedAge(birth, now);
        ageYears.textContent = padZero(age.years);
        ageMonths.textContent = padZero(age.months);
        ageDays.textContent = padZero(age.days);
        ageHours.textContent = padZero(age.hours);
        ageMinutes.textContent = padZero(age.minutes);
        ageSeconds.textContent = padZero(age.seconds);

        // 3. Next Birthday Countdown
        let nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate(), birth.getHours(), birth.getMinutes(), 0);
        if (nextBday < now) {
            nextBday.setFullYear(now.getFullYear() + 1);
        }

        const nextAge = nextBday.getFullYear() - birth.getFullYear();
        nextAgeVal.textContent = nextAge;
        nextBdayDate.textContent = nextBday.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

        const timeDiff = nextBday - now;
        const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minsLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const secsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

        bdayDaysLeft.textContent = daysLeft;
        bdayHoursLeft.textContent = padZero(hoursLeft);
        bdayMinsLeft.textContent = padZero(minsLeft);
        bdaySecsLeft.textContent = padZero(secsLeft);

        // Birthday circular progress ring
        // Circumference of our SVG circle (r=50) is 2 * pi * 50 = 314.159
        const circumference = 314.159;
        let lastBday = new Date(nextBday);
        lastBday.setFullYear(nextBday.getFullYear() - 1);
        const totalYearMs = nextBday - lastBday;
        const elapsedMs = now - lastBday;
        const yearPercent = Math.min(100, Math.max(0, (elapsedMs / totalYearMs) * 100));

        const offset = circumference - (yearPercent / 100) * circumference;
        bdayProgressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        bdayProgressCircle.style.strokeDashoffset = offset;

        // Celebrate on birthday!
        if (daysLeft === 0 && hoursLeft === 0 && minsLeft === 0 && secsLeft <= 2) {
            triggerConfetti(0.5, { spread: 100, scalar: 1.2 });
        }

        // 4. Life Journey Progress (80 year lifespan)
        const totalAgeMs = now - birth;
        const targetLifespanMs = 80 * 365.2425 * 24 * 60 * 60 * 1000; // 80 years in ms
        const lifePercent = Math.min(100, Math.max(0, (totalAgeMs / targetLifespanMs) * 100));
        lifeProgressBar.style.width = `${lifePercent.toFixed(4)}%`;
        lifeProgressPercent.textContent = `${lifePercent.toFixed(2)}%`;

        updateMilestonesLog(age.years);

        // 5. Precise Life Breakdown
        const diffSeconds = Math.floor(totalAgeMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        const diffWeeks = Math.floor(diffDays / 7);
        const diffMonthsExact = (age.years * 12) + age.months;

        breakdownMonths.textContent = formatNumber(diffMonthsExact);
        breakdownWeeks.textContent = formatNumber(diffWeeks);
        breakdownDays.textContent = formatNumber(diffDays);
        breakdownHours.textContent = formatNumber(diffHours);
        breakdownMinutes.textContent = formatNumber(diffMinutes);
        breakdownSeconds.textContent = formatNumber(diffSeconds);

        // 6. Astrology (Western & Chinese)
        const wZodiac = getWesternZodiac(birth.getMonth() + 1, birth.getDate());
        westernSymbol.textContent = wZodiac.symbol;
        westernName.textContent = wZodiac.name;
        westernElement.textContent = wZodiac.element;
        westernDates.textContent = wZodiac.datesStr;

        const cZodiac = getChineseZodiac(birth.getFullYear());
        chineseSymbol.textContent = cZodiac.symbol;
        chineseName.textContent = cZodiac.name;
        chineseElement.textContent = cZodiac.element;
        chineseYears.textContent = `Cycle Animal`;

        // 7. Biological Milestones
        const totalMinutesLived = diffMinutes;
        const totalDaysLived = diffDays;
        
        bioHeartbeats.textContent = formatCompact(totalMinutesLived * 80); // 80 bpm
        bioBreaths.textContent = formatCompact(totalMinutesLived * 16);   // 16 breaths/min
        bioSleep.textContent = formatCompact(totalDaysLived * 8);         // 8 hours sleep/day
        
        const birthDayIndex = birth.getDay();
        const dayMetric = BIRTH_DAY_METRICS[birthDayIndex];
        bioBirthDay.textContent = dayMetric.name;
        bioDayPoem.textContent = dayMetric.poem;

        // 8. Cosmic Planet Explorer
        updatePlanetaryStats(diffDays);
    }

    function getDetailedAge(birth, now) {
        let years = now.getFullYear() - birth.getFullYear();
        let months = now.getMonth() - birth.getMonth();
        let days = now.getDate() - birth.getDate();
        let hours = now.getHours() - birth.getHours();
        let minutes = now.getMinutes() - birth.getMinutes();
        let seconds = now.getSeconds() - birth.getSeconds();

        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            days--;
        }
        if (days < 0) {
            const prevMonthDate = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonthDate.getDate();
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }
        return { years, months, days, hours, minutes, seconds };
    }

    function updateMilestonesLog(years) {
        setMilestoneStatus('milestone-infancy', years, 0, 2);
        setMilestoneStatus('milestone-childhood', years, 3, 12);
        setMilestoneStatus('milestone-adolescence', years, 13, 19);
        setMilestoneStatus('milestone-adulthood', years, 20, 64);
        setMilestoneStatus('milestone-senior', years, 65, 200);
    }

    function setMilestoneStatus(elementId, currentYears, start, end) {
        const item = document.getElementById(elementId);
        const status = item.querySelector('.milestone-status');
        
        item.classList.remove('completed', 'active');
        
        if (currentYears > end) {
            item.classList.add('completed');
            status.textContent = 'Completed';
        } else if (currentYears >= start && currentYears <= end) {
            item.classList.add('active');
            status.textContent = 'Active';
        } else {
            status.textContent = 'Upcoming';
        }
    }

    function updatePlanetaryStats(earthDaysLived) {
        for (const [planet, period] of Object.entries(PLANET_PERIODS)) {
            const planetAge = earthDaysLived / period;
            
            // Age label
            const ageEl = document.getElementById(`planet-${planet}-age`);
            if (ageEl) ageEl.textContent = planetAge.toFixed(2);

            // Days until next birthday
            const nextPlanetBdayAge = Math.ceil(planetAge);
            const daysToNextBday = (nextPlanetBdayAge - planetAge) * period;
            
            const countdownEl = document.getElementById(`planet-${planet}-countdown`);
            if (countdownEl) {
                if (daysToNextBday < 1) {
                    countdownEl.textContent = 'Happy Birthday!';
                    countdownEl.style.color = 'var(--accent-color)';
                } else {
                    countdownEl.textContent = `${Math.ceil(daysToNextBday)} earth days`;
                    countdownEl.style.color = '';
                }
            }
        }
    }

    // --- Zodiac Translators ---
    function getWesternZodiac(month, day) {
        // Find zodiac sign matching dates
        for (let i = 0; i < WESTERN_ZODIAC.length; i++) {
            const sign = WESTERN_ZODIAC[i];
            const [startM, startD] = sign.start;
            const [endM, endD] = sign.end;

            // Handle Capricorns split across Dec/Jan
            if (startM > endM) {
                if ((month === startM && day >= startD) || (month === endM && day <= endD)) {
                    return formatSignObject(sign);
                }
            } else {
                if ((month === startM && day >= startD) || (month === endM && day <= endD)) {
                    return formatSignObject(sign);
                }
            }
        }
        // Fallback Capricorn
        return formatSignObject(WESTERN_ZODIAC[0]);
    }

    function formatSignObject(sign) {
        const startMonthName = new Date(2000, sign.start[0] - 1, 1).toLocaleString(undefined, { month: 'short' });
        const endMonthName = new Date(2000, sign.end[0] - 1, 1).toLocaleString(undefined, { month: 'short' });
        return {
            name: sign.name,
            symbol: sign.symbol,
            element: sign.element,
            datesStr: `${startMonthName} ${sign.start[1]} - ${endMonthName} ${sign.end[1]}`
        };
    }

    function getChineseZodiac(year) {
        // 1900 was Year of the Rat (index 0)
        // modulo calculation relative to 1900
        const index = (year - 1900) % 12;
        const cycleIndex = index >= 0 ? index : index + 12;
        
        // Element: Last digit of birth year dictates the element (Metal, Water, Wood, Fire, Earth)
        const lastDigit = year % 10;
        const element = CHINESE_ELEMENTS[lastDigit];

        return {
            name: CHINESE_ZODIAC[cycleIndex].name,
            symbol: CHINESE_ZODIAC[cycleIndex].symbol,
            element: element
        };
    }

    // --- Action Handlers ---

    // Accent Color dots selection
    accentDots.forEach(dot => {
        dot.addEventListener('click', () => {
            accentDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            colorTheme = dot.dataset.color;
            setAccentTheme(colorTheme);
        });
    });

    function setAccentTheme(themeName) {
        const root = document.documentElement;
        root.style.setProperty('--accent-color', `var(--color-${themeName})`);
        root.style.setProperty('--accent-gradient', `var(--color-${themeName}-gradient)`);
        
        // Custom glow opacity depending on color
        let glowColor = 'rgba(99, 102, 241, 0.4)'; // Default Indigo
        if (themeName === 'rose') glowColor = 'rgba(244, 63, 94, 0.4)';
        if (themeName === 'emerald') glowColor = 'rgba(16, 185, 129, 0.4)';
        if (themeName === 'amber') glowColor = 'rgba(245, 158, 11, 0.4)';
        if (themeName === 'cyan') glowColor = 'rgba(6, 182, 212, 0.4)';
        
        root.style.setProperty('--accent-glow', glowColor);
    }

    // Profile Form Save
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = profileNameInput.value.trim();
        const birthDate = birthDateInput.value;
        const birthTime = birthTimeInput.value || '00:00';

        if (!name || !birthDate) return;

        // Validate birth date not in future
        const now = new Date();
        const selectedBirth = new Date(`${birthDate}T${birthTime}`);
        if (selectedBirth > now) {
            alert('Birth date cannot be in the future!');
            return;
        }

        // Check if editing or creating
        const isEdit = deleteBtn.classList.contains('hidden') === false;

        if (isEdit && activeProfileId) {
            // Update
            const index = profiles.findIndex(p => p.id === activeProfileId);
            if (index !== -1) {
                profiles[index].name = name;
                profiles[index].birthDate = birthDate;
                profiles[index].birthTime = birthTime;
                profiles[index].accentColor = colorTheme;
            }
        } else {
            // Create
            const newProfile = {
                id: 'prof_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                name: name,
                birthDate: birthDate,
                birthTime: birthTime,
                accentColor: colorTheme
            };
            profiles.push(newProfile);
            activeProfileId = newProfile.id;
        }

        localStorage.setItem('chronos_profiles', JSON.stringify(profiles));
        localStorage.setItem('chronos_active_profile_id', activeProfileId);

        renderProfiles();
        loadActiveProfile();
        
        triggerConfetti(0.4, { spread: 80, startVelocity: 40 });
    });

    // Profile Form Delete
    deleteBtn.addEventListener('click', () => {
        if (!activeProfileId) return;

        const profile = profiles.find(p => p.id === activeProfileId);
        if (!profile) return;

        if (confirm(`Are you sure you want to delete profile "${profile.name}"?`)) {
            profiles = profiles.filter(p => p.id !== activeProfileId);
            localStorage.setItem('chronos_profiles', JSON.stringify(profiles));

            if (profiles.length > 0) {
                activeProfileId = profiles[0].id;
                localStorage.setItem('chronos_active_profile_id', activeProfileId);
                renderProfiles();
                loadActiveProfile();
            } else {
                activeProfileId = null;
                localStorage.removeItem('chronos_active_profile_id');
                renderProfiles();
                showEmptyState();
            }
        }
    });

    // Add Profile button clicked (prep new state)
    addProfileBtn.addEventListener('click', () => {
        activeProfileId = null;
        renderProfiles();
        openNewState();
    });

    createFirstProfileBtn.addEventListener('click', () => {
        openNewState();
    });

    // --- Theme Toggler ---
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        if (isDark) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- Travel Tools Logics ---
    if (calculateTravelBtn) {
        calculateTravelBtn.addEventListener('click', () => {
            const activeProfile = profiles.find(p => p.id === activeProfileId);
            if (!activeProfile) return;

            const targetDateStr = travelFutureDate.value;
            if (!targetDateStr) {
                alert('Please select a date to simulate!');
                return;
            }

            const birth = new Date(`${activeProfile.birthDate}T${activeProfile.birthTime || '00:00'}`);
            const targetDate = new Date(`${targetDateStr}T12:00:00`);

            if (targetDate < birth) {
                alert('Choose a date that falls after the birth date!');
                return;
            }

            const simulatedAge = getDetailedAge(birth, targetDate);

            // Display results
            const resultBox = travelResult1;
            const dateSpan = resultBox.querySelector('.date-val');
            const ageSpan = resultBox.querySelector('.age-val');

            const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateSpan.textContent = targetDate.toLocaleDateString(undefined, dateOptions);
            
            let ageDesc = '';
            if (simulatedAge.years > 0) ageDesc += `${simulatedAge.years} year${simulatedAge.years > 1 ? 's' : ''}`;
            if (simulatedAge.months > 0) ageDesc += `${ageDesc ? ', ' : ''}${simulatedAge.months} month${simulatedAge.months > 1 ? 's' : ''}`;
            if (simulatedAge.days > 0) ageDesc += `${ageDesc ? ', ' : ''}${simulatedAge.days} day${simulatedAge.days > 1 ? 's' : ''}`;
            if (!ageDesc) ageDesc = '0 days (just born!)';

            ageSpan.textContent = ageDesc;
            resultBox.classList.remove('hidden');
            
            triggerConfetti(0.15, { spread: 40, startVelocity: 20 });
        });
    }

    if (calculateMilestoneBtn) {
        calculateMilestoneBtn.addEventListener('click', () => {
            const activeProfile = profiles.find(p => p.id === activeProfileId);
            if (!activeProfile) return;

            const birth = new Date(`${activeProfile.birthDate}T${activeProfile.birthTime || '00:00'}`);
            const milestoneValue = parseInt(travelMilestoneSelect.value, 10);
            
            let targetDate = new Date(birth);
            let description = '';
            
            // Check type of milestone
            if (milestoneValue === 10000 || milestoneValue === 15000 || milestoneValue === 20000 || milestoneValue === 25000 || milestoneValue === 30000) {
                // Days lived milestones
                targetDate.setDate(birth.getDate() + milestoneValue);
                description = `${formatNumber(milestoneValue)} Days Lived`;
            } else if (milestoneValue === 500000000 || milestoneValue === 1000000000 || milestoneValue === 1500000000 || milestoneValue === 2000000000) {
                // Seconds lived milestones
                targetDate.setTime(birth.getTime() + (milestoneValue * 1000));
                description = `${formatCompact(milestoneValue)} Seconds Lived`;
            } else if (milestoneValue === 50 || milestoneValue === 75 || milestoneValue === 100) {
                // Age milestones
                targetDate.setFullYear(birth.getFullYear() + milestoneValue);
                description = `${milestoneValue} Earth Years Old`;
            }

            const now = new Date();
            const daysRemaining = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));

            const resultBox = travelResult2;
            const dateSpan = resultBox.querySelector('.date-val');
            const daysSpan = resultBox.querySelector('.days-val');

            const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateSpan.textContent = targetDate.toLocaleDateString(undefined, dateOptions);
            
            if (daysRemaining < 0) {
                daysSpan.parentElement.innerHTML = `You reached this milestone <span class="highlight">${formatNumber(Math.abs(daysRemaining))} days ago</span> on <span class="highlight date-val">${targetDate.toLocaleDateString(undefined, dateOptions)}</span>!`;
            } else {
                daysSpan.parentElement.innerHTML = `You will reach this milestone on <span class="highlight date-val">${targetDate.toLocaleDateString(undefined, dateOptions)}</span>! (Only <span class="highlight days-val">${formatNumber(daysRemaining)}</span> days left).`;
            }

            resultBox.classList.remove('hidden');
            
            if (daysRemaining >= 0) {
                triggerConfetti(0.15, { spread: 45, startVelocity: 25 });
            }
        });
    }

    // --- Helper Utilities ---
    function padZero(num) {
        return num.toString().padStart(2, '0');
    }

    function formatNumber(num) {
        return num.toLocaleString();
    }

    function formatCompact(num) {
        if (num >= 1e9) {
            return (num / 1e9).toFixed(2) + ' B';
        }
        if (num >= 1e6) {
            return (num / 1e6).toFixed(2) + ' M';
        }
        return num.toLocaleString();
    }

    function formatSimpleDate(dateStr) {
        const parts = dateStr.split('-');
        if (parts.length !== 3) return dateStr;
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    }

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function showFutureDateWarning() {
        if (tickerInterval) clearInterval(tickerInterval);
        alert('Active profile birthdate is in the future. Resetting portal.');
        showEmptyState();
    }

    function triggerConfetti(particleRatio, options) {
        try {
            if (typeof confetti === 'function') {
                confetti(Object.assign({
                    origin: { y: 0.75 },
                    colors: getConfettiColors(colorTheme)
                }, options, {
                    particleCount: Math.floor(80 * particleRatio)
                }));
            }
        } catch (e) {
            console.warn('Confetti lib not fully loaded or blocked.', e);
        }
    }

    function getConfettiColors(themeName) {
        if (themeName === 'rose') return ['#f43f5e', '#ec4899', '#fda4af'];
        if (themeName === 'emerald') return ['#10b981', '#06b6d4', '#6ee7b7'];
        if (themeName === 'amber') return ['#f59e0b', '#ef4444', '#fde047'];
        if (themeName === 'cyan') return ['#06b6d4', '#3b82f6', '#67e8f9'];
        return ['#6366f1', '#a855f7', '#c084fc']; // Indigo default
    }

    // Initialize application
    init();
});
