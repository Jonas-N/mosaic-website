/**
 * MOSAIC member institutions world map (Leaflet).
 * Data: assets/data/member-locations.json — city-level aggregates, no personal emails.
 */
(function () {
  "use strict";

  function init() {
    var el = document.getElementById("members-map");
    if (!el || typeof L === "undefined") return;

    var dataUrl = el.getAttribute("data-src");
    if (!dataUrl) return;

    // Explicit size before Leaflet measures the container
    if (!el.style.height) {
      el.style.height = "420px";
    }

    var map = L.map(el, {
      scrollWheelZoom: false,
      worldCopyJump: true,
    }).setView([25, 10], 2);

    // OpenStreetMap tiles (widely available; no extra CDN dependency for basemap)
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 12,
      minZoom: 1,
    }).addTo(map);

    var colors = [
      "#ff8c1f",
      "#ff3c42",
      "#c4244f",
      "#830374",
      "#1f5fa8",
      "#0bd78f",
      "#1ad9c9",
    ];

    function radiusFor(count, max) {
      var t = Math.sqrt(count / Math.max(max, 1));
      return 7 + t * 24;
    }

    function refreshSize() {
      map.invalidateSize(true);
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
          var lat = Number(p.lat);
          var lon = Number(p.lon);
          if (!isFinite(lat) || !isFinite(lon)) return;

          var r = radiusFor(p.count, max);
          var color = colors[i % colors.length];
          var marker = L.circleMarker([lat, lon], {
            radius: r,
            color: "#fff",
            weight: 1.5,
            fillColor: color,
            fillOpacity: 0.75,
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
          bounds.push([lat, lon]);
        });

        if (bounds.length) {
          map.fitBounds(bounds, { padding: [36, 36], maxZoom: 4 });
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

        // Leaflet often needs a second measure after layout/tiles
        refreshSize();
        setTimeout(refreshSize, 100);
        setTimeout(refreshSize, 400);
        window.addEventListener("resize", refreshSize);
      })
      .catch(function () {
        el.innerHTML =
          '<p class="map-fallback">Map data could not be loaded.</p>';
      });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
