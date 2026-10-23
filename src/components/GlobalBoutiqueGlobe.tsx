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
          .slice(0, Math.max(1, Math.ceil(progress * ORDERED_BOUTIQUE_CITIES.length)))
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
        const isActive = cityIndex < Math.max(1, Math.ceil(progress * ORDERED_BOUTIQUE_CITIES.length));
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
          context.font = `700 ${cityFontSize}px Inter, sans-serif`;
          const cityWidth = context.measureText(label.city).width;
          context.font = `${countryFontSize}px Inter, sans-serif`;
          const countryWidth = context.measureText(label.country).width;
          const labelWidth = Math.max(cityWidth, countryWidth) + 18;
          const labelHeight = isScrollSequence ? 38 : 34;
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
          context.font = `700 ${cityFontSize}px Inter, sans-serif`;
          context.fillStyle = '#F4D66D';
          context.fillText(label.city, labelX + 9, labelY + cityFontSize + 3);
          context.font = `${countryFontSize}px Inter, sans-serif`;
          context.fillStyle = 'rgba(220, 224, 220, 0.72)';
          context.fillText(label.country, labelX + 9, labelY + cityFontSize + countryFontSize + 5);
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
