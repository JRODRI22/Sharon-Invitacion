import { useEffect, useState } from "react";
import { invitation } from "./config/invitation";
import { useAutoScroll } from "./hooks/useAutoScroll";
import { useMusic } from "./hooks/useMusic";

import { Hero } from "./components/invitation/Hero";
import { Welcome } from "./components/invitation/Welcome";
import { AgeHighlight } from "./components/invitation/AgeHighlight";
import { Gallery } from "./components/invitation/Gallery";
import { EventDetails } from "./components/invitation/EventDetails";
import { Countdown } from "./components/invitation/Countdown";
import { Location } from "./components/invitation/Location";
import { Tips } from "./components/invitation/Tips";
import { RSVP } from "./components/invitation/RSVP";
import { Closing } from "./components/invitation/Closing";

import { SectionDivider } from "./components/ui/SectionDivider";
import { MusicButton } from "./components/ui/MusicButton";
import { ScrollController } from "./components/ui/ScrollController";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);

  const music = useMusic(invitation.music.enabled, invitation.music.youtubeVideoId);
  const autoScroll = useAutoScroll(opened);

  const handleOpen = () => {
    if (opened) return;
    setOpening(true);
    music.start(); // solo tras interacción del usuario
    window.setTimeout(() => {
      setOpened(true);
    }, 2800); // duración de la secuencia del sobre (sello + solapa + carta)
  };

  // Al abrir la invitación, arrancar el auto-scroll con el estado ya actualizado
  useEffect(() => {
    if (opened) autoScroll.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <>
      {!opened && <Hero onOpen={handleOpen} opening={opening} />}

      <main
        className={`relative ${opened ? "animate-content-enter" : "h-screen overflow-hidden"}`}
        aria-hidden={!opened}
      >
        {/* Carta física — el contenido vive sobre papel marfil */}
        <div className="paper-letter mx-auto my-6 w-full max-w-xl px-6 py-10 sm:my-10 sm:px-10 sm:py-14">
          <Welcome />
          <SectionDivider />
          <AgeHighlight />
          <SectionDivider />
          <Gallery />
          <SectionDivider />
          <EventDetails />
          <Countdown />
          <SectionDivider />
          <Location />
          <Tips />
          <SectionDivider />
          <RSVP />
        </div>

        <Closing />
      </main>

      {opened && (
        <>
          <MusicButton music={music} />
          <ScrollController
            active={autoScroll.active}
            onToggle={autoScroll.toggle}
          />
          {/* Indicador discreto de scroll — se desvanece solo */}
          <div
            className="scroll-hint pointer-events-none fixed bottom-16 left-1/2 z-40 -translate-x-1/2 text-center"
            aria-hidden="true"
          >
            <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-ink">
              {invitation.texts.scrollHint}
            </p>
            <p className="mt-1 text-base text-ink">↓</p>
          </div>
        </>
      )}
    </>
  );
}