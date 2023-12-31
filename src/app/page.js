'use client';
import styles from './page.module.scss';
import Gallery from '../components/gallery';
import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';
import { useSpring } from 'framer-motion';
import Description from '../components/description';

const projects = [
  {
    name: 'Try',
    handle: 'dyal_thak',
  },
  {
    name: 'Hovering',
    handle: 'leidinger_matthias',
  },
  {
    name: 'Over',
    handle: 'mark_rammers',
  },
  {
    name: 'Text',
    handle: 'landon_speers',
  },
];

export default function Home() {
  const spring = {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };

  const mousePosition = {
    x: useSpring(0, spring),
    y: useSpring(0, spring),
  };

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const mouseMove = (e) => {
    const { clientX, clientY } = e;
    const targetX = clientX - (window.innerWidth / 2) * 0.25;
    const targetY = clientY - (window.innerWidth / 2) * 0.3;
    mousePosition.x.set(targetX);
    mousePosition.y.set(targetY);
  };

  return (
    <main onMouseMove={mouseMove} className={styles.main}>
      {projects.map(({ handle }, i) => {
        return (
          <Gallery mousePosition={mousePosition} handle={handle} key={i} />
        );
      })}
      <Description mousePosition={mousePosition} projects={projects} />
    </main>
  );
}
