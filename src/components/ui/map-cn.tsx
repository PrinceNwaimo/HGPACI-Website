/**
 * Baidu Map GL Component
 * 
 * React map component based on Baidu Map WebGL API, supports custom markers, zoom levels and other configurations
 * 
 * Usage example:
 * <Map
 *   ak="OeTpXHgdUrRT2pPyAPRL7pog6GlMlQzl" // Baidu Map API key
 *   option={{
 *       address: "Liugong Island Scenic Area, Huancui District, Weihai City, Shandong Province",
 *       lat: 37.51029432858647, // Latitude
 *       lng: 122.19726116385918, // Longitude
 *       zoom: 12, // Zoom level
 *   }}
 *   className="w-[600px] h-[300px] rounded-lg" // Container styles
 * >
 *   <MapTitle className="text-md"/> // Optional title component
 * </Map>
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  ReactNode,
} from "react";

/** Map context properties */
type MapContextProps = {
  address?: string;
};

const MapContext = createContext<MapContextProps | null>(null);

/** Default map configuration */
const defaultOption = {
  zoom: 15,
  lng: 116.404,
  lat: 39.915,
  address: "Chang'an Street, Dongcheng District, Beijing",
};

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.onerror = (reason) => reject(reason);

    if (~src.indexOf("{{callback}}")) {
      const callbackFn = `loadscriptcallback_${+new Date()}`;
      (window as any)[callbackFn] = () => {
        resolve();
        delete (window as any)[callbackFn];
      };
      src = src.replace("{{callback}}", callbackFn);
    } else {
      script.onload = () => resolve();
    }

    script.src = src;
    document.head.appendChild(script);
  });

const useMap = () => {
  const context = useContext(MapContext);
  return context ?? {};
};

const MapTitle = ({ className }: React.ComponentProps<"div">) => {
  const { address } = useMap();
  if (!address) return null;
  return <span className={`text-lg font-bold ${className}`}>{address}</span>;
};

// Record Baidu Map SDK loading status
let BMapGLLoadingPromise: Promise<void> | null = null;

type MapOption = {
  zoom: number;
  lng: number;
  lat: number;
  address: string;
};

interface MapProps extends React.ComponentProps<"div"> {
  ak: string;
  option?: Partial<MapOption>;
  children?: ReactNode;
}

const Map = ({ ak, option, className, children, ...props }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<any>(null);

  const _options = useMemo(() => ({ ...defaultOption, ...option }), [option]);

  const contextValue = useMemo<MapContextProps>(
    () => ({ address: _options.address }),
    [_options.address]
  );

  const initMap = useCallback(() => {
    if (!mapRef.current) return;

    let map: any = currentRef.current;

    if (!map) {
      map = new (window as any).BMapGL.Map(mapRef.current);
      currentRef.current = map;
    }

    map.clearOverlays();

    const center = new (window as any).BMapGL.Point(
      _options.lng,
      _options.lat
    );

    map.centerAndZoom(center, _options.zoom);

    const marker = new (window as any).BMapGL.Marker(center);
    map.addOverlay(marker);
  }, [_options]);

  useEffect(() => {
    if ((window as any).BMapGL) {
      initMap();
    } else if (BMapGLLoadingPromise) {
      BMapGLLoadingPromise.then(initMap).then(() => {
        BMapGLLoadingPromise = null;
      });
    } else {
      BMapGLLoadingPromise = loadScript(
        `//api.map.baidu.com/api?type=webgl&v=1.0&ak=${ak}&callback={{callback}}`
      );

      BMapGLLoadingPromise.then(initMap).then(() => {
        BMapGLLoadingPromise = null;
      });
    }
  }, [ak, initMap]);

  useEffect(() => {
    return () => {
      currentRef.current = null;
    };
  }, []);

  return (
    <MapContext.Provider value={contextValue}>
      <div ref={mapRef} className={`w-full aspect-[16/9] ${className}`} {...props}></div>
      {children}
    </MapContext.Provider>
  );
};

export { Map, MapTitle };
