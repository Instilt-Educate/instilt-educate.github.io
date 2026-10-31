// World map of Instilt members and batches. One SVG renderer for both views:
// switching only swaps the markers, so the map never unmounts.
(function () {
    const stage = document.querySelector(".map-stage");
    const host = document.getElementById("map");
    const popover = document.createElement("div");
    popover.className = "map-popover";
    popover.hidden = true;
    stage.appendChild(popover);
    popover.addEventListener("pointerenter", () => clearTimeout(closeTimer));
    popover.addEventListener("pointerleave", () => { if (!pinned) hoverClose(); });

    const EASE = d3.easeExpOut;
    const MAX_ZOOM = 8;
    let view = null;
    let zoomK = 1;
    let openMarker = null;
    let pinned = false;
    let closeTimer = null;

    // Natural Earth, with Antarctica dropped so the world fills the frame.
    const topo = window.WORLD_TOPO;
    const countries = topojson.feature(topo, topo.objects.countries).features.filter(f => f.id !== "010");
    const projection = d3.geoNaturalEarth1();
    const path = d3.geoPath(projection);
    const land = { type: "FeatureCollection", features: countries };
    projection.fitSize([1000, 1000], land);
    const [[x0, y0], [x1, y1]] = path.bounds(land);
    const W = x1 - x0;
    const H = y1 - y0;

    stage.style.aspectRatio = `${W} / ${H}`;

    const svg = d3.select(host).append("svg")
        .attr("viewBox", `${x0} ${y0} ${W} ${H}`)
        .attr("role", "group")
        .attr("aria-label", "World map of Instilt locations");

    const world = svg.append("g");
    world.append("g").attr("class", "map-land")
        .selectAll("path").data(countries).join("path")
        .attr("d", path);

    const markerLayer = world.append("g").attr("class", "map-markers");

    // Both markers are a round head on a tapered tail, tip at the origin. The head has radius 1
    // and sits `reach` above the tip; the tail meets it along its tangents, so the outline is one
    // smooth curve. Members get a slim teardrop; batches a rounder badge that holds a schoolhouse.
    function markerPath(reach) {
        const run = Math.sqrt(reach * reach - 1);
        const tx = run / reach;
        const ty = -(run * run) / reach;
        return `M0,0L${-tx},${ty}A1,1 0 1 1 ${tx},${ty}Z`;
    }
    const MEMBER_REACH = 1.8;
    const BATCH_REACH = 1.4;
    const MEMBER_PATH = markerPath(MEMBER_REACH);
    const BATCH_PATH = markerPath(BATCH_REACH);
    // Mortarboard on a 24-unit grid, centred on (12,12): board, cap beneath it, and a tassel.
    const SCHOOL_ICON = "M12 4.5 23 10l-11 5.5L1 10zM6 12.6v4.4c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.4L12 15.9z";
    const SCHOOL_TASSEL = "M21.2 10.8v5.6";

    // Sized by the marker's own kind (only batches have students), so markers fading out
    // keep their size when the view has already changed.
    const headRadius = d => ("students" in d ? 7.5 + Math.sqrt(d.students || 1) * 0.2 : 5.4) / Math.pow(zoomK, 0.75);

    function place(d) {
        const [px, py] = projection([d.lng, d.lat]);
        return `translate(${px},${py})`;
    }

    // ---- markers -------------------------------------------------------
    function render(nextView, animate) {
        view = nextView;
        closePopover();
        const data = window.MAP_DATA[view];
        const t = d3.transition().duration(animate ? 500 : 0).ease(EASE);

        markerLayer.selectAll("g.marker")
            .data(data, d => view + d.name + d.lat + d.lng)
            .join(
                enter => {
                    const g = enter.append("g").attr("class", "marker")
                        .attr("transform", place)
                        .attr("tabindex", 0)
                        .attr("role", "button")
                        .attr("aria-label", d => d.students ? `${d.name}, ${d.students} students` : d.name);
                    // The hit area stays put while the visible body lifts on hover, so the
                    // lift can't move the marker out from under the pointer and flicker.
                    g.append("path").attr("class", "marker-hit")
                        .attr("d", view === "batches" ? BATCH_PATH : MEMBER_PATH);
                    const body = g.append("g").attr("class", "marker-body");
                    if (view === "batches") {
                        body.append("path").attr("class", "marker-pin").attr("d", BATCH_PATH);
                        const icon = body.append("g").attr("class", "marker-icon");
                        icon.append("path").attr("class", "marker-glyph").attr("d", SCHOOL_ICON);
                        icon.append("path").attr("class", "marker-tassel").attr("d", SCHOOL_TASSEL);
                    } else {
                        body.append("path").attr("class", "marker-pin").attr("d", MEMBER_PATH);
                        body.append("circle").attr("class", "marker-hole").attr("cy", -MEMBER_REACH).attr("r", 0.32);
                    }
                    g.style("opacity", 0).transition(t)
                        .delay((d, i) => (animate ? i * 6 : 0)).style("opacity", 1);
                    return g;
                },
                update => update,
                exit => exit.on(".marker", null).transition(d3.transition().duration(animate ? 220 : 0)).style("opacity", 0).remove()
            )
            .attr("data-view", view)
            .on("pointerenter.marker", (event, d) => { if (event.pointerType === "mouse") hoverOpen(event.currentTarget, d); })
            .on("pointerleave.marker", event => { if (event.pointerType === "mouse") hoverClose(); })
            .on("focus.marker", (event, d) => { if (view === "members") showPopover(event.currentTarget, d); })
            .on("blur.marker", () => { if (view === "members") closePopover(); })
            .on("click.marker", (event, d) => { if (view === "batches") pinPopover(event.currentTarget, d); })
            .on("keydown.marker", (event, d) => {
                if (view === "batches" && (event.key === "Enter" || event.key === " ")) {
                    event.preventDefault();
                    pinPopover(event.currentTarget, d);
                }
            });

        sizeMarkers();
        // largest batches first, so small markers stay clickable on top
        markerLayer.selectAll("g.marker").sort((a, b) => (b.students || 0) - (a.students || 0));
    }

    function sizeMarkers() {
        markerLayer.selectAll("g.marker").each(function (d) {
            const r = headRadius(d);
            const body = d3.select(this);
            body.select(".marker-pin").attr("transform", `scale(${r})`);
            d3.select(this).select(".marker-hit").attr("transform", `scale(${r * 1.2})`);
            body.select(".marker-hole").attr("transform", `scale(${r})`);
            // the glyph fills about 60% of the badge head
            const k = (r * 1.2) / 24;
            body.select(".marker-icon")
                .attr("transform", `translate(0,${-BATCH_REACH * r}) scale(${k}) translate(-12,-12)`);
        });
    }

    // ---- popover -------------------------------------------------------
    function showPopover(el, d) {
        openMarker = el;
        popover.className = "map-popover map-popover--" + view;
        popover.innerHTML = view === "batches"
            ? `<button type="button" class="map-popover__close" aria-label="Close">&times;</button>
               <h3>${d.name}</h3>
               ${d.students ? `<p class="map-popover__count">${d.students.toLocaleString()} students</p>` : ""}
               <div class="map-popover__body">${d.html}</div>`
            : `<span>${d.name}</span>`;
        popover.hidden = false;
        const close = popover.querySelector(".map-popover__close");
        if (close) close.addEventListener("click", () => { closePopover(); el.focus(); });
        positionPopover();
    }

    function closePopover() {
        clearTimeout(closeTimer);
        popover.hidden = true;
        openMarker = null;
        pinned = false;
    }

    // Hovering a batch opens its popover; moving onto the popover keeps it open.
    // Clicking pins it open until the next click elsewhere or Escape.
    function hoverOpen(el, d) {
        clearTimeout(closeTimer);
        if (pinned && openMarker !== el) return;
        if (openMarker !== el) showPopover(el, d);
    }

    function hoverClose() {
        if (view !== "batches" || pinned) { if (view === "members") closePopover(); return; }
        clearTimeout(closeTimer);
        closeTimer = setTimeout(closePopover, 180);
    }

    function pinPopover(el, d) {
        if (pinned && openMarker === el) { closePopover(); return; }
        showPopover(el, d);
        pinned = true;
    }

    function positionPopover() {
        if (!openMarker) return;
        const s = stage.getBoundingClientRect();
        const m = openMarker.getBoundingClientRect();
        const cx = m.left + m.width / 2 - s.left;
        const top = m.top - s.top;
        const pw = popover.offsetWidth;
        const ph = popover.offsetHeight;
        const left = Math.min(Math.max(cx - pw / 2, 8), s.width - pw - 8);
        const above = top - ph - 6 >= 8;
        popover.style.left = left + "px";
        popover.style.top = (above ? top - ph - 6 : Math.min(m.bottom - s.top + 6, s.height - ph - 8)) + "px";
    }

    document.addEventListener("keydown", e => { if (e.key === "Escape" && openMarker) { const el = openMarker; closePopover(); el.focus(); } });
    document.addEventListener("pointerdown", e => {
        if (view === "batches" && openMarker && !popover.contains(e.target) && !openMarker.contains(e.target)) closePopover();
    });

    // ---- pan & zoom ----------------------------------------------------
    // Wheel zooms only with ctrl/cmd, and touch pans only with two fingers,
    // so the map never traps page scrolling.
    const zoom = d3.zoom()
        .scaleExtent([1, MAX_ZOOM])
        .translateExtent([[x0, y0], [x1, y1]])
        .extent([[x0, y0], [x1, y1]])
        .filter(event => {
            if (event.type === "wheel") return event.ctrlKey || event.metaKey;
            if (event.type.startsWith("touch")) return event.touches.length > 1;
            return !event.button && !event.target.closest(".map-popover");
        })
        .on("zoom", event => {
            if (event.sourceEvent) setActiveRegion(event.transform.k === 1 ? "world" : null);
            world.attr("transform", event.transform);
            if (event.transform.k !== zoomK) { zoomK = event.transform.k; sizeMarkers(); }
            positionPopover();
        });
    svg.call(zoom).on("dblclick.zoom", null);

    // ---- regions -------------------------------------------------------
    // [west, south, east, north]. Listed most specific first: a click on land zooms to the
    // first region containing it.
    const REGIONS = [
        { id: "south-asia", label: "South Asia", box: [60, 5, 98, 38] },
        { id: "middle-east", label: "Middle East", box: [34, 12, 63, 42] },
        { id: "europe", label: "Europe", box: [-25, 34, 45, 72] },
        { id: "africa", label: "Africa", box: [-20, -36, 52, 38] },
        { id: "north-america", label: "North America", box: [-170, 7, -50, 75] },
        { id: "south-america", label: "South America", box: [-85, -56, -33, 13] },
        { id: "oceania", label: "Oceania", box: [110, -48, 180, 0] },
        { id: "east-asia", label: "East Asia", box: [95, -11, 150, 55] }
    ];

    function regionTransform(box) {
        const [west, south, east, north] = box;
        const corners = [[west, south], [east, south], [east, north], [west, north]].map(projection);
        const xs = corners.map(c => c[0]);
        const ys = corners.map(c => c[1]);
        const bw = Math.max(...xs) - Math.min(...xs);
        const bh = Math.max(...ys) - Math.min(...ys);
        const cx = (Math.max(...xs) + Math.min(...xs)) / 2;
        const cy = (Math.max(...ys) + Math.min(...ys)) / 2;
        const k = Math.max(1, Math.min(MAX_ZOOM, 0.9 * Math.min(W / bw, H / bh)));
        const t = d3.zoomIdentity.translate(x0 + W / 2 - k * cx, y0 + H / 2 - k * cy).scale(k);
        return zoom.constrain()(t, [[x0, y0], [x1, y1]], [[x0, y0], [x1, y1]]);
    }

    function zoomToRegion(id) {
        const region = REGIONS.find(r => r.id === id);
        const target = region ? regionTransform(region.box) : d3.zoomIdentity;
        setActiveRegion(region ? id : "world");
        closePopover();
        svg.transition().duration(750).ease(d3.easeCubicInOut).call(zoom.transform, target);
    }

    const regionBar = document.createElement("div");
    regionBar.className = "map-regions";
    regionBar.setAttribute("role", "group");
    regionBar.setAttribute("aria-label", "Zoom to region");
    regionBar.innerHTML = [{ id: "world", label: "World" }, ...REGIONS]
        .map(r => `<button type="button" data-region="${r.id}" aria-pressed="${r.id === "world"}">${r.label}</button>`).join("");
    stage.parentNode.insertBefore(regionBar, stage);
    regionBar.addEventListener("click", e => {
        const btn = e.target.closest("button");
        if (btn) zoomToRegion(btn.dataset.region);
    });

    function setActiveRegion(id) {
        regionBar.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.region === id)));
    }

    // Clicking land zooms to the region under the pointer (a drag doesn't count as a click).
    svg.select(".map-land").on("click", event => {
        const [lng, lat] = projection.invert(d3.pointer(event, world.node()));
        const hit = REGIONS.find(r => lng >= r.box[0] && lng <= r.box[2] && lat >= r.box[1] && lat <= r.box[3]);
        if (hit) zoomToRegion(hit.id);
    });

    const controls = document.createElement("div");
    controls.className = "map-zoom";
    controls.innerHTML = `
        <button type="button" data-zoom="in" aria-label="Zoom in">+</button>
        <button type="button" data-zoom="out" aria-label="Zoom out">&minus;</button>
        <button type="button" data-zoom="reset" aria-label="Reset map view">&#8634;</button>`;
    stage.appendChild(controls);
    controls.addEventListener("click", e => {
        const action = e.target.closest("button")?.dataset.zoom;
        if (!action) return;
        const t = svg.transition().duration(450).ease(EASE);
        if (action === "reset") zoomToRegion("world");
        else svg.transition(t).call(zoom.scaleBy, action === "in" ? 2 : 0.5);
    });

    window.addEventListener("resize", positionPopover);

    window.WorldMap = {
        setView(next) {
            if (next !== view) render(next, true);
        }
    };
    render("members", true);
})();
