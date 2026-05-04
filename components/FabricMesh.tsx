"use client";

import { createElement, useEffect } from "react";

const SPLINE_VIEWER_SCRIPT =
  "https://unpkg.com/@splinetool/viewer@1.12.90/build/spline-viewer.js";
const TRADEX_SPLINE_SCENE =
  "https://prod.spline.design/r7lUWxLn1GMig4pQ/scene.splinecode";

export default function FabricMesh() {
  useEffect(() => {
    if (document.querySelector(`script[src="${SPLINE_VIEWER_SCRIPT}"]`)) {
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = SPLINE_VIEWER_SCRIPT;
    document.head.appendChild(script);
  }, []);

  return (
    <div className="pointer-events-auto absolute inset-0 z-0">
      {createElement("spline-viewer", {
        style: { display: "block", height: "100%", width: "100%" },
        url: TRADEX_SPLINE_SCENE,
      })}
    </div>
  );
}
