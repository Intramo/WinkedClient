<script lang="ts">
  import { colorScheme } from "../stores";
</script>

<div class="background {$colorScheme}">
  <div class="relwrap">
    <span style="--l: 25%; --r: 80px; --d: 0s; --dur: 25s" />
    <span style="--l: 10%; --r: 20px; --d: 2s; --dur: 12s" />
    <span style="--l: 70%; --r: 20px; --d: 4s; --dur: 25s" />

    <span style="--l: 40%; --r: 60px; --d: 0s; --dur: 18s" />
    <span style="--l: 65%; --r: 20px; --d: 0s; --dur: 25s" />
    <span style="--l: 75%; --r: 110px; --d: 3s; --dur: 25s" />

    <span style="--l: 35%; --r: 150px; --d: 7s; --dur: 25s" />
    <span style="--l: 50%; --r: 25px; --d: 15s; --dur: 45s" />

    <span style="--l: 20%; --r: 15px; --d: 0s; --dur: 11s" />
    <span style="--l: 85%; --r: 150px; --d: 0s; --dur: 11s" />
  </div>
</div>

<style lang="scss">
  @import "../style/_globals.scss";

  .background {
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    background-size: cover;
    background-image: linear-gradient(to right, #ffd200, #f7971e);
    transition: background-image $COLORSCHEME_TRANSITION;

    span {
      position: absolute;
      display: block;
      width: var(--r, 80px);
      aspect-ratio: 1/1;
      background-color: rgba(255, 255, 255, 0.2);
      animation: shapeAnimation 25s linear infinite;
      left: var(--l, 25%);
      bottom: -150px;
      animation-delay: var(--d, 0s);
      animation-duration: var(--dur, 25s);
      transition: background-color $COLORSCHEME_TRANSITION;
    }

    &.dark {
      background-image: linear-gradient(to right, #000000, #434343);
      span {
        background: rgba(0, 0, 0, 0.2);
      }
    }

    &.pink {
      background-image: linear-gradient(to right, #ff758c, #ff7eb3);
    }
  }

  @keyframes shapeAnimation {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }
    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }
  }
</style>
