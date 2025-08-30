import { useEffect, useRef, useState } from "react";

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animationType?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "stagger";
  delay?: number;
}

export function ScrollAnimation({ 
  children, 
  className = "", 
  animationType = "fadeInUp",
  delay = 0 
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`
        ${className}
        ${isVisible ? `fade-in-${animationType.replace('fadeIn', '').toLowerCase()}` : 'opacity-0'}
        transition-opacity duration-300
      `}
      style={{
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}