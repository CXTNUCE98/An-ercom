<!doctype html>
<html lang="vi">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>ANTHE — Phụ kiện dành cho người đàn ông từng trải</title>
    <style>
        :root {
            --bg: oklch(15% 0.008 60);
            --bg-2: oklch(18% 0.009 60);
            --surface: oklch(21% 0.010 60);
            --surface-2: oklch(25% 0.012 60);
            --fg: oklch(93% 0.008 75);
            --muted: oklch(66% 0.012 75);
            --faint: oklch(50% 0.010 70);
            --border: oklch(32% 0.010 60);
            --border-soft: oklch(27% 0.008 60);
            --accent: oklch(74% 0.095 78);
            --accent-dim: oklch(60% 0.075 78);
            --font-display: 'Iowan Old Style', 'Charter', Georgia, 'Times New Roman', serif;
            --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            --font-mono: ui-monospace, 'SF Mono', Menlo, monospace;
            --rail-w: 184px;
            --maxw: 1280px;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0
        }

        html {
            scroll-behavior: smooth
        }

        body {
            background: var(--bg);
            color: var(--fg);
            font: 16px/1.6 var(--font-sans);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overflow-x: hidden;
        }

        a {
            color: inherit;
            text-decoration: none
        }

        img,
        svg {
            display: block
        }

        ::selection {
            background: var(--accent);
            color: var(--bg)
        }

        .wrap {
            max-width: var(--maxw);
            margin: 0 auto;
            padding: 0 28px
        }

        .kicker {
            font: 600 11px/1 var(--font-sans);
            letter-spacing: .28em;
            text-transform: uppercase;
            color: var(--faint)
        }

        .serif {
            font-family: var(--font-display)
        }

        /* ---------- top strip: tagline ---------- */
        .tagstrip {
            border-bottom: 1px solid var(--border-soft);
            background: var(--bg-2);
            text-align: center;
            padding: 9px 20px;
        }

        .tagstrip p {
            font-family: var(--font-display);
            font-size: 14px;
            font-style: italic;
            color: var(--muted);
            letter-spacing: .01em;
            max-width: 900px;
            margin: 0 auto;
        }

        /* ---------- header ---------- */
        header.top {
            position: sticky;
            top: 0;
            z-index: 60;
            background: color-mix(in oklab, var(--bg) 86%, transparent);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            border-bottom: 1px solid var(--border-soft);
        }

        .top .row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 64px
        }

        .brand {
            font-family: var(--font-display);
            font-weight: 700;
            font-size: 24px;
            letter-spacing: .34em;
            padding-left: .34em
        }

        .brand b {
            color: var(--accent);
            font-weight: 700
        }

        .top nav {
            display: flex;
            gap: 30px;
            align-items: center
        }

        .top nav a {
            font: 600 12px/1 var(--font-sans);
            letter-spacing: .16em;
            text-transform: uppercase;
            color: var(--muted);
            transition: color .18s
        }

        .top nav a:hover {
            color: var(--fg)
        }

        .cart-btn {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            border: 1px solid var(--border);
            background: transparent;
            color: var(--fg);
            padding: 9px 16px;
            border-radius: 2px;
            cursor: pointer;
            font: 600 11px/1 var(--font-sans);
            letter-spacing: .16em;
            text-transform: uppercase;
            transition: border-color .18s;
        }

        .cart-btn:hover {
            border-color: var(--accent)
        }

        .cart-btn .count {
            background: var(--accent);
            color: var(--bg);
            border-radius: 999px;
            min-width: 19px;
            height: 19px;
            display: grid;
            place-items: center;
            font-size: 11px;
            font-weight: 700;
            padding: 0 5px
        }

        .top nav .menu-links {
            display: flex;
            gap: 30px
        }

        /* ---------- hero ---------- */
        .hero {
            position: relative;
            min-height: clamp(460px, 78vh, 760px);
            display: flex;
            align-items: flex-end;
            overflow: hidden;
            border-bottom: 1px solid var(--border-soft);
        }

        .hero .bg {
            position: absolute;
            inset: 0;
            background:
                radial-gradient(120% 90% at 78% 12%, oklch(30% 0.02 70) 0%, transparent 55%),
                linear-gradient(180deg, oklch(19% 0.01 60) 0%, oklch(13% 0.008 60) 100%);
        }

        .hero .bg::after {
            content: "";
            position: absolute;
            inset: 0;
            opacity: .35;
            background-image: repeating-linear-gradient(115deg, transparent 0 22px, oklch(100% 0 0 / .012) 22px 23px);
        }

        .hero .plate {
            position: absolute;
            right: 6%;
            top: 50%;
            transform: translateY(-50%);
            width: min(38vw, 440px);
            aspect-ratio: 4/5;
            border: 1px solid var(--border);
            background: linear-gradient(145deg, var(--surface-2), var(--surface));
            display: grid;
            place-items: center;
            box-shadow: 0 40px 90px oklch(0% 0 0 / .5);
        }

        .hero .plate .ico {
            width: 96px;
            height: 96px;
            color: var(--accent-dim);
            opacity: .8
        }

        .hero .plate .plabel {
            position: absolute;
            bottom: 16px;
            left: 0;
            right: 0;
            text-align: center;
            font: 600 10px/1 var(--font-mono);
            letter-spacing: .22em;
            color: var(--faint)
        }

        .hero-inner {
            position: relative;
            padding-bottom: 64px;
            max-width: 720px
        }

        .hero .eyebrow {
            color: var(--accent);
            margin-bottom: 22px
        }

        .hero h1 {
            font-family: var(--font-display);
            font-weight: 700;
            font-size: clamp(38px, 6vw, 72px);
            line-height: 1.02;
            letter-spacing: -.01em;
            text-wrap: balance;
        }

        .hero .sub {
            margin-top: 20px;
            color: var(--muted);
            font-size: 17px;
            max-width: 440px
        }

        .hero .cta {
            margin-top: 34px;
            display: flex;
            gap: 14px;
            flex-wrap: wrap
        }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 15px 28px;
            border-radius: 2px;
            cursor: pointer;
            font: 600 12px/1 var(--font-sans);
            letter-spacing: .16em;
            text-transform: uppercase;
            border: 1px solid transparent;
            transition: .18s;
        }

        .btn.solid {
            background: var(--accent);
            color: var(--bg)
        }

        .btn.solid:hover {
            background: var(--fg)
        }

        .btn.ghost {
            border-color: var(--border);
            color: var(--fg)
        }

        .btn.ghost:hover {
            border-color: var(--accent);
            color: var(--accent)
        }

        /* ---------- layout w/ rail ---------- */
        .catalog {
            display: flex;
            gap: 0;
            align-items: flex-start;
            max-width: var(--maxw);
            margin: 0 auto;
            padding: 0 28px
        }

        .rail {
            position: sticky;
            top: 64px;
            flex: 0 0 var(--rail-w);
            width: var(--rail-w);
            align-self: flex-start;
            padding: 48px 0;
            height: calc(100vh - 64px);
        }

        .rail .rlabel {
            color: var(--faint);
            margin-bottom: 22px;
            padding-left: 2px
        }

        .rail ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 2px
        }

        .rail a {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 11px 12px 11px 14px;
            border-left: 2px solid transparent;
            color: var(--muted);
            font: 600 13px/1 var(--font-sans);
            letter-spacing: .04em;
            transition: .18s;
            position: relative;
        }

        .rail a .ic {
            width: 18px;
            height: 18px;
            flex: 0 0 18px;
            opacity: .65;
            transition: .18s
        }

        .rail a .num {
            margin-left: auto;
            font: 500 11px/1 var(--font-mono);
            color: var(--faint)
        }

        .rail a:hover {
            color: var(--fg)
        }

        .rail a:hover .ic {
            opacity: 1
        }

        .rail a.active {
            color: var(--fg);
            border-left-color: var(--accent);
            background: linear-gradient(90deg, color-mix(in oklab, var(--accent) 10%, transparent), transparent)
        }

        .rail a.active .ic {
            color: var(--accent);
            opacity: 1
        }

        .sections {
            flex: 1 1 auto;
            min-width: 0;
            padding: 48px 0 30px 46px
        }

        /* ---------- category section ---------- */
        .cat {
            padding: 22px 0 60px;
            scroll-margin-top: 76px
        }

        .cat:not(:last-child) {
            border-bottom: 1px solid var(--border-soft)
        }

        .cat-head {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
            margin-bottom: 24px
        }

        .cat-head h2 {
            font-family: var(--font-display);
            font-weight: 700;
            font-size: clamp(28px, 3.4vw, 40px);
            letter-spacing: -.01em;
            display: flex;
            align-items: center;
            gap: 16px
        }

        .cat-head h2 .cico {
            width: 30px;
            height: 30px;
            color: var(--accent)
        }

        .cat-head .meta {
            color: var(--faint);
            font: 500 12px/1 var(--font-mono);
            letter-spacing: .08em
        }

        .filters {
            display: flex;
            gap: 8px;
            flex-wrap: wrap
        }

        .chip {
            border: 1px solid var(--border);
            background: transparent;
            color: var(--muted);
            cursor: pointer;
            padding: 9px 16px;
            border-radius: 2px;
            font: 600 11px/1 var(--font-sans);
            letter-spacing: .13em;
            text-transform: uppercase;
            transition: .16s;
        }

        .chip:hover {
            color: var(--fg);
            border-color: var(--faint)
        }

        .chip.on {
            background: var(--fg);
            color: var(--bg);
            border-color: var(--fg)
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px
        }

        /* ---------- product card ---------- */
        .card {
            cursor: pointer;
            background: var(--surface);
            border: 1px solid var(--border-soft);
            border-radius: 3px;
            overflow: hidden;
            transition: .2s;
            position: relative
        }

        .card:hover {
            border-color: var(--accent);
            transform: translateY(-3px)
        }

        .card .ph {
            aspect-ratio: 1/1;
            position: relative;
            display: grid;
            place-items: center;
            background: linear-gradient(150deg, var(--surface-2), var(--bg-2));
        }

        .card .ph::after {
            content: "";
            position: absolute;
            inset: 0;
            opacity: .4;
            background-image: repeating-linear-gradient(125deg, transparent 0 18px, oklch(100% 0 0 / .015) 18px 19px)
        }

        .card .ph .ico {
            width: 56px;
            height: 56px;
            color: var(--faint);
            opacity: .7;
            transition: .2s
        }

        .card:hover .ph .ico {
            color: var(--accent-dim);
            opacity: .9
        }

        .card .ph .tag {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 2;
            font: 600 9px/1 var(--font-mono);
            letter-spacing: .14em;
            text-transform: uppercase;
            padding: 5px 8px;
            border-radius: 2px;
            border: 1px solid var(--border)
        }

        .card .ph .phnote {
            position: absolute;
            bottom: 9px;
            right: 10px;
            font: 500 9px/1 var(--font-mono);
            letter-spacing: .14em;
            color: var(--faint);
            z-index: 2
        }

        .tier-binhdan {
            color: var(--muted)
        }

        .tier-trungbinh {
            color: oklch(78% 0.09 200)
        }

        .tier-luxury {
            color: var(--accent);
            border-color: var(--accent-dim) !important
        }

        .card .body {
            padding: 15px 16px 17px
        }

        .card .cline {
            font: 500 10px/1 var(--font-mono);
            letter-spacing: .12em;
            text-transform: uppercase;
            color: var(--faint);
            margin-bottom: 7px
        }

        .card .name {
            font-family: var(--font-display);
            font-size: 17px;
            font-weight: 600;
            line-height: 1.25;
            margin-bottom: 10px
        }

        .card .price {
            font: 600 15px/1 var(--font-sans);
            color: var(--fg)
        }

        .card .price .cur {
            color: var(--accent);
            font-size: 12px;
            margin-left: 1px
        }

        .empty {
            grid-column: 1/-1;
            padding: 44px;
            text-align: center;
            color: var(--faint);
            border: 1px dashed var(--border);
            border-radius: 3px;
            font-size: 14px
        }

        /* ---------- footer ---------- */
        footer {
            border-top: 1px solid var(--border);
            background: var(--bg-2);
            margin-top: 20px
        }

        .foot {
            display: grid;
            grid-template-columns: 1.6fr 1fr 1fr 1fr;
            gap: 40px;
            padding: 64px 0 40px
        }

        .foot .brand {
            font-size: 22px;
            margin-bottom: 16px
        }

        .foot p.mission {
            color: var(--muted);
            font-family: var(--font-display);
            font-style: italic;
            font-size: 15px;
            max-width: 340px
        }

        .foot h4 {
            font: 600 11px/1 var(--font-sans);
            letter-spacing: .2em;
            text-transform: uppercase;
            color: var(--faint);
            margin-bottom: 18px
        }

        .foot ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 11px
        }

        .foot a {
            color: var(--muted);
            font-size: 14px;
            transition: .16s
        }

        .foot a:hover {
            color: var(--accent)
        }

        .foot .contact li {
            color: var(--muted);
            font-size: 14px
        }

        .foot-bar {
            border-top: 1px solid var(--border-soft);
            padding: 20px 0;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 10px;
            font: 500 11px/1 var(--font-mono);
            letter-spacing: .08em;
            color: var(--faint)
        }

        /* ---------- detail view (takeover) ---------- */
        .detail {
            display: none
        }

        body.viewing-detail .catalog,
        body.viewing-detail .hero,
        body.viewing-detail .tagstrip {
            display: none
        }

        body.viewing-detail .detail {
            display: block
        }

        .dback {
            border-bottom: 1px solid var(--border-soft);
            background: var(--bg-2)
        }

        .dback .wrap {
            display: flex;
            align-items: center;
            height: 52px
        }

        .dback button {
            background: none;
            border: none;
            color: var(--muted);
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 9px;
            font: 600 11px/1 var(--font-sans);
            letter-spacing: .16em;
            text-transform: uppercase;
            transition: color .16s
        }

        .dback button:hover {
            color: var(--accent)
        }

        .dtop {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 56px;
            padding: 56px 0
        }

        .gallery .main {
            aspect-ratio: 1/1;
            border: 1px solid var(--border);
            background: linear-gradient(150deg, var(--surface-2), var(--bg-2));
            display: grid;
            place-items: center;
            position: relative
        }

        .gallery .main .ico {
            width: 120px;
            height: 120px;
            color: var(--accent-dim);
            opacity: .75
        }

        .gallery .main .phnote {
            position: absolute;
            bottom: 14px;
            right: 16px;
            font: 500 10px/1 var(--font-mono);
            letter-spacing: .16em;
            color: var(--faint)
        }

        .gallery .thumbs {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin-top: 12px
        }

        .gallery .thumbs div {
            aspect-ratio: 1/1;
            border: 1px solid var(--border-soft);
            background: var(--surface);
            display: grid;
            place-items: center
        }

        .gallery .thumbs div .ico {
            width: 26px;
            height: 26px;
            color: var(--faint);
            opacity: .6
        }

        .dinfo .dcat {
            color: var(--faint)
        }

        .dinfo h1 {
            font-family: var(--font-display);
            font-weight: 700;
            font-size: clamp(30px, 4vw, 46px);
            line-height: 1.06;
            margin: 14px 0 8px
        }

        .dinfo .dtier {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font: 600 10px/1 var(--font-mono);
            letter-spacing: .16em;
            text-transform: uppercase;
            padding: 6px 11px;
            border: 1px solid var(--border);
            border-radius: 2px;
            margin-bottom: 22px
        }

        .dinfo .dprice {
            font-family: var(--font-display);
            font-size: 34px;
            font-weight: 700;
            color: var(--fg);
            margin-bottom: 26px
        }

        .dinfo .dprice .cur {
            color: var(--accent);
            font-size: 20px
        }

        .specs {
            display: flex;
            flex-wrap: wrap;
            gap: 9px;
            margin-bottom: 30px
        }

        .specs span {
            border: 1px solid var(--border-soft);
            border-radius: 2px;
            padding: 8px 13px;
            font-size: 12px;
            color: var(--muted);
            background: var(--surface)
        }

        .buybar {
            display: flex;
            gap: 14px;
            align-items: stretch;
            flex-wrap: wrap
        }

        .qty {
            display: inline-flex;
            align-items: center;
            border: 1px solid var(--border);
            border-radius: 2px
        }

        .qty button {
            width: 44px;
            height: 52px;
            background: none;
            border: none;
            color: var(--fg);
            font-size: 20px;
            cursor: pointer
        }

        .qty button:hover {
            color: var(--accent)
        }

        .qty span {
            min-width: 40px;
            text-align: center;
            font-weight: 600
        }

        .buybar .btn.solid {
            flex: 1;
            min-width: 200px;
            justify-content: center;
            padding: 0 30px
        }

        .dsection {
            padding: 52px 0;
            border-top: 1px solid var(--border-soft)
        }

        .dsection h3 {
            font-family: var(--font-display);
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 6px;
            display: flex;
            align-items: center;
            gap: 12px
        }

        .dsection h3 .fl {
            color: var(--accent)
        }

        .dsection .dsub {
            color: var(--muted);
            font-size: 14px;
            margin-bottom: 26px
        }

        .combo-wrap {
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 28px;
            align-items: start
        }

        .combo-list {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 18px
        }

        .combo-buy {
            border: 1px solid var(--accent-dim);
            border-radius: 3px;
            padding: 24px;
            background: linear-gradient(160deg, color-mix(in oklab, var(--accent) 8%, var(--surface)), var(--surface))
        }

        .combo-buy .lbl {
            color: var(--accent);
            margin-bottom: 14px
        }

        .combo-buy .old {
            color: var(--faint);
            text-decoration: line-through;
            font-size: 14px
        }

        .combo-buy .new {
            font-family: var(--font-display);
            font-size: 30px;
            font-weight: 700;
            margin: 4px 0 3px
        }

        .combo-buy .save {
            font: 600 11px/1 var(--font-mono);
            letter-spacing: .1em;
            color: oklch(72% 0.11 150);
            margin-bottom: 20px
        }

        .related-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px
        }

        /* ---------- cart drawer ---------- */
        .scrim {
            position: fixed;
            inset: 0;
            background: oklch(0% 0 0 / .55);
            opacity: 0;
            visibility: hidden;
            transition: .25s;
            z-index: 90
        }

        .scrim.open {
            opacity: 1;
            visibility: visible
        }

        .drawer {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: min(400px, 92vw);
            background: var(--bg-2);
            border-left: 1px solid var(--border);
            transform: translateX(100%);
            transition: transform .3s cubic-bezier(.4, 0, .2, 1);
            z-index: 95;
            display: flex;
            flex-direction: column
        }

        .drawer.open {
            transform: translateX(0)
        }

        .drawer .dh {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 22px 24px;
            border-bottom: 1px solid var(--border-soft)
        }

        .drawer .dh h3 {
            font-family: var(--font-display);
            font-size: 20px
        }

        .drawer .dh button {
            background: none;
            border: none;
            color: var(--muted);
            font-size: 24px;
            cursor: pointer;
            line-height: 1
        }

        .drawer .dh button:hover {
            color: var(--fg)
        }

        .drawer .items {
            flex: 1;
            overflow-y: auto;
            padding: 8px 24px
        }

        .drawer .items .ci {
            display: flex;
            gap: 14px;
            padding: 16px 0;
            border-bottom: 1px solid var(--border-soft)
        }

        .drawer .items .ci .thumb {
            width: 56px;
            height: 56px;
            flex: 0 0 56px;
            background: var(--surface-2);
            border: 1px solid var(--border-soft);
            display: grid;
            place-items: center
        }

        .drawer .items .ci .thumb .ico {
            width: 24px;
            height: 24px;
            color: var(--faint)
        }

        .drawer .items .ci .nm {
            font-family: var(--font-display);
            font-size: 15px;
            font-weight: 600
        }

        .drawer .items .ci .mt {
            font: 500 11px/1 var(--font-mono);
            color: var(--faint);
            margin-top: 5px
        }

        .drawer .items .ci .pr {
            margin-left: auto;
            font-weight: 600;
            font-size: 14px;
            white-space: nowrap
        }

        .drawer .empty-cart {
            text-align: center;
            color: var(--faint);
            padding: 70px 20px;
            font-size: 14px
        }

        .drawer .foot {
            padding: 22px 24px;
            border-top: 1px solid var(--border)
        }

        .drawer .foot .tot {
            display: flex;
            justify-content: space-between;
            margin-bottom: 16px;
            font-weight: 600
        }

        .drawer .foot .tot .amt {
            font-family: var(--font-display);
            font-size: 22px;
            color: var(--accent)
        }

        .drawer .foot .btn.solid {
            width: 100%;
            justify-content: center
        }

        .toast {
            position: fixed;
            bottom: 28px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: var(--fg);
            color: var(--bg);
            padding: 14px 24px;
            border-radius: 3px;
            font: 600 13px/1 var(--font-sans);
            letter-spacing: .03em;
            opacity: 0;
            visibility: hidden;
            transition: .25s;
            z-index: 100
        }

        .toast.show {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(0)
        }

        /* ---------- responsive ---------- */
        @media(max-width:1080px) {

            .grid,
            .related-grid {
                grid-template-columns: repeat(3, 1fr)
            }

            .combo-list {
                grid-template-columns: repeat(3, 1fr)
            }
        }

        @media(max-width:860px) {
            .top nav .menu-links {
                display: none
            }

            .hero .plate {
                display: none
            }

            .dtop {
                grid-template-columns: 1fr;
                gap: 32px
            }

            .combo-wrap {
                grid-template-columns: 1fr
            }

            /* rail -> horizontal sticky chips */
            .catalog {
                flex-direction: column;
                padding: 0
            }

            .rail {
                position: sticky;
                top: 64px;
                width: 100%;
                flex: none;
                height: auto;
                padding: 0;
                z-index: 50;
                background: color-mix(in oklab, var(--bg) 90%, transparent);
                backdrop-filter: blur(12px);
                border-bottom: 1px solid var(--border-soft)
            }

            .rail .rlabel {
                display: none
            }

            .rail ul {
                flex-direction: row;
                overflow-x: auto;
                gap: 0;
                padding: 0 16px;
                scrollbar-width: none
            }

            .rail ul::-webkit-scrollbar {
                display: none
            }

            .rail a {
                border-left: none;
                border-bottom: 2px solid transparent;
                white-space: nowrap;
                padding: 15px 14px
            }

            .rail a .num {
                display: none
            }

            .rail a.active {
                background: none;
                border-bottom-color: var(--accent)
            }

            .sections {
                padding: 20px 16px 30px
            }

            .cat {
                scroll-margin-top: 120px
            }

            .grid,
            .related-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 12px
            }

            .combo-list {
                grid-template-columns: 1fr
            }

            /* mobile: focus on products, drop long intro */
            .hero {
                min-height: auto;
                padding: 36px 0
            }

            .hero-inner {
                padding-bottom: 0
            }

            .hero h1 {
                font-size: 30px
            }

            .hero .sub {
                display: none
            }

            .hide-mobile {
                display: none !important
            }

            .foot {
                grid-template-columns: 1fr 1fr;
                gap: 32px
            }

            .foot .about {
                grid-column: 1/-1
            }
        }

        @media(max-width:460px) {

            .wrap,
            .sections {
                padding-left: 14px;
                padding-right: 14px
            }

            .grid,
            .related-grid {
                gap: 10px
            }

            .card .name {
                font-size: 15px
            }

            .brand {
                font-size: 20px;
                letter-spacing: .26em
            }
        }
    </style>
</head>

<body>

    <!-- top tagline strip -->
    <div class="tagstrip" data-od-id="tagline-strip">
        <p>“Dành cho người đàn ông đã đi qua thành công — nơi mỗi phụ kiện là một dấu ấn của sự từng trải và vị thế.”
        </p>
    </div>

    <!-- header -->
    <header class="top" data-od-id="site-header">
        <div class="wrap row">
            <a href="#top" class="brand" onclick="ANTHE.home();return false;" data-od-id="brand-logo">AN<b>THE</b></a>
            <nav>
                <div class="menu-links">
                    <a href="#dong-ho" data-od-id="nav-products">Sản phẩm</a>
                    <a href="#footer" data-od-id="nav-story">Về ANTHE</a>
                    <a href="#footer" data-od-id="nav-contact">Liên hệ</a>
                </div>
                <button class="cart-btn" onclick="ANTHE.openCart()" data-od-id="cart-button">
                    <svg class="ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1.7">
                        <path d="M6 6h15l-1.5 9h-12z" />
                        <circle cx="9" cy="20" r="1.4" />
                        <circle cx="18" cy="20" r="1.4" />
                        <path d="M6 6 5 3H2" />
                    </svg>
                    Giỏ <span class="count" id="cart-count">0</span>
                </button>
            </nav>
        </div>
    </header>

    <!-- hero -->
    <section class="hero" id="top" data-od-id="hero">
        <div class="bg"></div>
        <div class="plate hide-mobile">
            <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
                <circle cx="12" cy="13" r="7" />
                <path d="M12 13V9M9 4h6M12 6v0" />
                <path d="M12 13l3 2" />
            </svg>
            <div class="plabel">ẢNH CAMPAIGN — THAY SAU</div>
        </div>
        <div class="wrap hero-inner">
            <div class="kicker eyebrow">Phụ kiện nam · Từ 1948 · Chế tác thủ công</div>
            <h1 class="serif">Bản lĩnh không cần phô trương.</h1>
            <p class="sub">Đồng hồ, Zippo, ví, thắt lưng, kính và mũ — được tuyển chọn cho người đàn ông biết mình là
                ai.</p>
            <div class="cta">
                <a class="btn solid" href="#dong-ho" data-od-id="hero-cta-shop">Xem bộ sưu tập</a>
                <a class="btn ghost" href="#footer" data-od-id="hero-cta-story" class="hide-mobile">Câu chuyện ANTHE</a>
            </div>
        </div>
    </section>

    <!-- catalog: rail + sections -->
    <div class="catalog" data-od-id="catalog">
        <aside class="rail" data-od-id="category-rail">
            <div class="kicker rlabel">Danh mục</div>
            <ul id="rail-list"></ul>
        </aside>
        <main class="sections" id="sections" data-od-id="category-sections"></main>
    </div>

    <!-- footer -->
    <footer id="footer" data-od-id="site-footer">
        <div class="wrap foot">
            <div class="about">
                <div class="brand" style="padding:0">AN<b>THE</b></div>
                <p class="mission serif">Phụ kiện là ngôn ngữ thầm lặng của một người đàn ông. Chúng tôi chế tác thứ
                    ngôn ngữ đó.</p>
            </div>
            <div>
                <h4>Sản phẩm</h4>
                <ul>
                    <li><a href="#dong-ho" onclick="ANTHE.home()">Đồng hồ</a></li>
                    <li><a href="#zippo" onclick="ANTHE.home()">Zippo</a></li>
                    <li><a href="#vi" onclick="ANTHE.home()">Ví da</a></li>
                    <li><a href="#that-lung" onclick="ANTHE.home()">Thắt lưng</a></li>
                    <li><a href="#kinh" onclick="ANTHE.home()">Kính</a></li>
                    <li><a href="#mu" onclick="ANTHE.home()">Mũ</a></li>
                </ul>
            </div>
            <div>
                <h4>Hỗ trợ</h4>
                <ul>
                    <li><a href="#">Chính sách bảo hành</a></li>
                    <li><a href="#">Đổi trả 30 ngày</a></li>
                    <li><a href="#">Hướng dẫn chọn size</a></li>
                    <li><a href="#">Chăm sóc sản phẩm da</a></li>
                </ul>
            </div>
            <div>
                <h4>Liên hệ</h4>
                <ul class="contact">
                    <li>Showroom · TP.HCM</li>
                    <li>1900 0000</li>
                    <li>hello@anthe.vn</li>
                    <li>9:00 – 21:00 · T2–CN</li>
                </ul>
            </div>
        </div>
        <div class="wrap foot-bar">
            <span>© 2024 ANTHE — Phụ kiện nam</span>
            <span>Ảnh sản phẩm là PLACEHOLDER · thay bằng ảnh thật khi sẵn sàng</span>
        </div>
    </footer>

    <!-- detail takeover -->
    <div class="detail" id="detail" data-od-id="product-detail"></div>

    <!-- cart -->
    <div class="scrim" id="scrim" onclick="ANTHE.closeCart()"></div>
    <aside class="drawer" id="drawer" data-od-id="cart-drawer">
        <div class="dh">
            <h3 class="serif">Giỏ hàng</h3><button onclick="ANTHE.closeCart()" aria-label="Đóng">×</button>
        </div>
        <div class="items" id="cart-items"></div>
        <div class="foot" id="cart-foot" style="display:none">
            <div class="tot"><span>Tạm tính</span><span class="amt" id="cart-total">0₫</span></div>
            <button class="btn solid">Tiến hành thanh toán</button>
        </div>
    </aside>

    <div class="toast" id="toast"></div>

    <script>
        (function () {
            "use strict";
            // ---------- icons ----------
            const ICON = {
                'dong-ho': '<circle cx="12" cy="13" r="7"/><path d="M12 13V9M9 4h6"/><path d="M12 13l3 2"/>',
                'zippo': '<rect x="7" y="4" width="10" height="16" rx="1.5"/><path d="M7 9h10"/><path d="M12 4v-2M11 1.5c0 1 2 1.5 1 3"/>',
                'vi': '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/><circle cx="17" cy="14" r="1.2"/>',
                'that-lung': '<rect x="2" y="9" width="20" height="6" rx="1"/><rect x="9" y="8" width="6" height="8" rx="1"/><path d="M12 10v4"/>',
                'kinh': '<circle cx="6.5" cy="13" r="3.5"/><circle cx="17.5" cy="13" r="3.5"/><path d="M10 12.5h4M3 11l1-3h2M21 11l-1-3h-2"/>',
                'mu': '<path d="M4 17c0-5 3.5-9 8-9s8 4 8 9"/><path d="M2 17h20"/><path d="M12 8V5"/>'
            };
            function svg(cat, cls) { return '<svg class="' + (cls || 'ico') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">' + ICON[cat] + '</svg>'; }

            // ---------- data ----------
            const CATS = [
                { id: 'dong-ho', name: 'Đồng hồ', sub: 'Cơ khí & thạch anh' },
                { id: 'zippo', name: 'Zippo', sub: 'Bật lửa xăng huyền thoại' },
                { id: 'vi', name: 'Ví da', sub: 'Da bò thật thủ công' },
                { id: 'that-lung', name: 'Thắt lưng', sub: 'Da & khoá thép' },
                { id: 'kinh', name: 'Kính', sub: 'Gọng kim loại · phân cực' },
                { id: 'mu', name: 'Mũ', sub: 'Fedora · beret · lưỡi trai' }
            ];
            const TIER = { binhdan: 'Bình dân', trungbinh: 'Trung bình', luxury: 'Luxury' };
            const SPECS = {
                'dong-ho': ['Máy Automatic', 'Kính Sapphire', 'Chống nước 5ATM', 'Dây da/thép', 'Bảo hành 24 tháng'],
                'zippo': ['Vỏ đồng nguyên khối', 'Đá lửa & bấc thay được', 'Khắc laser theo yêu cầu', 'Bảo hành trọn đời'],
                'vi': ['Da bò Full-grain', 'Khâu tay chỉ sáp', 'Chống RFID', '8–12 ngăn thẻ', 'Bảo hành 12 tháng'],
                'that-lung': ['Da bò 1 lớp', 'Khoá thép không gỉ', 'Cắt size theo eo', 'Dày 3.5mm'],
                'kinh': ['Tròng phân cực UV400', 'Gọng titan/acetate', 'Chống trầy', 'Kèm hộp da'],
                'mu': ['Len/nỉ cao cấp', 'Form giữ dáng', 'Nhiều size 56–60', 'Chống thấm nhẹ']
            };
            // model names per category
            const MODELS = {
                'dong-ho': ['Heritage 1948', 'Classic Automatic', 'Skeleton Noir', 'Chronograph Steel', 'Field Officer', 'Diver Pro', 'Dress Onyx', 'Pilot GMT', 'Moonphase', 'Minimal 39', 'Vintage Gold', 'Grand Tourbillon'],
                'zippo': ['Armor Black Ice', 'Brushed Chrome', 'Antique Copper', 'Slim 1935', 'Wood Insert', 'Skull Engrave', 'Golden Fleur', 'Camo Field', 'Marble Stone', 'Blackout Matte', 'Emblem Brass', 'Damascus'],
                'vi': ['Bifold Espresso', 'Cardholder Slim', 'Long Wallet Zip', 'Money Clip Steel', 'Travel Passport', 'Vertical Bifold', 'Trifold Classic', 'Coin Pouch', 'Executive Black', 'Crazy Horse', 'Ostrich Emboss', 'Handmade Whisky'],
                'that-lung': ['Reversible Classic', 'Automatic Buckle', 'Ratchet Steel', 'Braided Woven', 'Formal Onyx', 'Casual Tan', 'Double Ring', 'Cowhide Rustic', 'Business Slim', 'Studded Edge', 'Whisky Full-grain', 'Signature Gold'],
                'kinh': ['Aviator Classic', 'Wayfarer Matte', 'Round Retro', 'Clubmaster', 'Polarized Sport', 'Titanium Rimless', 'Wood Temple', 'Square Bold', 'Half-frame', 'Gradient Smoke', 'Navigator', 'Pilot Gold'],
                'mu': ['Fedora Wool', 'Flat Cap Tweed', 'Beret Noir', 'Bucket Waxed', 'Panama Straw', 'Baseball Suede', 'Newsboy', 'Trilby Classic', 'Beanie Merino', 'Pork Pie', 'Ivy Cap', 'Wide-brim Felt']
            };
            const TIERSEQ = ['luxury', 'trungbinh', 'binhdan', 'trungbinh', 'binhdan', 'luxury', 'trungbinh', 'binhdan', 'trungbinh', 'luxury', 'binhdan', 'luxury'];
            const PRICE = {
                binhdan: [290000, 890000], trungbinh: [1200000, 4200000], luxury: [6500000, 32000000]
            };
            function rnd(seed) { // deterministic pseudo-random
                let x = Math.sin(seed * 9301 + 49297) * 233280; return x - Math.floor(x);
            }
            function priceFor(tier, seed) {
                const r = PRICE[tier]; const v = r[0] + (r[1] - r[0]) * rnd(seed);
                return Math.round(v / 10000) * 10000;
            }
            const PRODUCTS = [];
            CATS.forEach((c, ci) => {
                MODELS[c.id].forEach((m, i) => {
                    const tier = TIERSEQ[i % TIERSEQ.length];
                    PRODUCTS.push({
                        id: c.id + '-' + i, cat: c.id, catName: c.name, name: m, tier: tier,
                        price: priceFor(tier, ci * 97 + i * 13 + 7)
                    });
                });
            });
            const byId = id => PRODUCTS.find(p => p.id === id);
            const money = n => n.toLocaleString('vi-VN') + '₫';

            // ---------- state ----------
            const filters = {}; CATS.forEach(c => filters[c.id] = 'all');
            const cart = [];

            // ---------- render rail ----------
            const railList = document.getElementById('rail-list');
            railList.innerHTML = CATS.map(c => {
                const n = PRODUCTS.filter(p => p.cat === c.id).length;
                return '<li><a href="#' + c.id + '" data-cat="' + c.id + '" data-od-id="rail-' + c.id + '">'
                    + svg(c.id, 'ic') + '<span>' + c.name + '</span><span class="num">' + String(n).padStart(2, '0') + '</span></a></li>';
            }).join('');

            // ---------- render sections ----------
            const sections = document.getElementById('sections');
            sections.innerHTML = CATS.map(c => {
                const n = PRODUCTS.filter(p => p.cat === c.id).length;
                return '<section class="cat" id="' + c.id + '" data-cat="' + c.id + '" data-od-id="section-' + c.id + '">'
                    + '<div class="cat-head">'
                    + '<h2 class="serif">' + svg(c.id, 'cico') + c.name + '</h2>'
                    + '<div class="filters" data-od-id="filters-' + c.id + '">'
                    + tierBtn(c.id, 'all', 'Tất cả')
                    + tierBtn(c.id, 'binhdan', 'Bình dân')
                    + tierBtn(c.id, 'trungbinh', 'Trung bình')
                    + tierBtn(c.id, 'luxury', 'Luxury')
                    + '</div>'
                    + '</div>'
                    + '<div class="grid" id="grid-' + c.id + '"></div>'
                    + '</section>';
            }).join('');

            function tierBtn(cat, val, label) {
                return '<button class="chip' + (val === 'all' ? ' on' : '') + '" data-cat="' + cat + '" data-tier="' + val + '" onclick="ANTHE.filter(\'' + cat + '\',\'' + val + '\')">' + label + '</button>';
            }

            function cardHTML(p) {
                return '<article class="card" onclick="ANTHE.detail(\'' + p.id + '\')" data-od-id="product-card-' + p.id + '">'
                    + '<div class="ph">'
                    + '<span class="tag tier-' + p.tier + '">' + TIER[p.tier] + '</span>'
                    + svg(p.cat)
                    + '<span class="phnote">ẢNH · THAY SAU</span>'
                    + '</div>'
                    + '<div class="body">'
                    + '<div class="cline">' + p.catName + '</div>'
                    + '<div class="name serif">' + p.name + '</div>'
                    + '<div class="price">' + money(p.price).replace('₫', '') + '<span class="cur">₫</span></div>'
                    + '</div>'
                    + '</article>';
            }

            function renderGrid(cat) {
                const f = filters[cat];
                let list = PRODUCTS.filter(p => p.cat === cat);
                if (f !== 'all') list = list.filter(p => p.tier === f);
                const g = document.getElementById('grid-' + cat);
                g.innerHTML = list.length ? list.map(cardHTML).join('')
                    : '<div class="empty">Chưa có sản phẩm ở phân khúc «' + TIER[f] + '». Thử phân khúc khác.</div>';
            }
            CATS.forEach(c => renderGrid(c.id));

            // ---------- scrollspy ----------
            const railLinks = Array.from(railList.querySelectorAll('a'));
            const io = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        const id = e.target.id;
                        railLinks.forEach(a => a.classList.toggle('active', a.dataset.cat === id));
                    }
                });
            }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
            CATS.forEach(c => io.observe(document.getElementById(c.id)));

            // ---------- detail ----------
            function detailHTML(p) {
                const specs = SPECS[p.cat].map(s => '<span>' + s + '</span>').join('');
                // combo: 3 products from other categories, deterministic
                const others = PRODUCTS.filter(o => o.cat !== p.cat);
                const seed = p.id.length;
                const combo = [others[(seed * 7) % others.length], others[(seed * 13 + 5) % others.length], others[(seed * 29 + 11) % others.length]]
                    .filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);
                const comboSum = p.price + combo.reduce((s, c) => s + c.price, 0);
                const comboNew = Math.round(comboSum * 0.88 / 10000) * 10000;
                const related = PRODUCTS.filter(o => o.cat === p.cat && o.id !== p.id).slice(0, 4);

                return '<div class="dback"><div class="wrap"><button onclick="ANTHE.home()" data-od-id="detail-back">‹ &nbsp;Quay lại danh mục</button></div></div>'
                    + '<div class="wrap">'
                    + '<div class="dtop">'
                    + '<div class="gallery" data-od-id="detail-gallery">'
                    + '<div class="main">' + svg(p.cat) + '<span class="phnote">ẢNH SẢN PHẨM · THAY SAU</span></div>'
                    + '<div class="thumbs">' + Array(4).fill('<div>' + svg(p.cat) + '</div>').join('') + '</div>'
                    + '</div>'
                    + '<div class="dinfo" data-od-id="detail-info">'
                    + '<div class="kicker dcat">' + p.catName + '</div>'
                    + '<h1 class="serif">' + p.name + '</h1>'
                    + '<span class="dtier tier-' + p.tier + '">Phân khúc ' + TIER[p.tier] + '</span>'
                    + '<div class="dprice serif">' + money(p.price).replace('₫', '') + '<span class="cur">₫</span></div>'
                    + '<div class="specs">' + specs + '</div>'
                    + '<div class="buybar">'
                    + '<div class="qty"><button onclick="ANTHE.qty(-1)">−</button><span id="q">1</span><button onclick="ANTHE.qty(1)">+</button></div>'
                    + '<button class="btn solid" onclick="ANTHE.add(\'' + p.id + '\',true)" data-od-id="detail-add-cart">Thêm vào giỏ</button>'
                    + '</div>'
                    + '</div>'
                    + '</div>'

                    + '<section class="dsection" data-od-id="detail-combo">'
                    + '<h3 class="serif"><span class="fl">◆</span> Người khác hay chọn cùng</h3>'
                    + '<p class="dsub">Combo phối sẵn cho phong cách trọn vẹn — tiết kiệm khi mua theo bộ.</p>'
                    + '<div class="combo-wrap">'
                    + '<div class="combo-list">' + combo.map(cardHTML).join('') + '</div>'
                    + '<div class="combo-buy" data-od-id="combo-buy">'
                    + '<div class="kicker lbl">Mua cả bộ</div>'
                    + '<div class="old">' + money(comboSum) + '</div>'
                    + '<div class="new serif">' + money(comboNew) + '</div>'
                    + '<div class="save">TIẾT KIỆM ' + money(comboSum - comboNew) + '</div>'
                    + '<button class="btn solid" style="width:100%;justify-content:center" onclick="ANTHE.addCombo(\'' + p.id + '\',[' + combo.map(c => "'" + c.id + "'").join(',') + '])">Thêm cả combo</button>'
                    + '</div>'
                    + '</div>'
                    + '</section>'

                    + '<section class="dsection" data-od-id="detail-related">'
                    + '<h3 class="serif">Cùng danh mục — ' + p.catName + '</h3>'
                    + '<div class="related-grid">' + related.map(cardHTML).join('') + '</div>'
                    + '</section>'
                    + '</div>';
            }

            // ---------- cart ----------
            function renderCart() {
                const box = document.getElementById('cart-items');
                const foot = document.getElementById('cart-foot');
                document.getElementById('cart-count').textContent = cart.reduce((s, i) => s + i.q, 0);
                if (!cart.length) {
                    box.innerHTML = '<div class="empty-cart">Giỏ của bạn đang trống.<br>Hãy chọn một dấu ấn cho riêng mình.</div>';
                    foot.style.display = 'none'; return;
                }
                box.innerHTML = cart.map(i => {
                    const p = byId(i.id);
                    return '<div class="ci"><div class="thumb">' + svg(p.cat) + '</div>'
                        + '<div><div class="nm serif">' + p.name + '</div><div class="mt">' + p.catName + ' · SL ' + i.q + '</div></div>'
                        + '<div class="pr">' + money(p.price * i.q) + '</div></div>';
                }).join('');
                const total = cart.reduce((s, i) => s + byId(i.id).price * i.q, 0);
                document.getElementById('cart-total').textContent = money(total);
                foot.style.display = 'block';
            }

            let toastT;
            function toast(msg) {
                const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show');
                clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200);
            }

            // ---------- public API ----------
            window.ANTHE = {
                filter(cat, val) {
                    filters[cat] = val;
                    document.querySelectorAll('.chip[data-cat="' + cat + '"]').forEach(b => b.classList.toggle('on', b.dataset.tier === val));
                    renderGrid(cat);
                },
                detail(id) {
                    const p = byId(id); if (!p) return;
                    this._q = 1;
                    document.getElementById('detail').innerHTML = detailHTML(p);
                    document.body.classList.add('viewing-detail');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    location.hash = 'p/' + id;
                },
                home() {
                    document.body.classList.remove('viewing-detail');
                    if (location.hash.indexOf('#p/') === 0) history.replaceState(null, '', '#top');
                },
                qty(d) { this._q = Math.max(1, (this._q || 1) + d); const el = document.getElementById('q'); if (el) el.textContent = this._q; },
                add(id, fromDetail) {
                    const q = fromDetail ? (this._q || 1) : 1;
                    const ex = cart.find(i => i.id === id);
                    if (ex) ex.q += q; else cart.push({ id, q });
                    renderCart(); toast('Đã thêm vào giỏ · ' + byId(id).name);
                },
                addCombo(mainId, ids) {
                    [mainId, ...ids].forEach(id => { const ex = cart.find(i => i.id === id); if (ex) ex.q += 1; else cart.push({ id, q: 1 }); });
                    renderCart(); this.openCart(); toast('Đã thêm cả combo vào giỏ');
                },
                openCart() { renderCart(); document.getElementById('drawer').classList.add('open'); document.getElementById('scrim').classList.add('open'); },
                closeCart() { document.getElementById('drawer').classList.remove('open'); document.getElementById('scrim').classList.remove('open'); }
            };

            // deep link on load
            if (location.hash.indexOf('#p/') === 0) { ANTHE.detail(location.hash.slice(3)); }
            window.addEventListener('keydown', e => { if (e.key === 'Escape') { ANTHE.closeCart(); } });
            renderCart();
        })();
    </script>
</body>

</html>