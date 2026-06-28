// EcoTrace Green Technologies Ltd — Company No. 17180344 — CONFIDENTIAL
"use client";
import { MapContainer, TileLayer, Polyline, useMap, Tooltip } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import type { CertLeg } from "@/lib/certificates/types";

const LOADED = "#1bbf3c"; // brand accent
const EMPTY = "#888888";

function FitBounds({ legs }: { legs: CertLeg[] }) {
  const map = useMap();
  useEffect(() => {
    const pts = legs.flatMap((l) => l.polyline);
    if (pts.length) map.fitBounds(pts as [number, number][], { padding: [20, 20] });
  }, [map, legs]);
  return null;
}

export default function RouteMap({ legs }: { legs: CertLeg[] }) {
  const withGeom = legs.filter((l) => l.polyline.length > 1);
  if (!withGeom.length) {
    return <div className="text-sm text-muted-foreground">No route geometry available.</div>;
  }
  return (
    <MapContainer
      center={withGeom[0].polyline[0]}
      zoom={6}
      style={{ height: 360, width: "100%", borderRadius: 10 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {withGeom.map((leg, i) => {
        const empty = leg.leg_type === "empty_backhaul";
        return (
          <Polyline
            key={i}
            positions={leg.polyline}
            pathOptions={{ color: empty ? EMPTY : LOADED, weight: 4, dashArray: empty ? "6 8" : undefined }}
          >
            <Tooltip>{leg.origin} → {leg.dest} · {empty ? "empty backhaul" : "loaded"} · {leg.distance_km} km</Tooltip>
          </Polyline>
        );
      })}
      <FitBounds legs={withGeom} />
    </MapContainer>
  );
}
