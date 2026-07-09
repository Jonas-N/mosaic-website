/**
 * MOSAIC member institutions world map (Leaflet).
 * Data: /assets/data/member-locations.json — city-level aggregates, no personal emails.
 */
(function () {
  "use strict";

  var el = document.getElementById("members-map");
  if (!el || typeof L === "undefined") return;

  var dataUrl = el.getAttribute("data-src");
  if (!dataUrl) return;

  var map = L.map(el, {
    scrollWheelZoom: false,
    worldCopyJump: true,
  }).setView([30, 0], 1.6);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
      '&copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 10,
    minZoom: 1,
  }).addTo(map);

  var colors = ["#ff8c1f", "#ff3c42", "#c4244f", "#830374", "#1f5fa8", "#0bd78f", "#1ad9c9"];

  function radiusFor(count, max) {
    var t = Math.sqrt(count / Math.max(max, 1));
    return 6 + t * 22;
  }

  fetch(dataUrl)
    .then(function (r) {
      if (!r.ok) throw new Error("Failed to load map data");
      return r.json();
    })
    .then(function (data) {
      var places = data.places || [];
      var max = 1;
      places.forEach(function (p) {
        if (p.count > max) max = p.count;
      });

      var bounds = [];
      places.forEach(function (p, i) {
        if (typeof p.lat !== "number" || typeof p.lon !== "number") return;
        var r = radiusFor(p.count, max);
        var color = colors[i % colors.length];
        var marker = L.circleMarker([p.lat, p.lon], {
          radius: r,
          color: color,
          weight: 2,
          fillColor: color,
          fillOpacity: 0.55,
        });

        var instHtml = (p.institutions || [])
          .map(function (inst) {
            return (
              "<li>" +
              escapeHtml(inst.name) +
              ' <span class="map-count">(' +
              inst.count +
              ")</span></li>"
            );
          })
          .join("");

        marker.bindPopup(
          '<div class="map-popup">' +
            "<strong>" +
            escapeHtml(p.city) +
            (p.country ? ", " + escapeHtml(p.country) : "") +
            "</strong>" +
            '<p class="map-popup-total">' +
            p.count +
            " member" +
            (p.count === 1 ? "" : "s") +
            "</p>" +
            (instHtml ? '<ul class="map-popup-inst">' + instHtml + "</ul>" : "") +
            "</div>"
        );

        marker.addTo(map);
        bounds.push([p.lat, p.lon]);
      });

      if (bounds.length) {
        map.fitBounds(bounds, { padding: [28, 28], maxZoom: 4 });
      }

      var meta = document.getElementById("members-map-meta");
      if (meta && data.member_count) {
        meta.textContent =
          "Based on " +
          data.member_count +
          " list members across " +
          data.place_count +
          " places (institutions inferred from the members list; approximate locations).";
      }
    })
    .catch(function () {
      el.innerHTML =
        '<p class="map-fallback">Map data could not be loaded.</p>';
    });

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
