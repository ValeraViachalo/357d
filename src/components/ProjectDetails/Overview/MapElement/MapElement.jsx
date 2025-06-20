"use client";
import React, { useRef, useCallback, useEffect, useImperativeHandle, forwardRef, useState } from "react";
import { GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import "./MapElement.scss";
import { mapStyles } from "./mapStyles";
import { ApartmentIcon } from "./ApartmentIcon";
import Image from "next/image";
import clsx from "clsx";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapElement = forwardRef(({
  pointsOfInterest,
  mainMarker,
  activeMarker,
  setActiveMarker,
}, ref) => {
  const mapInstanceRef = useRef(null);
  const animationRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const handleMarkerClick = useCallback((poi) => {
    if (!mapInstanceRef.current || !poi?.position) return;

    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setActiveMarker(poi);

    const position = {
      lat: Number(poi.position.lat),
      lng: Number(poi.position.lng)
    };

    if (!isFinite(position.lat) || !isFinite(position.lng)) {
      console.error("Invalid coordinates for POI:", poi.name, poi.position);
      return;
    }

    // Smooth pan and zoom to the position
    mapInstanceRef.current.panTo(position);
    mapInstanceRef.current.setZoom(16);
  }, [setActiveMarker]);

  // Center and zoom to active marker when it changes
  useEffect(() => {
    if (isLoaded && activeMarker && mapInstanceRef.current) {
      handleMarkerClick(activeMarker);
    }
  }, [activeMarker, isLoaded, handleMarkerClick]);

  const onLoad = useCallback((map) => {
    mapInstanceRef.current = map;

    if (pointsOfInterest.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      
      // Include main marker
      bounds.extend({
        lat: Number(mainMarker.position.lat),
        lng: Number(mainMarker.position.lng)
      });
      
      // Include all POIs
      pointsOfInterest.forEach(poi => {
        const position = {
          lat: Number(poi.position.lat),
          lng: Number(poi.position.lng)
        };
        if (isFinite(position.lat) && isFinite(position.lng)) {
          bounds.extend(position);
        }
      });
      
      // Fit bounds with padding
      map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
    }
  }, [pointsOfInterest, mainMarker]);

  useImperativeHandle(ref, () => ({
    handleMarkerClick,
    getMap: () => mapInstanceRef.current,
    centerOnPOI: (poiSlug) => {
      const poi = pointsOfInterest.find(p => p.slug === poiSlug);
      if (poi) handleMarkerClick(poi);
    }
  }), [handleMarkerClick, pointsOfInterest]);

  const mainMarkerPosition = {
    lat: Number(mainMarker.position.lat),
    lng: Number(mainMarker.position.lng),
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mainMarkerPosition}
        zoom={15}
        onLoad={onLoad}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
          zoomControl: true,
          minZoom: 14,
          maxZoom: 18,
          scrollwheel: false,
          gestureHandling: "cooperative",
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          clickableIcons: false,
        }}
      >
        {pointsOfInterest.map((poi) => {
          const position = {
            lat: Number(poi.position.lat),
            lng: Number(poi.position.lng)
          };

          if (!isFinite(position.lat) || !isFinite(position.lng)) {
            return null;
          }

          return (
            <OverlayView
              key={poi.slug}
              position={position}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={(width, height) => ({
                x: -(width / 2),
                y: -(height / 2),
              })}
            >
              <div 
                className={clsx("marker-wrapper", {
                  "marker-wrapper--active": activeMarker?.slug === poi.slug,
                })}
                onClick={() => handleMarkerClick(poi)}
              >
                <div className="marker" />
                <div className="active-marker">
                  <Image
                    src={"/images/icons/interests/business-hub.svg"}
                    width={42}
                    height={42}
                    alt={poi.name}
                    className="icon"
                  />
                  <p>{poi.name}</p>
                </div>
              </div>
            </OverlayView>
          );
        })}
        
        <OverlayView
          position={mainMarkerPosition}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={(width, height) => ({
            x: -(width / 2),
            y: -(height / 2),
          })}
        >
          <ApartmentIcon imageUrl={mainMarker.image} />
        </OverlayView>
      </GoogleMap>
    </div>
  );
});

MapElement.displayName = 'MapElement';

export default MapElement;