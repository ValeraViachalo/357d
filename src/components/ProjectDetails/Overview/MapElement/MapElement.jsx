"use client";
import React, { useState, useRef, useCallback, useEffect, useImperativeHandle, forwardRef } from "react";
import { LoadScript, GoogleMap, OverlayView } from "@react-google-maps/api";
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
  // Internal ref for map instance
  const mapInstanceRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  
  const handleMarkerClick = useCallback((poi) => {
    // Clear any existing animation timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // Set the active marker first
    setActiveMarker(poi);

    // Center the map on the clicked POI marker with smooth animation
    if (mapInstanceRef.current && poi && poi.position) {
      try {
        // Convert position to proper LatLng format with validation
        const position = {
          lat: Number(poi.position.lat),
          lng: Number(poi.position.lng)
        };

        // Validate coordinates are finite numbers
        if (!isFinite(position.lat) || !isFinite(position.lng)) {
          console.error("Invalid coordinates for POI:", poi.name, poi.position);
          return;
        }

        console.log("Centering map on POI:", poi.name, position); // Debug log

        // Get current zoom level - with safety check
        const currentZoom = mapInstanceRef.current.getZoom() || 15;
        const targetZoom = Math.max(16, currentZoom); // Ensure we zoom in, not out

        // Use Google Maps built-in smooth pan to the POI position
        mapInstanceRef.current.panTo(position);
        
        // Set zoom with smooth transition after pan completes
        // Use a shorter delay and ensure cleanup
        animationTimeoutRef.current = setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setZoom(targetZoom);
          }
          animationTimeoutRef.current = null;
        }, 200);

      } catch (error) {
        console.error("Error animating map to POI:", poi.name, error);
      }
    } else {
      console.error("Missing map instance or POI data:", { mapInstance: !!mapInstanceRef.current, poi, position: poi?.position });
    }
  }, [setActiveMarker]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  // Store map instance when loaded
  const onLoad = useCallback((map) => {
    mapInstanceRef.current = map;
    
    // Set initial bounds to show all markers if there are multiple POIs
    if (pointsOfInterest.length > 1) {
      const bounds = new window.google.maps.LatLngBounds();
      
      // Add main marker to bounds
      bounds.extend({
        lat: Number(mainMarker.position.lat),
        lng: Number(mainMarker.position.lng)
      });
      
      // Add all POI markers to bounds
      pointsOfInterest.forEach(poi => {
        const position = {
          lat: Number(poi.position.lat),
          lng: Number(poi.position.lng)
        };
        if (isFinite(position.lat) && isFinite(position.lng)) {
          bounds.extend(position);
        }
      });
      
      // Fit map to show all markers with some padding
      map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
    }
  }, [pointsOfInterest, mainMarker]);

  // Handle map idle event to ensure smooth interactions
  const onIdle = useCallback(() => {
    // Map has finished moving, you can add any post-animation logic here
  }, []);

  // Expose methods to parent component through the forwarded ref
  useImperativeHandle(ref, () => ({
    handleMarkerClick,
    // Also provide direct access to the map if needed
    getMap: () => mapInstanceRef.current,
    // Method to programmatically center on a POI
    centerOnPOI: (poiSlug) => {
      const poi = pointsOfInterest.find(p => p.slug === poiSlug);
      if (poi) {
        handleMarkerClick(poi);
      }
    }
  }), [handleMarkerClick, pointsOfInterest]);

  const mainMarkerPosition = {
    lat: Number(mainMarker.position.lat),
    lng: Number(mainMarker.position.lng),
  };

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mainMarkerPosition}
          zoom={15}
          onLoad={onLoad}
          onIdle={onIdle}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
            zoomControl: true,
            minZoom: 12,
            maxZoom: 18,
            scrollwheel: true,
            gestureHandling: "cooperative",
            // Smooth zoom and pan animations
            animation: window.google?.maps?.Animation?.BOUNCE,
            // Optimize performance
            optimized: true,
          }}
        >
          {pointsOfInterest.map((poi) => {
            // Ensure coordinates are valid numbers
            const position = {
              lat: Number(poi.position.lat),
              lng: Number(poi.position.lng)
            };

            // Skip rendering if coordinates are invalid
            if (!isFinite(position.lat) || !isFinite(position.lng)) {
              console.warn("Skipping POI with invalid coordinates:", poi.name, poi.position);
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
                <div className={clsx("marker-wrapper", {
                  "marker-wrapper--active": activeMarker?.slug === poi.slug,
                })}>
                  <div
                    className="marker" 
                    onClick={() => handleMarkerClick(poi)}
                    style={{ cursor: 'pointer' }}
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
      </LoadScript>
    </div>
  );
});

// Add a display name for better debugging
MapElement.displayName = 'MapElement';

export default MapElement;