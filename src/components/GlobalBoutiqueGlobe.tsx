import { useEffect, useRef, useState } from 'react';
import { feature } from 'topojson-client';
import { geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import type { FeatureCollection, Geometry } from 'geojson';
import type { Topology } from 'topojson-specification';
import world from 'world-atlas/countries-110m.json';
import { Crosshair, Globe2, RotateCw } from 'lucide-react';
import type { Language } from '../data/translations';
import { ORDERED_BOUTIQUE_CITIES, boutiqueCountryIds, type BoutiqueCity } from '../data/globe';

interface GlobalBoutiqueGlobeProps {
  language: Language;
  interactive?: boolean;
  highlightProgress?: number;
  showLabels?: boolean;
  rotation?: [number, number, number];
  autoRotate?: boolean;
  activeCityId?: string;
  className?: string;
}

interface CountryProperties {
  name?: string;
}

const worldTopology = world as unknown as Topology;
const countries = feature(
  worldTopology,
  worldTopology.objects.countries,
) as FeatureCollection<Geometry, CountryProperties>;

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + width, y, x + width, y + height, r);
  context.arcTo(x + width, y + height, x, y + height, r);
  context.arcTo(x, y + height, x, y, r);
  context.arcTo(x, y, x + width, y, r);
  context.closePath();
}

function drawCountryFlag(context: CanvasRenderingContext2D, countryId: string, x: number, y: number, width = 22, height = 14) {
  context.save();
  roundedRect(context, x, y, width, height, 2);
  context.clip();
  const stripe = (colors: string[], vertical = false) => colors.forEach((color, index) => {
    context.fillStyle = color;
    if (vertical) context.fillRect(x + (width / colors.length) * index, y, width / colors.length + 0.5, height);
    else context.fillRect(x, y + (height / colors.length) * index, width, height / colors.length + 0.5);
  });

  switch (countryId) {
    case '250': stripe(['#1f4e9b', '#fff', '#e23d4f'], true); break;
    case '380': stripe(['#009246', '#fff', '#ce2b37'], true); break;
    case '643': stripe(['#fff', '#2455a4', '#d9363e']); break;
    case '276': stripe(['#111', '#d00', '#ffce00']); break;
    case '616': stripe(['#fff', '#dc143c']); break;
    case '724': stripe(['#c60b1e', '#f1c40f', '#c60b1e']); break;
    case '620': stripe(['#006600', '#ff1d25'], true); break;
    case '156': {
      context.fillStyle = '#de2910'; context.fillRect(x, y, width, height);
      const star = (cx: number, cy: number, radius: number) => {
        context.beginPath();
        for (let point = 0; point < 10; point += 1) {
          const angle = -Math.PI / 2 + point * Math.PI / 5;
          const distance = point % 2 === 0 ? radius : radius * 0.42;
          const px = cx + Math.cos(angle) * distance;
          const py = cy + Math.sin(angle) * distance;
          point === 0 ? context.moveTo(px, py) : context.lineTo(px, py);
        }
        context.closePath(); context.fill();
      };
      context.fillStyle = '#ffde00';
      star(x + width * 0.2, y + height * 0.25, height * 0.2);
      [[0.42, 0.12], [0.51, 0.28], [0.5, 0.48], [0.4, 0.6]].forEach(([starX, starY]) => star(x + width * starX, y + height * starY, height * 0.08));
      break;
    }
    case '392': context.fillStyle = '#fff'; context.fillRect(x, y, width, height); context.fillStyle = '#bc002d'; context.beginPath(); context.arc(x + width / 2, y + height / 2, 3.2, 0, Math.PI * 2); context.fill(); break;
    case '840':
      stripe(['#b22234', '#fff', '#b22234', '#fff', '#b22234', '#fff', '#b22234']);
      context.fillStyle = '#3c3b6e'; context.fillRect(x, y, width * 0.45, height * 0.55); break;
    case '124': {
      context.fillStyle = '#fff'; context.fillRect(x, y, width, height);
      context.fillStyle = '#d52b3f'; context.fillRect(x, y, width * .25, height); context.fillRect(x + width * .75, y, width * .25, height);
      context.beginPath();
      const mapleLeaf = [[0.5, 0.12], [0.55, 0.35], [0.7, 0.25], [0.64, 0.46], [0.78, 0.52], [0.57, 0.58], [0.6, 0.84], [0.5, 0.68], [0.4, 0.84], [0.43, 0.58], [0.22, 0.52], [0.36, 0.46], [0.3, 0.25], [0.45, 0.35]];
      mapleLeaf.forEach(([px, py], index) => index === 0 ? context.moveTo(x + width * px, y + height * py) : context.lineTo(x + width * px, y + height * py));
      context.closePath(); context.fill(); break;
    }
    case '036':
      context.fillStyle = '#132b55'; context.fillRect(x, y, width, height);
      context.fillStyle = '#173f78'; context.fillRect(x, y, width * .44, height * .52);
      context.strokeStyle = '#fff'; context.lineWidth = 2; context.beginPath(); context.moveTo(x, y); context.lineTo(x + width * .44, y + height * .52); context.moveTo(x + width * .44, y); context.lineTo(x, y + height * .52); context.stroke();
      context.strokeStyle = '#cf2030'; context.lineWidth = 0.8; context.stroke();
      context.fillStyle = '#fff';
      [[0.72, 0.2, 1.6], [0.85, 0.34, 1.3], [0.7, 0.7, 1.4], [0.88, 0.78, 1.1], [0.58, 0.72, 0.9]].forEach(([starX, starY, size]) => {
        context.beginPath(); context.arc(x + width * starX, y + height * starY, size / 3, 0, Math.PI * 2); context.fill();
      });
      break;
    case '826': context.fillStyle = '#173f78'; context.fillRect(x, y, width, height); context.strokeStyle = '#fff'; context.lineWidth = 3; context.beginPath(); context.moveTo(x, y); context.lineTo(x + width, y + height); context.moveTo(x + width, y); context.lineTo(x, y + height); context.moveTo(x + width / 2, y); context.lineTo(x + width / 2, y + height); context.moveTo(x, y + height / 2); context.lineTo(x + width, y + height / 2); context.stroke(); context.strokeStyle = '#cf2030'; context.lineWidth = 1; context.stroke(); break;
    case '756': context.fillStyle = '#d52b3f'; context.fillRect(x, y, width, height); context.fillStyle = '#fff'; context.fillRect(x + width * .42, y + height * .2, width * .16, height * .6); context.fillRect(x + width * .2, y + height * .4, width * .6, height * .2); break;
    case '492': context.fillStyle = '#ce1126'; context.fillRect(x, y, width, height / 2); context.fillStyle = '#fff'; context.fillRect(x, y + height / 2, width, height / 2); break;
    case '784': context.fillStyle = '#17834b'; context.fillRect(x, y, width, height / 3); context.fillStyle = '#fff'; context.fillRect(x, y + height / 3, width, height / 3); context.fillStyle = '#111'; context.fillRect(x, y + height * 2 / 3, width, height / 3); context.fillStyle = '#ce1126'; context.fillRect(x, y, width * .25, height); break;
    case '634': context.fillStyle = '#8a1538'; context.fillRect(x, y, width, height); context.fillStyle = '#fff'; context.fillRect(x, y, width * .3, height); break;
    case '792': context.fillStyle = '#e30a17'; context.fillRect(x, y, width, height); context.fillStyle = '#fff'; context.beginPath(); context.arc(x + width * .45, y + height / 2, 4, 0, Math.PI * 2); context.fill(); context.fillStyle = '#e30a17'; context.beginPath(); context.arc(x + width * .51, y + height / 2, 3.2, 0, Math.PI * 2); context.fill(); break;
    case '076': context.fillStyle = '#009c3b'; context.fillRect(x, y, width, height); context.fillStyle = '#ffdf00'; context.beginPath(); context.moveTo(x + width / 2, y + 1); context.lineTo(x + width - 2, y + height / 2); context.lineTo(x + width / 2, y + height - 1); context.lineTo(x + 2, y + height / 2); context.closePath(); context.fill(); context.fillStyle = '#002776'; context.beginPath(); context.arc(x + width / 2, y + height / 2, 3.2, 0, Math.PI * 2); context.fill(); break;
    case '398': context.fillStyle = '#00afca'; context.fillRect(x, y, width, height); context.fillStyle = '#f6d24a'; context.beginPath(); context.arc(x + width / 2, y + height / 2, 3, 0, Math.PI * 2); context.fill(); break;
    case '410': {
      context.fillStyle = '#fff'; context.fillRect(x, y, width, height);
      context.fillStyle = '#cd2e3a'; context.beginPath(); context.arc(x + width / 2, y + height / 2 - 0.6, 3.3, 0, Math.PI * 2); context.fill();
      context.fillStyle = '#0047a0'; context.beginPath(); context.arc(x + width / 2, y + height / 2 + 0.9, 2.4, 0, Math.PI * 2); context.fill();
      context.strokeStyle = '#111'; context.lineWidth = 0.8;
      [[0.17, 0.2, 0.32, 0.28], [0.17, 0.34, 0.32, 0.26], [0.68, 0.7, 0.83, 0.8], [0.68, 0.56, 0.83, 0.66]].forEach(([x1, y1, x2, y2]) => {
        context.beginPath(); context.moveTo(x + width * x1, y + height * y1); context.lineTo(x + width * x2, y + height * y2); context.stroke();
      });
      break;
    }
    case '702': stripe(['#ed2939', '#fff']); break;
    case '752': context.fillStyle = '#006aa7'; context.fillRect(x, y, width, height); context.fillStyle = '#fecc00'; context.fillRect(x + width * .28, y, width * .14, height); context.fillRect(x, y + height * .36, width, height * .18); break;
    case '470': stripe(['#fff', '#cf142b'], true); break;
    case '233': stripe(['#4891d1', '#111', '#fff']); break;
    case '208': context.fillStyle = '#c8102e'; context.fillRect(x, y, width, height); context.strokeStyle = '#fff'; context.lineWidth = 2; context.beginPath(); context.moveTo(x + width * .32, y); context.lineTo(x + width * .32, y + height); context.moveTo(x, y + height * .4); context.lineTo(x + width, y + height * .4); context.stroke(); break;
    case '578': context.fillStyle = '#ba0c2f'; context.fillRect(x, y, width, height); context.strokeStyle = '#fff'; context.lineWidth = 4; context.beginPath(); context.moveTo(x + width * .32, y); context.lineTo(x + width * .32, y + height); context.moveTo(x, y + height * .4); context.lineTo(x + width, y + height * .4); context.stroke(); break;
    case '764': stripe(['#a51931', '#f4f5f8', '#2d2a4a', '#f4f5f8', '#a51931']); break;
    default: stripe(['#284d89', '#fff', '#d9363e']);
  }
  context.restore();
}

export function GlobalBoutiqueGlobe({
  language,
  interactive = true,
  highlightProgress = 1,
  showLabels = true,
  rotation,
  autoRotate = false,
  activeCityId,
  className = '',
}: GlobalBoutiqueGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const rotationRef = useRef<[number, number, number]>([-18, -12, 0]);
  const dragRef = useRef({ active: false, x: 0, y: 0 });
  const hitPointsRef = useRef<Array<{ city: BoutiqueCity; x: number; y: number }>>([]);
  const propsRef = useRef({ language, highlightProgress, showLabels, rotation, autoRotate, activeCityId });
  const [hoveredCity, setHoveredCity] = useState<BoutiqueCity | null>(null);

  propsRef.current = { language, highlightProgress, showLabels, rotation, autoRotate, activeCityId };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(bounds.width * ratio));
      canvas.height = Math.max(1, Math.round(bounds.height * ratio));
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const draw = () => {
      const bounds = canvas.getBoundingClientRect();
      const width = bounds.width;
      const height = bounds.height;
      const ratio = window.devicePixelRatio || 1;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      const radius = Math.min(width, height) * 0.43;
      if (propsRef.current.rotation && !dragRef.current.active) {
        rotationRef.current = propsRef.current.rotation;
      }

      const projection = geoOrthographic()
        .translate([width / 2, height / 2])
        .scale(radius)
        .rotate(rotationRef.current)
        .clipAngle(90);
      const path = geoPath(projection, context);
      const progress = Math.max(0, Math.min(1, propsRef.current.highlightProgress));
      const activeCountryIds = new Set(
        ORDERED_BOUTIQUE_CITIES
          .slice(0, Math.ceil(progress * ORDERED_BOUTIQUE_CITIES.length))
          .map((city) => city.countryId),
      );

      context.save();
      context.beginPath();
      path({ type: 'Sphere' });
      context.fillStyle = '#101212';
      context.shadowColor = 'rgba(212, 175, 55, 0.12)';
      context.shadowBlur = 34;
      context.fill();
      context.shadowBlur = 0;
      context.strokeStyle = 'rgba(212, 175, 55, 0.28)';
      context.lineWidth = 1;
      context.stroke();
      context.restore();

      for (const country of countries.features) {
        const countryId = String(country.id ?? '');
        context.beginPath();
        path(country);
        context.fillStyle = boutiqueCountryIds.has(countryId) && activeCountryIds.has(countryId)
          ? 'rgba(212, 175, 55, 0.5)'
          : 'rgba(70, 74, 74, 0.72)';
        context.strokeStyle = boutiqueCountryIds.has(countryId) && activeCountryIds.has(countryId)
          ? 'rgba(241, 212, 116, 0.8)'
          : 'rgba(167, 174, 171, 0.24)';
        context.lineWidth = boutiqueCountryIds.has(countryId) && activeCountryIds.has(countryId) ? 0.9 : 0.45;
        context.fill();
        context.stroke();
      }

      context.beginPath();
      path(geoGraticule10());
      context.strokeStyle = 'rgba(161, 168, 164, 0.24)';
      context.lineWidth = 0.55;
      context.stroke();

      hitPointsRef.current = [];
      const isScrollSequence = Boolean(propsRef.current.activeCityId);
      const activeCityPosition = progress * (ORDERED_BOUTIQUE_CITIES.length - 1);
      const focusedLabelIndices = new Set([
        Math.floor(activeCityPosition),
        Math.ceil(activeCityPosition),
      ]);
      const drawnLabels: Array<{ x: number; y: number; width: number; height: number }> = [];
      const citiesToDraw = isScrollSequence
        ? [...ORDERED_BOUTIQUE_CITIES].sort((a, b) => Number(b.id === propsRef.current.activeCityId) - Number(a.id === propsRef.current.activeCityId))
        : ORDERED_BOUTIQUE_CITIES;
      for (const city of citiesToDraw) {
        const point = projection(city.coordinates);
        if (!point) continue;
        const cityIndex = ORDERED_BOUTIQUE_CITIES.findIndex((candidate) => candidate.id === city.id);
        const isActive = cityIndex < Math.ceil(progress * ORDERED_BOUTIQUE_CITIES.length);
        const isCurrent = city.id === propsRef.current.activeCityId;
        const labelOpacity = isScrollSequence
          ? Math.max(0, 1 - Math.abs(activeCityPosition - cityIndex))
          : 1;
        hitPointsRef.current.push({ city, x: point[0], y: point[1] });

        context.save();
        context.beginPath();
        context.arc(point[0], point[1], isCurrent ? 5.5 : isActive ? 4 : 2.5, 0, Math.PI * 2);
        context.fillStyle = isActive ? '#F0D060' : 'rgba(214, 220, 213, 0.5)';
        context.shadowColor = isActive ? 'rgba(240, 208, 96, 0.95)' : 'transparent';
        context.shadowBlur = isCurrent ? 24 : isActive ? 15 : 0;
        context.fill();
        if (isActive || isCurrent) {
          context.beginPath();
          context.arc(point[0], point[1], isCurrent ? 12 : 8, 0, Math.PI * 2);
          context.strokeStyle = 'rgba(240, 208, 96, 0.36)';
          context.lineWidth = 1;
          context.stroke();
        }
        context.restore();

        const shouldDrawLabel = isScrollSequence
          ? focusedLabelIndices.has(cityIndex)
          : isActive;
        if (showLabels && width > 520 && shouldDrawLabel) {
          const label = city.labels[propsRef.current.language];
          const cityFontSize = isScrollSequence ? 14 : 12;
          const countryFontSize = isScrollSequence ? 11 : 10;
          const flagWidth = 29;
          context.font = `700 ${cityFontSize}px Inter, sans-serif`;
          const cityWidth = context.measureText(label.city).width;
          context.font = `${countryFontSize}px Inter, sans-serif`;
          const countryWidth = context.measureText(label.country).width;
          const labelWidth = Math.max(cityWidth, countryWidth) + flagWidth + 22;
          const labelHeight = isScrollSequence ? 42 : 38;
          const labelX = Math.max(8, Math.min(width - labelWidth - 8, point[0] + 10));
          const labelY = Math.max(8, Math.min(height - labelHeight - 8, point[1] - labelHeight - 8));
          const hasNearbyLabel = drawnLabels.some((drawn) => (
            labelX < drawn.x + drawn.width + 12
            && labelX + labelWidth + 12 > drawn.x
            && labelY < drawn.y + drawn.height + 10
            && labelY + labelHeight + 10 > drawn.y
          ));
          if (hasNearbyLabel && !isCurrent) continue;
          context.save();
          context.globalAlpha = labelOpacity;
          roundedRect(context, labelX, labelY, labelWidth, labelHeight, 8);
          context.fillStyle = 'rgba(8, 10, 10, 0.86)';
          context.fill();
          context.strokeStyle = 'rgba(240, 208, 96, 0.46)';
          context.lineWidth = 1;
          context.stroke();
          drawCountryFlag(context, city.countryId, labelX + 8, labelY + 8, 24, isScrollSequence ? 16 : 14);
          context.font = `700 ${cityFontSize}px Inter, sans-serif`;
          context.fillStyle = '#F4D66D';
          context.fillText(label.city, labelX + flagWidth + 5, labelY + cityFontSize + 3);
          context.font = `${countryFontSize}px Inter, sans-serif`;
          context.fillStyle = 'rgba(220, 224, 220, 0.72)';
          context.fillText(label.country, labelX + flagWidth + 5, labelY + cityFontSize + countryFontSize + 5);
          context.restore();
          drawnLabels.push({ x: labelX, y: labelY, width: labelWidth, height: labelHeight });
        }
      }

      if (!dragRef.current.active && propsRef.current.autoRotate) {
        rotationRef.current[0] += 0.055;
      }
      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const getCanvasPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    const point = getCanvasPoint(event);
    dragRef.current = { active: true, x: point.x, y: point.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const point = getCanvasPoint(event);
    if (dragRef.current.active) {
      const dx = point.x - dragRef.current.x;
      const dy = point.y - dragRef.current.y;
      rotationRef.current[0] += dx * 0.42;
      rotationRef.current[1] = Math.max(-78, Math.min(78, rotationRef.current[1] - dy * 0.34));
      dragRef.current = { active: true, x: point.x, y: point.y };
      return;
    }

    const nearest = hitPointsRef.current.find((candidate) => Math.hypot(candidate.x - point.x, candidate.y - point.y) < 13);
    setHoveredCity(nearest?.city ?? null);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    dragRef.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const hoveredLabel = hoveredCity?.labels[language];

  return (
    <div className={`relative aspect-square w-full max-w-full ${className}`}>
      <div className="absolute inset-[5%] rounded-full bg-[#121514] shadow-[0_0_90px_rgba(212,175,55,0.12)]" />
      <canvas
        ref={canvasRef}
        aria-label={language === 'RU' ? 'Интерактивная карта бутиков' : 'Interactive boutique globe'}
        className={`relative z-10 h-full w-full touch-none ${interactive ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={() => {
          if (!dragRef.current.active) setHoveredCity(null);
        }}
      />

      <div className="pointer-events-none absolute left-1/2 top-[6%] z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-platinum-500/20 bg-obsidian-950/70 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-platinum-500 backdrop-blur-sm">
        {interactive ? <RotateCw size={11} className="text-gold-400" /> : <Globe2 size={11} className="text-gold-400" />}
        <span>{interactive ? 'Drag to explore' : 'Global network'}</span>
      </div>

      {hoveredLabel && (
        <div className="pointer-events-none absolute bottom-[8%] left-1/2 z-30 -translate-x-1/2 rounded-xl border border-gold-500/35 bg-obsidian-950/90 px-4 py-2 text-center shadow-xl shadow-black/50 backdrop-blur-md">
          <p className="font-display text-lg leading-none text-platinum-100">{hoveredLabel.city}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-gold-400">{hoveredLabel.country}</p>
        </div>
      )}

      {!interactive && (
        <div className="pointer-events-none absolute bottom-[4%] left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-platinum-500">
          <Crosshair size={11} className="text-gold-400" />
          <span>{ORDERED_BOUTIQUE_CITIES.length} boutique locations</span>
        </div>
      )}
    </div>
  );
}
