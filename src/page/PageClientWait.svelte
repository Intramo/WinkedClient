<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  let animFrame = -1;
  let dvd: HTMLElement;
  let hits = 0;
  let dvdX = 50;
  let dvdY = 80;
  let dvdDirX = 1;
  let dvdDirY = 1;
  let dvdColor = "#fff";

  function updateDVDPosition() {
    animFrame = requestAnimationFrame(updateDVDPosition);

    const targetPixels = Math.min(window.innerHeight, window.innerHeight) * 0.3;
    const dvdSpeedX = targetPixels / window.innerWidth;
    const dvdSpeedY = targetPixels / window.innerHeight;
    dvdX += dvdSpeedX * dvdDirX;
    dvdY += dvdSpeedY * dvdDirY;
    const newSpeed = 0.9 + Math.random() * 0.2;
    if (dvdX > 100) {
      dvdX = 100;
      dvdDirX = -newSpeed;
      hits += 1;
    } else if (dvdX < 0) {
      dvdX = 0;
      dvdDirX = newSpeed;
      hits += 1;
    }
    if (dvdY > 100) {
      dvdY = 100;
      dvdDirY = -newSpeed;
      hits += 1;
    } else if (dvdY < 0) {
      dvdY = 0;
      dvdDirY = newSpeed;
      hits += 1;
    }
    dvdColor = ["#ce0541", "#033ec9", "#02bb39", "#c9c903"][hits % 4];
  }

  onMount(() => {
    updateDVDPosition();
    return onDestroy(() => {
      cancelAnimationFrame(animFrame);
    });
  });
</script>

<section class="relwrap pageWait">
  <div class="dvd" style="background-color: {dvdColor}; --x: {dvdX / 100}; --y: {dvdY / 100}; " bind:this={dvd} />
</section>

<style lang="scss">
  @import "../style/globals.scss";

  .pageWait {
    overflow: hidden;
  }

  .dvd {
    transform: translate(calc(var(--x) * (100vw - 100%)), calc(var(--y) * (100vh - 100%)));
    will-change: transform;
    height: 10vmin;
    min-height: 100px;
    aspect-ratio: 2/1;
    mask: url("https://upload.wikimedia.org/wikipedia/commons/9/9b/DVD_logo.svg");
    -webkit-mask: url("https://upload.wikimedia.org/wikipedia/commons/9/9b/DVD_logo.svg");
    background-repeat: no-repeat;
    background-size: 75px;
    background-position: center;
  }
</style>
