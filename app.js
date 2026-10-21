(function () {
  "use strict";

  var ORDER = window.STYLE_ORDER;
  var STYLES = window.STYLES;
  var PAIRS = window.PAIRS;
  var TEAM = window.TEAM;
  var MAX = 56;   // highest possible score for one style (14 questions x 4)
  var EVEN = 35;  // an even split (140 / 4)

  // Quadrant for each style on the map and the score shapes: x/y direction from the centre.
  var DIR = {
    kneebouncer: { x: -1, y: -1, pos: "tl" },
    barometer:   { x:  1, y: -1, pos: "tr" },
    doodler:     { x: -1, y:  1, pos: "bl" },
    listmaker:   { x:  1, y:  1, pos: "br" }
  };
  var QUAD_ORDER = ["kneebouncer", "barometer", "doodler", "listmaker"]; // reading order of the 2x2

  // ---------- helpers ----------
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function first(name) { return name.split(" ")[0]; }
  function initials(name) {
    var parts = name.split(" ");
    return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
  }
  function cv(id) { return "--c:" + STYLES[id].color + ";--on:" + STYLES[id].onColor + ";"; }
  function tint(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")";
  }
  function li(arr) { return arr.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join(""); }
  function styleLabel(p) {
    return p.tie ? p.tops.map(function (id) { return STYLES[id].name; }).join(" / ") + " (tie)" : STYLES[p.primary].name;
  }

  // ---------- people ----------
  var people = TEAM.people.map(function (p, i) {
    var max = Math.max.apply(null, p.scores);
    var tops = [];
    p.scores.forEach(function (v, k) { if (v === max) tops.push(ORDER[k]); });
    return { id: i, name: p.name, scores: p.scores, max: max, tops: tops, primary: tops[0], tie: tops.length > 1 };
  });
  function members(id) { return people.filter(function (p) { return p.tops.indexOf(id) !== -1; }); }
  var averages = ORDER.map(function (id, k) {
    return people.reduce(function (s, p) { return s + p.scores[k]; }, 0) / people.length;
  });

  // ---------- score shape (diamond radar) ----------
  // sets: [{ scores, stroke, fill, dash }]
  function diamond(sets, opts) {
    opts = opts || {};
    var R = 100, pad = 58, size = (R + pad) * 2;
    var ink = opts.dark ? "#F6F5E4" : "#231F20";
    function pt(id, v) {
      var d = DIR[id], r = v / MAX * R;
      return [d.x * r * Math.SQRT1_2, d.y * r * Math.SQRT1_2];
    }
    function poly(vals, attrs) {
      return '<polygon points="' + ORDER.map(function (id, k) { return pt(id, vals[k]).join(","); }).join(" ") + '" ' + attrs + "/>";
    }
    var svg = '<svg class="diamond" viewBox="' + (-size / 2) + " " + (-size / 2) + " " + size + " " + size + '" role="img" aria-label="' + esc(opts.label || "Score shape") + '">';
    // rings and axes
    svg += poly([MAX, MAX, MAX, MAX], 'fill="none" stroke="' + ink + '" stroke-opacity="0.25" stroke-width="1"');
    svg += poly([EVEN, EVEN, EVEN, EVEN], 'fill="none" stroke="' + ink + '" stroke-opacity="0.55" stroke-width="1.5" stroke-dasharray="4 4"');
    ORDER.forEach(function (id) {
      var e = pt(id, MAX);
      svg += '<line x1="0" y1="0" x2="' + e[0] + '" y2="' + e[1] + '" stroke="' + ink + '" stroke-opacity="0.25" stroke-width="1"/>';
    });
    // shapes
    sets.forEach(function (s) {
      svg += poly(s.scores, 'fill="' + (s.fill || "none") + '" stroke="' + s.stroke + '" stroke-width="3" stroke-linejoin="round"' + (s.dash ? ' stroke-dasharray="7 5"' : ""));
    });
    // vertex dots for the first set
    if (sets.length === 1) {
      ORDER.forEach(function (id, k) {
        var p = pt(id, sets[0].scores[k]);
        svg += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="6" fill="' + STYLES[id].color + '" stroke="' + (opts.dark ? "#10312B" : "#FFFFFF") + '" stroke-width="2"/>';
      });
    }
    // labels
    ORDER.forEach(function (id, k) {
      var d = DIR[id], e = pt(id, MAX + 7);
      var anchor = d.x < 0 ? "end" : "start";
      var y = e[1] + (d.y < 0 ? -6 : 14);
      var vals = sets.map(function (s) { return opts.decimals ? s.scores[k].toFixed(1) : s.scores[k]; }).join(" · ");
      svg += '<text x="' + e[0] + '" y="' + y + '" text-anchor="' + anchor + '">' + esc(STYLES[id].name) + "</text>";
      svg += '<text class="val" x="' + e[0] + '" y="' + (y + 15) + '" text-anchor="' + anchor + '" font-weight="300">' + vals + "</text>";
    });
    return svg + "</svg>";
  }

  // ---------- header + hero ----------
  document.title = "Communication Playbook · " + TEAM.client;
  $("clientLogo").innerHTML = TEAM.logo
    ? '<img src="' + esc(TEAM.logo) + '" alt="' + esc(TEAM.client) + '">'
    : '<span class="wordmark">' + esc(TEAM.client) + "</span>";
  $("heroClient").textContent = "Prepared for " + TEAM.client + " · " + TEAM.date;
  $("prepared").textContent = "Prepared for the " + TEAM.client + " team, " + TEAM.date + ". Individual results are for this team only; please don't share them outside it.";

  // ---------- style cards ----------
  $("styleCards").innerHTML = ORDER.map(function (id) {
    var s = STYLES[id];
    var m = members(id);
    var names = m.length ? m.map(function (p) { return esc(p.name) + (p.tie ? " (tie)" : ""); }).join(", ") : "No one leads with this style.";
    return '<div class="card" data-flipped="false" data-card="' + id + '" style="' + cv(id) + '">' +
      '<div class="card__inner">' +
        '<div class="card__face card__front">' +
          '<p class="card__team">' + m.length + " on your team</p>" +
          '<h3 class="card__name">' + esc(s.plural) + "</h3>" +
          '<p class="card__purpose">' + esc(s.purpose) + "</p>" +
          '<ul class="card__list">' + li(s.characteristics) + "</ul>" +
          '<button type="button" class="card__flip" aria-label="Flip the ' + esc(s.plural) + ' card: how to work with them">How to work with them</button>' +
        "</div>" +
        '<div class="card__face card__back" aria-hidden="true">' +
          '<h4>Working with ' + esc(s.plural) + "</h4>" +
          '<ul class="card__list">' + li(s.workingWith) + "</ul>" +
          '<p class="card__desc"><strong>On your team:</strong> ' + names + "</p>" +
          '<button type="button" class="card__flip" tabindex="-1" aria-label="Flip the ' + esc(s.plural) + ' card back">Back to the style</button>' +
        "</div>" +
      "</div></div>";
  }).join("");

  // ---------- map ----------
  $("mapQuads").innerHTML = QUAD_ORDER.map(function (id) {
    var s = STYLES[id];
    return '<div class="quad quad--' + DIR[id].pos + '" style="--t:' + tint(s.color, id === "doodler" ? 0.16 : 0.09) + ";--c:" + s.color + '">' +
      '<span class="quad__name"><i></i>' + esc(s.plural) + "</span></div>";
  }).join("");

  function layout() {
    var pts = [];
    ORDER.forEach(function (id) {
      var group = people.filter(function (p) { return p.primary === id && !p.tie; })
        .sort(function (a, b) { return b.max - a.max || a.name.localeCompare(b.name); });
      group.forEach(function (p, i) {
        var a = (18 + 54 * (i + 0.5) / group.length) * Math.PI / 180;
        var r = 0.25 + 0.65 * Math.min(1, Math.max(0, (p.max - EVEN) / 11));
        var d = DIR[id];
        pts.push({ p: p, x: 50 + d.x * r * 44 * Math.cos(a), y: 50 + d.y * r * 44 * Math.sin(a), d: d });
      });
    });
    people.filter(function (p) { return p.tie; }).forEach(function (p) {
      var sx = 0, sy = 0;
      p.tops.forEach(function (id) { sx += DIR[id].x; sy += DIR[id].y; });
      sx /= p.tops.length; sy /= p.tops.length;
      var r = 0.25 + 0.65 * Math.min(1, Math.max(0, (p.max - EVEN) / 11));
      pts.push({ p: p, x: 50 + sx * r * 44, y: 50 + sy * r * 44, d: null });
    });
    // push overlapping dots apart, keeping each inside its quadrant
    var MIN = 11;
    for (var it = 0; it < 120; it++) {
      for (var i = 0; i < pts.length; i++) {
        for (var j = i + 1; j < pts.length; j++) {
          var dx = pts[j].x - pts[i].x, dy = pts[j].y - pts[i].y;
          var dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
          if (dist < MIN) {
            var push = (MIN - dist) / 2, ux = dx / dist, uy = dy / dist;
            pts[i].x -= ux * push; pts[i].y -= uy * push;
            pts[j].x += ux * push; pts[j].y += uy * push;
          }
        }
      }
      pts.forEach(function (q) {
        if (q.d) {
          q.x = q.d.x < 0 ? Math.min(44, Math.max(7, q.x)) : Math.max(56, Math.min(93, q.x));
          q.y = q.d.y < 0 ? Math.min(44, Math.max(14, q.y)) : Math.max(56, Math.min(86, q.y));
        } else {
          q.x = Math.min(93, Math.max(7, q.x)); q.y = Math.min(86, Math.max(14, q.y));
        }
      });
    }
    return pts;
  }

  $("mapDots").innerHTML = layout().map(function (q) {
    var p = q.p;
    var c = STYLES[p.primary], c2 = STYLES[p.tops[p.tops.length - 1]];
    return '<button type="button" class="dot' + (p.tie ? " dot--tie" : "") + '" data-person="' + p.id + '" ' +
      'style="left:' + q.x.toFixed(2) + "%;top:" + q.y.toFixed(2) + "%;--c:" + c.color + ";--c2:" + c2.color + ";--on:" + c.onColor + '" ' +
      'aria-label="' + esc(p.name) + ", " + esc(styleLabel(p)) + '">' + initials(p.name) +
      '<span class="dot__name" aria-hidden="true">' + esc(p.name) + "</span></button>";
  }).join("");

  // ---------- filters ----------
  var state = { filter: "", selected: null, tab: "work", comparing: false, picks: [] };
  $("filters").innerHTML = '<button type="button" class="pill" data-filter="" aria-pressed="true">Everyone</button>' +
    ORDER.map(function (id) {
      return '<button type="button" class="pill" data-filter="' + id + '" aria-pressed="false" style="--c:' + STYLES[id].color + '"><i></i>' + esc(STYLES[id].plural) + "</button>";
    }).join("");

  function paintDots() {
    Array.prototype.forEach.call(document.querySelectorAll(".dot"), function (el) {
      var p = people[+el.getAttribute("data-person")];
      el.classList.toggle("is-dim", !!state.filter && p.tops.indexOf(state.filter) === -1);
      el.classList.toggle("is-sel", !state.comparing && state.selected === p.id);
      el.classList.toggle("is-a", state.comparing && state.picks[0] === p.id);
      el.classList.toggle("is-b", state.comparing && state.picks[1] === p.id);
      var tag = el.querySelector(".dot__tag");
      if (tag) tag.remove();
      var k = state.comparing ? state.picks.indexOf(p.id) : -1;
      if (k !== -1) el.insertAdjacentHTML("beforeend", '<span class="dot__tag" aria-hidden="true">' + (k ? "B" : "A") + "</span>");
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-filter]"), function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === state.filter));
    });
  }

  // ---------- side panel ----------
  function teamPanel() {
    return '<div class="panel__band" style="--c:#231F20;--on:#FFFFFF"><p class="label">The team</p><h3>' + people.length + " people</h3></div>" +
      '<div class="panel__body">' +
        "<p>Tap a dot on the map, or a name below, to see that person's profile and how to work with them.</p>" +
        '<div class="teamlist">' + ORDER.map(function (id) {
          var m = members(id).sort(function (a, b) { return b.max - a.max; });
          return '<div class="teamlist__row"><div class="teamlist__head" style="--c:' + STYLES[id].color + '"><i></i>' + esc(STYLES[id].plural) + " · " + m.length + "</div>" +
            '<div class="teamlist__names">' + (m.length ? m.map(function (p) {
              return '<button type="button" class="namechip" data-person="' + p.id + '">' + esc(p.name) + "</button>";
            }).join("") : '<span class="pairnote">No one yet</span>') + "</div></div>";
        }).join("") + "</div>" +
      "</div>";
  }

  function personPanel(p) {
    var tipsHtml = p.tops.map(function (id) {
      return (p.tie ? '<p class="label">As a ' + esc(STYLES[id].name) + "</p>" : "") + '<ul class="sparklist">' + li(STYLES[id].workingWith) + "</ul>";
    }).join("");
    var howHtml = p.tops.map(function (id) {
      return (p.tie ? '<p class="label">As a ' + esc(STYLES[id].name) + "</p>" : "") + '<ul class="sparklist">' + li(STYLES[id].characteristics) + "</ul>";
    }).join("");
    return '<div class="panel__band" style="' + cv(p.primary) + '">' +
        '<p class="label">' + esc(styleLabel(p)) + "</p><h3>" + esc(p.name) + "</h3>" +
        '<button type="button" class="panel__close" data-back aria-label="Back to the whole team">×</button></div>' +
      '<div class="panel__body">' +
        '<p class="panel__purpose">' + p.tops.map(function (id) { return esc(STYLES[id].purpose); }).join("<br>") + "</p>" +
        '<div class="panel__shape">' + diamond([{ scores: p.scores, stroke: "#231F20", fill: tint(STYLES[p.primary].color, 0.28) }], { label: p.name + "'s scores" }) + "</div>" +
        '<div><div class="tabs" role="tablist">' +
          '<button type="button" class="tab" role="tab" data-tab="work" aria-selected="' + (state.tab === "work") + '">Working with ' + esc(first(p.name)) + "</button>" +
          '<button type="button" class="tab" role="tab" data-tab="how" aria-selected="' + (state.tab === "how") + '">How they communicate</button>' +
        '</div><div style="padding-top:18px" role="tabpanel">' + (state.tab === "work" ? tipsHtml : howHtml) + "</div></div>" +
        '<div class="panel__actions"><button type="button" class="button" data-compare-from="' + p.id + '">Compare ' + esc(first(p.name)) + " with someone</button></div>" +
      "</div>";
  }

  function renderPanel() {
    $("panel").innerHTML = state.selected === null ? teamPanel() : personPanel(people[state.selected]);
    paintDots();
  }

  // ---------- compare mode ----------
  function setComparing(on, startWith) {
    state.comparing = on;
    state.picks = on && startWith !== undefined ? [startWith] : [];
    $("compareToggle").setAttribute("aria-pressed", String(on));
    $("compareToggle").textContent = on ? "Cancel compare" : "Compare two people";
    updateHint();
    paintDots();
  }
  function updateHint() {
    var h = $("compareHint");
    if (!state.comparing) { h.hidden = true; return; }
    h.hidden = false;
    h.textContent = state.picks.length === 0
      ? "Tap the first person on the map."
      : "Now tap someone to compare with " + first(people[state.picks[0]].name) + ".";
  }
  function pick(id) {
    if (state.picks.indexOf(id) !== -1) return;
    state.picks.push(id);
    if (state.picks.length === 2) {
      selA.value = String(state.picks[0]);
      selB.value = String(state.picks[1]);
      renderPair();
      setComparing(false);
      $("pairs").scrollIntoView();
      return;
    }
    updateHint();
    paintDots();
  }

  // ---------- pairs ----------
  var selA = $("pairA"), selB = $("pairB");
  var opts = people.slice().sort(function (a, b) { return a.name.localeCompare(b.name); })
    .map(function (p) { return '<option value="' + p.id + '">' + esc(p.name) + "</option>"; }).join("");
  selA.innerHTML = opts; selB.innerHTML = opts;
  (function defaultPair() {
    var strongest = people.slice().sort(function (a, b) { return b.max - a.max; });
    var a = strongest[0];
    var b = strongest.filter(function (p) { return p.primary !== a.primary; })[0] || strongest[1];
    selA.value = String(a.id); selB.value = String(b.id);
  })();

  function pairKey(a, b) { return ORDER.indexOf(a) <= ORDER.indexOf(b) ? a + "+" + b : b + "+" + a; }

  function renderPair() {
    var out = $("pairResult");
    if (selA.value === selB.value) { out.innerHTML = '<p class="pairnote">Choose two different people.</p>'; return; }
    var a = people[+selA.value], b = people[+selB.value];
    var pair = PAIRS[pairKey(a.primary, b.primary)];
    var same = a.primary === b.primary;
    var ca = STYLES[a.primary].color;
    var cb = same ? "#231F20" : STYLES[b.primary].color;

    var who = function (p, cls, key) {
      return '<div class="who ' + cls + '"><span class="who__style" style="' + cv(p.primary) + '">' + esc(styleLabel(p)) + "</span>" +
        '<span class="who__name">' + esc(p.name) + "</span>" +
        '<span class="who__key"><span class="' + key + '" style="--k:' + (cls === "who--a" ? ca : cb) + '"></span>' + (cls === "who--a" ? "Solid line" : "Dashed line") + "</span></div>";
    };
    var shape = diamond([
      { scores: a.scores, stroke: ca, fill: tint(ca, 0.18) },
      { scores: b.scores, stroke: cb, fill: "none", dash: true }
    ], { label: a.name + " and " + b.name + " scores compared" });

    var moves = same
      ? '<div class="moves"><div class="move" style="' + cv(a.primary) + '"><p class="label">For both of you</p><p>' + esc(pair.moves[a.primary]) + "</p></div></div>"
      : '<div class="moves moves--two">' +
          '<div class="move" style="' + cv(a.primary) + '"><p class="label">If you\'re ' + esc(first(a.name)) + "</p><p>" + esc(pair.moves[a.primary]) + "</p></div>" +
          '<div class="move" style="' + cv(b.primary) + '"><p class="label">If you\'re ' + esc(first(b.name)) + "</p><p>" + esc(pair.moves[b.primary]) + "</p></div>" +
        "</div>";

    var tied = [a, b].filter(function (p) { return p.tie; });
    var note = tied.length ? '<p class="pairnote">' + tied.map(function (p) {
      return esc(first(p.name)) + " is tied between " + p.tops.map(function (id) { return STYLES[id].name; }).join(" and ") + "; this comparison uses " + STYLES[p.primary].name + ".";
    }).join(" ") + "</p>" : "";

    out.innerHTML =
      '<div class="pairtop">' + who(a, "who--a", "key-solid") + '<div class="panel__shape">' + shape + "</div>" + who(b, "who--b", "key-dash") + "</div>" +
      '<div class="paircols">' +
        '<div class="pcard"><p class="label">Where you connect</p><p>' + esc(pair.connect) + "</p></div>" +
        '<div class="pcard"><p class="label">Where friction shows up</p><p>' + esc(pair.friction) + "</p></div>" +
      "</div>" + moves + note;
  }
  selA.addEventListener("change", renderPair);
  selB.addEventListener("change", renderPair);
  $("pairSwap").addEventListener("click", function () { var t = selA.value; selA.value = selB.value; selB.value = t; renderPair(); });
  $("pairpick").addEventListener("submit", function (e) { e.preventDefault(); });

  // ---------- pattern ----------
  var pat = TEAM.pattern;
  $("patternHeadline").textContent = pat.headline;
  $("teamShape").innerHTML = diamond([{ scores: averages, stroke: "#F6F5E4", fill: "rgba(246,245,228,0.16)" }], { dark: true, decimals: true, label: "Team average scores" });
  $("insights").innerHTML = pat.insights.map(function (it) {
    return '<div class="insight"><h3>' + esc(it.title) + "</h3><p>" + esc(it.body) + "</p></div>";
  }).join("");
  $("meetingTips").innerHTML = li(pat.meetingTips);
  $("questions").innerHTML = li(pat.questions);

  // ---------- events ----------
  document.addEventListener("click", function (e) {
    var t = e.target;
    var card = t.closest("[data-card]");
    if (card) {
      var on = card.getAttribute("data-flipped") !== "true";
      var front = card.querySelector(".card__front"), back = card.querySelector(".card__back");
      card.setAttribute("data-flipped", String(on));
      front.setAttribute("aria-hidden", String(on));
      back.setAttribute("aria-hidden", String(!on));
      front.querySelector(".card__flip").tabIndex = on ? -1 : 0;
      back.querySelector(".card__flip").tabIndex = on ? 0 : -1;
      if (t.closest(".card__flip")) (on ? back : front).querySelector(".card__flip").focus({ preventScroll: true });
      return;
    }
    var f = t.closest("[data-filter]");
    if (f) { state.filter = f.getAttribute("data-filter"); paintDots(); return; }
    var person = t.closest("[data-person]");
    if (person) {
      var id = +person.getAttribute("data-person");
      if (state.comparing && person.classList.contains("dot")) { pick(id); return; }
      state.selected = id; state.tab = "work"; renderPanel();
      if (person.classList.contains("namechip") && window.innerWidth < 980) $("mapBoard").scrollIntoView({ block: "center" });
      return;
    }
    if (t.closest("[data-back]")) { state.selected = null; renderPanel(); return; }
    var tab = t.closest("[data-tab]");
    if (tab) { state.tab = tab.getAttribute("data-tab"); renderPanel(); return; }
    var from = t.closest("[data-compare-from]");
    if (from) { setComparing(true, +from.getAttribute("data-compare-from")); $("mapBoard").scrollIntoView({ block: "center" }); return; }
  });
  $("compareToggle").addEventListener("click", function () { setComparing(!state.comparing); });

  $("copyEmail").addEventListener("click", function () {
    var btn = this, addr = $("ctaAddr").textContent;
    function done() { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1800); }
    function fallback() {
      var r = document.createRange(); r.selectNodeContents($("ctaAddr"));
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      btn.textContent = "Selected";
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(addr).then(done, fallback);
      else fallback();
    } catch (err) { fallback(); }
  });

  renderPanel();
  renderPair();
})();
