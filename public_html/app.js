const UUID_LIMITS = {
  countMin: 1,
  countMax: 10000,
};

const ui = {
  reset: document.querySelector("#resetDefaults"),
  uuid: {
    output: document.querySelector("#uuidOutput"),
    outputWrap: document.querySelector("#uuidOutputWrap"),
    count: document.querySelector("#uuidCount"),
    refresh: document.querySelector("#uuidRefresh"),
    copy: document.querySelector("#uuidCopy"),
    status: document.querySelector("#uuidStatus"),
  },
};

const state = {
  messageTimers: new Map(),
  uuidList: [],
};

const STORAGE_KEY = "uuid-airat-top-settings-v1";

const DEFAULTS = {
  count: 1,
};

function setStatus(target, message) {
  const existing = state.messageTimers.get(target);
  if (existing) {
    clearTimeout(existing);
  }
  target.textContent = message;
  if (!message) {
    return;
  }
  const timer = setTimeout(() => {
    target.textContent = "";
  }, 2400);
  state.messageTimers.set(target, timer);
}

function copyText(text, statusNode, label) {
  if (!text) {
    return;
  }
  const message = label ? `${label} copied.` : "Copied to clipboard.";
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => setStatus(statusNode, message))
      .catch(() => setStatus(statusNode, "Copy failed."));
    return;
  }

  const fallback = document.createElement("textarea");
  fallback.value = text;
  fallback.setAttribute("readonly", "");
  fallback.style.position = "absolute";
  fallback.style.left = "-9999px";
  document.body.appendChild(fallback);
  fallback.select();
  try {
    document.execCommand("copy");
    setStatus(statusNode, message);
  } catch (err) {
    setStatus(statusNode, "Copy failed.");
  }
  document.body.removeChild(fallback);
}

function clampNumber(value, min, max) {
  if (Number.isNaN(value)) {
    return min;
  }
  return Math.min(Math.max(value, min), max);
}

function parseNumber(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function normalizeSettings(raw) {
  const safe = raw && typeof raw === "object" ? raw : {};
  return {
    count: clampNumber(parseNumber(safe.count, DEFAULTS.count), UUID_LIMITS.countMin, UUID_LIMITS.countMax),
  };
}

function getStoredSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return normalizeSettings(JSON.parse(raw));
  } catch (error) {
    return null;
  }
}

function setStoredSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    // Ignore storage errors (private mode, etc.)
  }
}

function getCurrentSettings() {
  return {
    count: clampNumber(
      parseNumber(ui.uuid.count.value, DEFAULTS.count),
      UUID_LIMITS.countMin,
      UUID_LIMITS.countMax
    ),
  };
}

function storeSettings() {
  setStoredSettings(getCurrentSettings());
}

function setUuidCount(value) {
  const parsed = parseInt(value, 10);
  const count = clampNumber(
    Number.isNaN(parsed) ? DEFAULTS.count : parsed,
    UUID_LIMITS.countMin,
    UUID_LIMITS.countMax
  );
  ui.uuid.count.value = `${count}`;
  return count;
}

function buildUuid() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
  return (
    `${hex[0]}${hex[1]}${hex[2]}${hex[3]}` +
    `-${hex[4]}${hex[5]}` +
    `-${hex[6]}${hex[7]}` +
    `-${hex[8]}${hex[9]}` +
    `-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`
  );
}

function buildUuidList(count) {
  const result = [];
  for (let i = 0; i < count; i += 1) {
    result.push(buildUuid());
  }
  return result;
}

function getUuidCopyText() {
  return state.uuidList.join("\n");
}

function refreshUuid() {
  const count = setUuidCount(ui.uuid.count.value);
  const next = buildUuidList(count);
  state.uuidList = next;
  ui.uuid.output.textContent = next.join("\n");
  ui.uuid.output.classList.toggle("is-single", count === 1);
}

function applySettings(settings) {
  const normalized = normalizeSettings(settings || DEFAULTS);
  setUuidCount(normalized.count);
}

function resetDefaults() {
  applySettings(DEFAULTS);
  refreshUuid();
  storeSettings();
}

function bindEvents() {
  if (ui.reset) {
    ui.reset.addEventListener("click", resetDefaults);
  }

  ui.uuid.refresh.addEventListener("click", () => {
    refreshUuid();
    storeSettings();
  });

  ui.uuid.copy.addEventListener("click", () => {
    copyText(getUuidCopyText(), ui.uuid.status, state.uuidList.length > 1 ? "UUID list" : "UUID");
  });

  ui.uuid.outputWrap.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
      return;
    }
    copyText(getUuidCopyText(), ui.uuid.status, state.uuidList.length > 1 ? "UUID list" : "UUID");
  });

  ui.uuid.count.addEventListener("input", () => {
    refreshUuid();
    storeSettings();
  });
}

const storedSettings = getStoredSettings();
applySettings(storedSettings || DEFAULTS);
bindEvents();
refreshUuid();
