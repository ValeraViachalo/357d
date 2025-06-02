"use client";
import React, { useState, useRef, useCallback, useEffect, useImperativeHandle, forwardRef } from "react";
import { LoadScript, GoogleMap, OverlayView } from "@react-google-maps/api";
import "./MapElement.scss";
import { mapStyles } from "./mapStyles";
import { ApartmentIcon } from "./ApartmentIcon";
import Image from "next/image";

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
  // Internal ref for map instance
  const mapInstanceRef = useRef(null);
  
  const handleMarkerClick = useCallback((markerId) => {
    setActiveMarker(markerId);

    // Find the clicked POI
    const poi = pointsOfInterest.find((p) => p.slug === markerId.slug);

    // Center the map on the marker with smooth animation
    if (mapInstanceRef.current && poi) {
      try {
        // Get current zoom level - with safety check
        const currentZoom = mapInstanceRef.current.getZoom() || 15;
        const targetZoom = 16;

        // First smoothly pan to the location
        mapInstanceRef.current.panTo(poi.position);

        // Then smoothly zoom after a slight delay
        if (currentZoom !== targetZoom) {
          setTimeout(() => {
            // Create a smooth zoom effect
            const zoomInterval = setInterval(() => {
              if (!mapInstanceRef.current) {
                clearInterval(zoomInterval);
                return;
              }
              
              const nextZoom = mapInstanceRef.current.getZoom();
              const zoomStep = nextZoom < targetZoom ? 0.5 : -0.5;

              if (
                (zoomStep > 0 && nextZoom >= targetZoom) ||
                (zoomStep < 0 && nextZoom <= targetZoom)
              ) {
                clearInterval(zoomInterval);
                mapInstanceRef.current.setZoom(targetZoom);
              } else {
                mapInstanceRef.current.setZoom(nextZoom + zoomStep);
              }
            }, 80);
          }, 300); // Small delay before starting zoom
        }
      } catch (error) {
        console.error("Error animating map:", error);
      }
    }
  }, [pointsOfInterest, setActiveMarker]);

  // Store map instance when loaded
  const onLoad = useCallback((map) => {
    mapInstanceRef.current = map;
  }, []);

  // Expose methods to parent component through the forwarded ref
  useImperativeHandle(ref, () => ({
    handleMarkerClick,
    // Also provide direct access to the map if needed
    getMap: () => mapInstanceRef.current
  }), [handleMarkerClick]);

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mainMarker.position}
          zoom={15}
          onLoad={onLoad}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
            zoomControl: true,
            minZoom: 12,
            maxZoom: 18,
            scrollwheel: true,
            gestureHandling: "cooperative",
          }}
        >
          {pointsOfInterest.map((poi) => (
            <OverlayView
              key={poi.slug}
              position={poi.position}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={(width, height) => ({
                x: -(width / 2),
                y: -(height / 2),
              })}
            >
              <div className="marker-wrapper">
                <div
                  className={`marker ${activeMarker.slug === poi.slug ? "active" : ""}`}
                  onClick={() => handleMarkerClick(poi)}
                ></div>
                <div className="active-marker">
                  <Image
                    src={"/images/icons/interests/business-hub.svg"}
                    width={42}
                    height={42}
                    alt=""
                    className="icon"
                  />
                  <p>{poi.name}</p>
                </div>
              </div>
            </OverlayView>
          ))}
          <OverlayView
            position={mainMarker.position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -(height / 2),
            })}
          >
            <ApartmentIcon imageUrl={mainMarker.image} />
          </OverlayView>
        </GoogleMap>
      </LoadScript>
    </div>
  );
});

// Add a display name for better debugging
MapElement.displayName = 'MapElement';

export default MapElement;
