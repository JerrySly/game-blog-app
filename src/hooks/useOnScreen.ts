import { RefObject, useEffect, useRef, useState } from "react";

export default function useOnScreen(ref: RefObject<HTMLElement>) {
 const observerRef = useRef<IntersectionObserver | null>(null);
 const [isOnScreen, setIsOnScreen] = useState<boolean>(false);

 useEffect(() => {
  observerRef.current = new IntersectionObserver((entries) => {
   setIsOnScreen(entries[0].isIntersecting);
  })
 }, [])

 useEffect(() => {
  if (ref.current) {
   observerRef.current?.observe(ref.current);
  }
  return () => {
    observerRef.current?.disconnect();
  }
 }, [ref])

 return isOnScreen;
}