"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const SPLINE_VIEWER_SCRIPT =
  "https://unpkg.com/@splinetool/viewer@1.12.90/build/spline-viewer.js";
const INNOVATION_SPLINE_SCENE =
  "https://prod.spline.design/tnSE26WO3MFqruRF/scene.splinecode";

export default function EnergyOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;
    let viewer: HTMLElement | null = null;

    const loadScript = () => {
      return new Promise<void>((resolve) => {
        const existingScript = document.querySelector(`script[src="${SPLINE_VIEWER_SCRIPT}"]`);
        
        if (existingScript) {
          // Check if custom element is already defined
          if (customElements.get('spline-viewer')) {
            resolve();
          } else {
            customElements.whenDefined('spline-viewer').then(() => resolve());
          }
        } else {
          const script = document.createElement("script");
          script.type = "module";
          script.src = SPLINE_VIEWER_SCRIPT;
          script.onload = () => {
            customElements.whenDefined('spline-viewer').then(() => resolve());
          };
          document.head.appendChild(script);
        }
      });
    };

    const initViewer = async () => {
      await loadScript();
      
      if (!mounted || !containerRef.current) return;

      // Wait for container to have dimensions
      const checkDimensions = () => {
        if (!containerRef.current) return false;
        const rect = containerRef.current.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      };

      // Retry until container has dimensions
      if (!checkDimensions()) {
        requestAnimationFrame(() => {
          if (mounted) initViewer();
        });
        return;
      }

      // Clear any existing content
      containerRef.current.innerHTML = '';

      // Create and append the spline-viewer element directly
      viewer = document.createElement('spline-viewer');
      viewer.setAttribute('url', INNOVATION_SPLINE_SCENE);
      viewer.style.display = 'block';
      viewer.style.height = '100%';
      viewer.style.width = '100%';
      
      containerRef.current.appendChild(viewer);
    };

    initViewer();

    return () => {
      mounted = false;
      if (viewer && viewer.parentNode) {
        viewer.parentNode.removeChild(viewer);
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [pathname]); // Re-run when pathname changes

  return (
    <div ref={containerRef} className="pointer-events-auto absolute inset-0 z-0" />
  );
}
