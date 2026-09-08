function analyzeEmail() {

    const subject =
        document.getElementById("subject").value.toLowerCase();

    const body =
        document.getElementById("emailBody").value.toLowerCase();

    if (!subject && !body) {
        alert("Please enter an email subject or body.");
        return;
    }

    const text = subject + " " + body;

    // Suspicious indicators
    const dangerWords = [
        "password",
        "verify your account",
        "urgent",
        "click here",
        "winner",
        "prize",
        "bank account",
        "otp",
        "login",
        "confirm your account",
        "suspended",
        "free money"
    ];

    const safeWords = [
        "meeting",
        "project",
        "thank you",
        "assignment",
        "schedule",
        "team",
        "college",
        "report",
        "discussion",
        "presentation"
    ];

    let dangerCount = 0;
    let safeCount = 0;

    dangerWords.forEach(word => {
        if (text.includes(word)) {
            dangerCount++;
        }
    });

    safeWords.forEach(word => {
        if (text.includes(word)) {
            safeCount++;
        }
    });

    const hasLink =
        text.includes("http://") ||
        text.includes("https://") ||
        text.includes("www.");

    if (hasLink) {
        dangerCount++;
    }

    let risk;

    if (dangerCount >= 3) {
        risk = 80 + Math.floor(Math.random() * 16);
    }

    else if (dangerCount === 2) {
        risk = 60 + Math.floor(Math.random() * 16);
    }

    else if (dangerCount === 1) {
        risk = 35 + Math.floor(Math.random() * 20);
    }

    else if (safeCount > 0) {
        risk = 5 + Math.floor(Math.random() * 20);
    }

    else {
        risk = 45 + Math.floor(Math.random() * 11);
    }


    let safe;
    let neutral;
    let dangerous;

    if (risk >= 70) {

        dangerous = risk;
        safe = Math.floor(Math.random() * 10) + 2;
        neutral = 100 - dangerous - safe;

        showDanger(
            risk,
            safe,
            neutral,
            dangerous
        );

    }

    else if (risk <= 30) {

        safe = 100 - risk;
        neutral = Math.floor(risk * .6);
        dangerous = 100 - safe - neutral;

        showSafe(
            risk,
            safe,
            neutral,
            dangerous
        );

    }

    else {

        neutral = 50 + Math.floor(Math.random() * 6);
        dangerous = Math.floor((100 - neutral) * .6);
        safe = 100 - neutral - dangerous;

        showNeutral(
            risk,
            safe,
            neutral,
            dangerous
        );
    }


    updateSignals(
        dangerCount,
        hasLink,
        text
    );
}


/* SAFE */

function showSafe(
    risk,
    safe,
    neutral,
    dangerous
) {

    setStatus(
        "SAFE",
        "safe",
        "Safe Email",
        "The email appears to contain normal communication patterns with low-risk signals."
    );

    setPercentages(
        safe,
        neutral,
        dangerous,
        safe
    );

    activateLight("green");
}


/* NEUTRAL */

function showNeutral(
    risk,
    safe,
    neutral,
    dangerous
) {

    setStatus(
        "NEUTRAL",
        "neutral",
        "Needs Attention",
        "The email contains mixed signals. Review the sender and message content before taking action."
    );

    setPercentages(
        safe,
        neutral,
        dangerous,
        neutral
    );

    activateLight("yellow");
}


/* DANGER */

function showDanger(
    risk,
    safe,
    neutral,
    dangerous
) {

    setStatus(
        "DANGEROUS",
        "danger",
        "Potentially Dangerous Email",
        "Multiple suspicious indicators were detected. Avoid clicking unknown links or sharing sensitive information."
    );

    setPercentages(
        safe,
        neutral,
        dangerous,
        dangerous
    );

    activateLight("red");
}


/* STATUS */

function setStatus(
    badge,
    type,
    title,
    text
) {

    const badgeElement =
        document.getElementById("resultBadge");

    badgeElement.textContent = badge;

    badgeElement.className =
        "result-badge " + type;

    document.getElementById("resultTitle")
        .textContent = title;

    document.getElementById("resultText")
        .textContent = text;
}


/* PERCENTAGES */

function setPercentages(
    safe,
    neutral,
    dangerous,
    confidence
) {

    document.getElementById("safePercent")
        .textContent = safe + "%";

    document.getElementById("neutralPercent")
        .textContent = neutral + "%";

    document.getElementById("dangerPercent")
        .textContent = dangerous + "%";

    document.getElementById("confidence")
        .textContent = confidence + "%";

    document.getElementById("mlBar")
        .style.width = confidence + "%";

    document.getElementById("riskScore")
        .textContent = dangerous + "%";
}


/* LIGHT */

function activateLight(type) {

    const lights =
        document.querySelectorAll(".light");

    lights.forEach(light =>
        light.classList.remove("active")
    );

    document
        .getElementById(
            "light" +
            type.charAt(0).toUpperCase() +
            type.slice(1)
        )
        .classList.add("active");
}


/* SIGNALS */

function updateSignals(
    dangerCount,
    hasLink,
    text
) {

    const signals =
        document.querySelectorAll(".signal strong");

    signals[0].textContent =
        text.includes("re:") ||
        text.includes("reply") ||
        text.includes("fwd:")
            ? "Existing Thread"
            : "New Thread";

    signals[1].textContent =
        hasLink
            ? "Review Link"
            : "No Link";

    signals[2].textContent =
        text.includes("urgent") ||
        text.includes("immediately") ||
        text.includes("asap")
            ? "Detected"
            : "Normal";

    signals[3].textContent =
        dangerCount > 0
            ? dangerCount + " Found"
            : "None";
}


/* DEMO SAFE */

function loadSafe() {

    document.getElementById("subject").value =
        "Project Meeting Schedule";

    document.getElementById("emailBody").value =
        "Hello team, thank you for your work. " +
        "Our project meeting is scheduled for tomorrow. " +
        "Please review the report before the presentation.";
}


/* DEMO DANGER */

function loadDanger() {

    document.getElementById("subject").value =
        "URGENT: Verify your account";

    document.getElementById("emailBody").value =
        "Your account has been suspended. " +
        "Please click here and verify your password immediately " +
        "to confirm your account. http://example.com";
}
