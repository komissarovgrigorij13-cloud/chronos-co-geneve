import { useEffect, useRef, useState } from 'react';
import { feature } from 'topojson-client';
import { geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import type { FeatureCollection, Geometry } from 'geojson';
import type { Topology } from 'topojson-specification';
import world from 'world-atlas/countries-110m.json';
import { Crosshair, Globe2, RotateCw } from 'lucide-react';
import type { Language } from '../data/translations';
import { BOUTIQUE_CITIES, boutiqueCountryIds, type BoutiqueCity } from '../data/globe';

interface GlobalBoutiqueGlobeProps {
  language: Language;
  interactive?: boolean;
  highlightProgress?: number;
  showLabels?: boolean;
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

export function GlobalBoutiqueGlobe({
  language,
  interactive = true,
  highlightProgress = 1,
  showLabels = true,
  className = '',
}: GlobalBoutiqueGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const rotationRef = useRef<[number, number, number]>([-18, -12, 0]);
  const dragRef = useRef({ active: false, x: 0, y: 0 });
  const hitPointsRef = useRef<Array<{ city: BoutiqueCity; x: number; y: number }>>([]);
  const propsRef = useRef({ language, highlightProgress, showLabels });
  const [hoveredCity, setHoveredCity] = useState<BoutiqueCity | null>(null);

  propsRef.current = { language, highlightProgress, showLabels };

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
      const projection = geoOrthographic()
        .translate([width / 2, height / 2])
        .scale(radius)
        .rotate(rotationRef.current)
        .clipAngle(90);
      const path = geoPath(projection, context);
      const progress = Math.max(0, Math.min(1, propsRef.current.highlightProgress));
      const activeCountryIds = new Set(
        BOUTIQUE_CITIES
          .slice(0, Math.ceil(progress * BOUTIQUE_CITIES.length))
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
      const drawnLabels: Array<[number, number]> = [];
      for (const city of BOUTIQUE_CITIES) {
        const point = projection(city.coordinates);
        if (!point) continue;
        const cityIndex = BOUTIQUE_CITIES.findIndex((candidate) => candidate.id === city.id);
        const isActive = cityIndex < Math.ceil(progress * BOUTIQUE_CITIES.length);
        hitPointsRef.current.push({ city, x: point[0], y: point[1] });

        context.save();
        context.beginPath();
        context.arc(point[0], point[1], isActive ? 4 : 2.5, 0, Math.PI * 2);
        context.fillStyle = isActive ? '#F0D060' : 'rgba(214, 220, 213, 0.5)';
        context.shadowColor = isActive ? 'rgba(240, 208, 96, 0.95)' : 'transparent';
        context.shadowBlur = isActive ? 15 : 0;
        context.fill();
        if (isActive) {
          context.beginPath();
          context.arc(point[0], point[1], 8, 0, Math.PI * 2);
          context.strokeStyle = 'rgba(240, 208, 96, 0.36)';
          context.lineWidth = 1;
          context.stroke();
        }
        context.restore();

        const hasNearbyLabel = drawnLabels.some(([labelX, labelY]) => Math.hypot(labelX - point[0], labelY - point[1]) < 54);
        if (showLabels && isActive && width > 520 && !hasNearbyLabel) {
          const label = city.labels[propsRef.current.language];
          context.font = '600 10px Inter, sans-serif';
          context.fillStyle = '#F0D060';
          context.fillText(label.city, point[0] + 10, point[1] - 4);
          context.font = '9px Inter, sans-serif';
          context.fillStyle = 'rgba(220, 224, 220, 0.72)';
          context.fillText(label.country, point[0] + 10, point[1] + 9);
          drawnLabels.push(point);
        }
      }

      if (!dragRef.current.active) {
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
          <span>{BOUTIQUE_CITIES.length} boutique locations</span>
        </div>
      )}
    </div>
  );
}
